import { Archetype } from "./models/archetypes";
import { Input, getConditionsFromInput } from "./models/conditions";
import { generateInvestmentCostTable } from "./functions/investmentCosts";
import { generateExpenditures, generateSDESubsidies, generatePaybackCashFlow, calculateInvestmentCost } from "./functions/calculations";

import * as sdeTariffsData from "./data/SDETariffsCategory.json";
import * as investmentCosts from "./data/InvestmentCosts.json";
import * as gridConnectionCosts from "./data/GridConnectionCosts.json";
import * as gridConnectionInformation from "./data/GridConnectionInformation.json";
import * as dayAheadPrices from "./data/DayAhedPrice.json";

const input: Input = {
    InvestmentYear: 2020,
    YearOfProduction: 2021,
    Capacity: 1000,
    Yield: 950,
    DirectOwnConsumption: 0.00,
    LandCosts: 44000,
    LandArea: 200,
    LandRentCosts: 6000,
    RentingTheLand: true,
    archetype: Archetype.GroundMountedProducer,
};

let conditions = getConditionsFromInput(input, sdeTariffsData);

let investmentCostsTable = generateInvestmentCostTable(214, 30, investmentCosts, 2015, 2030);





// Calculations
const feeInfo
    = gridConnectionCosts
        .find(i =>
            i.Company === gridConnectionInformation.GridConnectionCompany
            && i.ConnectionType === gridConnectionInformation.ConnectionType
        );

const investmentInfo
    = investmentCostsTable
        .find(v =>
            v.installationSize === input.Capacity
            && v.beginYear <= input.InvestmentYear
            && v.endYear >= input.InvestmentYear
        );

// where does this come from ?
// is it the wrong table ?
const oneOffConnectionInfo
    = gridConnectionCosts
        .find(v =>
            v.ConnectionType === "2000kVA - 5000kVA"
            && v.Company === "Liander"
        );


if (feeInfo && investmentInfo && oneOffConnectionInfo) {
    const periodicConnectionFee = feeInfo.PeriodicConnectionFee;
    const installationCostsPerKWp
        = investmentInfo.yearlyCashFlow[input.InvestmentYear - investmentInfo.beginYear];
    const oneOffConnection
        = conditions.GridConnectionCosts
            ? oneOffConnectionInfo.ConnectionRate + oneOffConnectionInfo.CablingTariff * gridConnectionInformation.DistanceToGrid
            : 0;

    const investmentCost = calculateInvestmentCost(input, conditions, installationCostsPerKWp, oneOffConnection);


    const sdeSubsidies = generateSDESubsidies(31, dayAheadPrices, 1.027, input, conditions);
    const expenditures = generateExpenditures(31, periodicConnectionFee, input);

    const paybackCashFlow = generatePaybackCashFlow(investmentCost, input, sdeSubsidies, expenditures);

    console.log(paybackCashFlow);

    console.log(paybackCashFlow.map(
        v => { return { repay: v.partOfYearForRepayment, year: v.year } })
    );

    // Payback time (years)
    console.log(paybackCashFlow.reduce((a, i) => a + i.partOfYearForRepayment , 0));
    


} else {
    console.log("error: data missing");
}






// Other Metrics | no need for a model here
const energyPotential = input.Yield * input.Capacity;
const CO2Saved = 173.6 * energyPotential / 1000;
const electricityPrice = 0.2;
const costsSaved // Method 2 (euro)
    = electricityPrice
    * energyPotential
    * input.DirectOwnConsumption;

console.log(energyPotential);
console.log(CO2Saved);
console.log(costsSaved);




