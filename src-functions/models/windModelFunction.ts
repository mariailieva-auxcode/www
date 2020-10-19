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
import * as sdeWind from "./data/wind/SDEWind.json";

export interface WindModelResult {
    annualEnergy: number,
    totalNetRevenue: number,
    CO2Saved: number,
}


export function getWindModelResults(userInputs: UserInputs): WindModelResult {
    const loc_yield = 728; // [W/m2] - taken from wind atlas
    const wind_av = 8.8;   // [m/s] - taken from wind atlas
    const terrain_type = 'very open';
    const altitude = 5;

    const landCosts = 44000;
    const landRentCosts = 6000;


    const diameter = 2 * Math.sqrt(userInputs.capacity * 1000 / loc_yield / 3.14);

    const hubHeight = 2.793 * Math.pow(diameter, 0.7663);

    const hubHeightWind = findHubHeightWind(hubHeight, wind_av, terrain_type);

    const landArea = 300 * userInputs.capacity / 1000 * userInputs.number;


    const annualEnergy
        = generatedEnergy(
            hubHeightWind,
            diameter,
            userInputs.capacity,
            altitude + hubHeight,
            userInputs.number
        );

    // console.log(`The annual energy generated is: ${ annualEnergy }`)


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


    const { gridCosts, periodicGridCosts }
        = calculateGridCosts(
            userInputs,
            gridConnection(userInputs.archetype),
            gridConnectionCosts);


    const isRenting = userInputs.rentingLand;


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


    const inflation_rate = 0.025;
    const endProject = userInputs.energyYear + 30;


    let rev_now = -C0;
    let NPV_low_now = -C0;
    let NPV_high_now = -C0;

    const netRevenues = [-C0];
    const NPV_low = [-C0];
    const NPV_high = [-C0];


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

    const possibleSDEWinds = [];
    for (let windVar of sdeWind) {
        if (windVar.wind_speed < hubHeightWind) {
            possibleSDEWinds.push({ ...windVar });
        }
    }

    const usedSDEWind = possibleSDEWinds[possibleSDEWinds.length - 1];


    for (let i = 0; i <  endProject - userInputs.investmentYear - 1; i++) {


        let R;
        if (i < userInputs.energyYear - userInputs.investmentYear-1 + 15) {
            const sdeSend = calculateSDE(usedSDEWind, dayAheadPrice[i]);
            R = calculateRevenues(0, annualEnergy, userInputs, sdeSend);
        } else {
            R = dayAheadPrice[i]*(annualEnergy - userInputs.directOwnConsumption)
        }

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


        rev_now = rev_now + R - C;
        netRevenues.push(rev_now);

        NPV_low_now
            = NPV_low_now
            + ((R - C) / Math.pow((1 + 0.03), i));

        NPV_high_now
            = NPV_high_now
            + ((R - C) / Math.pow((1 + 0.07), i));


        NPV_low.push(NPV_low_now);
        NPV_high.push(NPV_high_now);

        // TODO: add payback time to this API
        // if (NPV_low_now >= 0 && NPV_low[i - 1] < 0) {
        //     const PBT_low = i;
        //     console.log(`The payback time with a low discount rate is: ${PBT_low}`)
        // }
        // if (NPV_high_now >= 0 && NPV_high[i - 1] < 0) {
        //     const PBT_high = i;
        //     console.log(`The payback time with a high discount rate is: ${PBT_high}`)
        // }
    }

    // console.log(`The total net revenues is: ${net_revenues[net_revenues.length - 1]}`);

    const CO2Saved = 173.6 * annualEnergy / 1000;

    // console.log(`The total CO2 saved in kg is: ${CO2_saved}`);

    return {
        annualEnergy,
        totalNetRevenue: netRevenues[netRevenues.length - 1],
        CO2Saved,
    }

}
