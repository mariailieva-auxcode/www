import { calculateRevenues } from './functions/wind/calculateRevenues';
import { generatedEnergy } from './functions/wind/generatedEnergy';
import { calculateGridCosts } from './functions/wind/calculateGridCosts';
import { findHubHeightWind } from './functions/wind/hubHeightWind';
import { calculateSDE } from './functions/wind/calculateSDE'; // done here not in func

import { Archetype, gridConnection, landCostsIncluded } from './models/wind/Archetypes';
import { UserInputs } from './models/wind/UserInputs';

import * as investmentCost from "./data/wind/InvestmentCosts.json";
import * as gridConnectionCosts from "./data/GridConnectionCosts.json";
import * as dayAheadPrice from "./data/wind/DayAheadPrice.json";
import * as sdeWind from "./data//wind/SDEWind.json";

const userInputs: UserInputs = {
    capacity: 5000,
    number: 1,
    latitude: 36.667,
    longitude: -4.483,
    landLength: 200,
    landWidth: 200,
    investmentYear: 2020,
    energyYear: 2021,
    directOwnConsumption: 0,
    rentingLand: false,
    archetype: Archetype.MoreThan15m,
    networkOperator: 'Liander',
    connectionType: '2000kVA - 5000kVA',
    distanceToGrid: 50,
}

//NOTE: Not needed
// archetype = user_inputs['Archetype'][0] // NOTE architype = userInputs.archetype
// Archetype_data = pd.read_csv('Archetype.csv')
// archetype_index = list(Archetype_data['Archetype']).index(archetype)


// -----------------------------------
// FIND DATA FROM LOCATION
// -----------------------------------

// The idea is to have a database of the location of all the KNMI stations

const loc_yield = 728; // [W/m2] - taken from wind atlas
const wind_av = 8.8;   // [m/s] - taken from wind atlas
const terrain_type = 'very open';
const altitude = 5;

// Also data for the grid connection costs and land prices based on location
const landCosts = 44000;
const landRentCosts = 6000;



// -----------------------------------
//  DETAILS OF WIND TURBINE
// -----------------------------------

// capacity = user_inputs['capacity'][0]


// formula from Megan (basic knowledge)
const diameter = 2 * Math.sqrt(userInputs.capacity * 1000 / loc_yield / 3.14);
// const diameter = 2 * Math.sqrt(userInputs.capacity * 1000 / loc_yield / Math.PI);

// formula from https://www.wind-energy-the-facts.org/hub-height-7.html
const hubHeight = 2.793 * Math.pow(diameter, 0.7663);

// # mean wind speed at hub height
const hubHeightWind = findHubHeightWind(hubHeight, wind_av, terrain_type);

// Land area used assumes 300m2 per MW
const landArea = 300 * userInputs.capacity / 1000 * userInputs.number;

// -----------------------------------
// TOTAL ENERGY GENERATED
// -----------------------------------

const annual_energy
    = generatedEnergy(
        hubHeightWind,
        diameter,
        userInputs.capacity,
        altitude + hubHeight,
        userInputs.number
    );

console.log(`The annual energy generated is: ${ annual_energy }`)



// -----------------------------------
//  INVESTMENT COSTS
// -----------------------------------

// investment_cost = pd.read_csv("investment_costs.csv")

// ??????????????????
// installation_sizes = np.arange(0, 10000, 50)
// k = np.where(installation_sizes > capacity)  #Index of the capacity in the installation sizes

// const C0_perkW = investmentCost[userInputs.investmentYear][k[0][0]-1]  //euros/kW

// TODO: check if this WORKS!
let investmentCostAtCap;
let foundGreater = false;
for (let i = 0; i < investmentCost.length; i++) {
    if (!foundGreater) {
        if (userInputs.capacity > investmentCost[i].installation_size) {
            investmentCostAtCap = investmentCost[i];
            foundGreater = true;
        }
    } else {
        if (userInputs.capacity < investmentCost[i].installation_size) {
            break;
        } else {
            investmentCostAtCap = investmentCost[i];
        }
    }
}
const C0_perkW = investmentCostAtCap[userInputs.investmentYear];



// Calculate grid connection costs

const { gridCosts, periodicGridCosts }
    = calculateGridCosts(
        userInputs,
        gridConnection(userInputs.archetype),
        gridConnectionCosts);


// If isRenting not specified, assume it's false | NOTE: do this on the frontend

const isRenting = userInputs.rentingLand;

// Include land costs if needed
let C0;
if (!isRenting && landCostsIncluded(userInputs.archetype)) {
    C0
        = C0_perkW * userInputs.capacity * userInputs.number
        + landArea * Math.pow(landCosts / 10, 4)
        + gridCosts;
} else {
    C0
        = C0_perkW * userInputs.capacity * userInputs.number
        + gridCosts;
}



// -----------------------------------
// ANNUAL REVENUES
// -----------------------------------

// Set constants
// const SDE_wind = pd.read_csv('SDE_wind.csv'); // imported as sdeWind
const inflation_rate = 0.025;
const endProject = userInputs.energyYear + 30;
// ?
//const DayAheadPrice = imported as dayAheadPrice


// Set intial conditions
let rev_now = -C0;
let NPV_low_now = -C0;
let NPV_high_now = -C0;

const net_revenues = [-C0];
const NPV_low = [-C0];
const NPV_high = [-C0];


// Find maintenence
let maintenance;
if (userInputs.capacity * userInputs.number < 500) {
    maintenance = 0.03 * C0;
} else if (
    userInputs.capacity * userInputs.number > 500
    && userInputs.capacity * userInputs.number < 2000) {
    maintenance = 0.02 * C0;
} else {
    maintenance = 0.01 * C0;
}

// Find which SDE prices we will be using based on wind speed
// Find the largest SDE price ?
// SDE_index = np.where(SDE_wind['wind_speed'] < hubHeightWind)
// SDE_index = SDE_index[0][-1]
const possibleSDEWinds = [];
for (let windVar of sdeWind) {
    if (windVar.wind_speed < hubHeightWind) {
        possibleSDEWinds.push({ ...windVar });
    }
}
// ? this is equivalent to the upper python code
const usedSDEWind = possibleSDEWinds[possibleSDEWinds.length - 1];

// Look over lifetime of project
for (let i = 0; i <  endProject - userInputs.investmentYear - 1; i++) {

    // Find Revenues from the energy produced and SDE subsidy
    let R;
    if (i < userInputs.energyYear - userInputs.investmentYear-1 + 15) {
        const sdeSend = calculateSDE(usedSDEWind, dayAheadPrice[i]);
        R = calculateRevenues(0, annual_energy, userInputs, sdeSend);
    } else {
        R = dayAheadPrice[i]*(annual_energy - userInputs.directOwnConsumption)
    }



    // Find annual costs
    // Costs from this article
    // https://www.sciencedirect.com/science/article/pii/S0960148113004059
    // and http://windmonitor.iee.fraunhofer.de/windmonitor_en/3_Onshore/5_betriebsergebnisse/3_investitionskosten/

    let C;
    if (!isRenting) {
        C
            = periodicGridCosts
            + maintenance * Math.pow((1 + inflation_rate), i - 1)
    } else {
        C
            = periodicGridCosts
            + landRentCosts * Math.pow(landArea / 10, 4)
            + maintenance * Math.pow((1 + inflation_rate), i - 1)
    }


    // Net revenues with no discount rate
    rev_now = rev_now + R - C;
    net_revenues.push(rev_now);

    // Net present value with discount rate = 3%
    NPV_low_now
        = NPV_low_now
        + ((R - C) / Math.pow((1 + 0.03), i));
    // Net present value with discount rate = 7%
    NPV_high_now
        = NPV_high_now
        + ((R - C) / Math.pow((1 + 0.07), i));


    NPV_low.push(NPV_low_now);
    NPV_high.push(NPV_high_now);

    // Print the payback time
    if (NPV_low_now >= 0 && NPV_low[i - 1] < 0) {
        const PBT_low = i;
        console.log(`The payback time with a low discount rate is: ${PBT_low}`)
    }
    if (NPV_high_now >= 0 && NPV_high[i - 1] < 0) {
        const PBT_high = i;
        console.log(`The payback time with a high discount rate is: ${PBT_high}`)
    }
}

console.log(`The total net revenues is: ${net_revenues[net_revenues.length - 1]}`);

// CO2 saved using the wind turbine
const CO2_saved = 173.6 * annual_energy / 1000;

console.log(`The total CO2 saved in kg is: ${CO2_saved}`);


// #-----------------------------------
// #PLOT RESULTS
// #-----------------------------------

// fig, ax = plt.subplots(figsize = (10,4))
// plt.title('Costs over lifetime of the system')
// x_ax = range(user_inputs['investment_year'][0], endProject, 1)

// ax.bar(x_ax, net_revenues, color = 'orangered', width = 0.25, label = 'Total Profit')
// ax.bar(np.add(x_ax, 0.25), NPV_low, color = 'gold', width = 0.25, label = 'NPV (Low discount rate)')
// ax.bar(np.add(x_ax, 0.5), NPV_high, color = 'dodgerblue', width = 0.25, label = 'NPV (High discount rate)')

// ax.set_xticks(range(user_inputs['investment_year'][0], endProject, 5))
// ax.set_xticklabels(range(0, 35, 5))
// ax.legend(['Total Profit', 'NPV (Low discount rate)', 'NPV (High discount rate)'])
// ax.set_xlabel('Years')
// ax.set_ylabel('Investment value [euros]')

// ax.set_yticks([-2000000, 0, 2000000, 5000000])
// ax.set_yticklabels( ['-2M', 0, '2M', '5M'])

// plt.show()

