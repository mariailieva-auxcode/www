import { Archetype } from "./models/archetypes";
import { Input, getConditionsFromInput } from "./models/conditions";
import { generateInvestmentCostTable } from "./functions/investmentCosts";
import { generateExpenditures, generateSDESubsidies } from "./functions/calculations";

import * as sdeTariffsData from "./data/SDETariffsCategory.json";
import * as investmentCosts from "./data/InvestmentCosts.json";
import * as gridConnectionCosts from "./data/GridConnectionCosts.json";
import * as gridConnectionInformation from "./data/GridConnectionInformation.json";
import * as dayAheadPrices from "./data/DayAhedPrice.json";

const INPUT: Input = {
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

let conditions = getConditionsFromInput(INPUT, sdeTariffsData);

let investmentCostsTable = generateInvestmentCostTable(214, 30, investmentCosts, 2015, 2030);






// Calculations
const feeInfo =
    gridConnectionCosts
        .find(i =>
            i.Company === gridConnectionInformation.GridConnectionCompany
            && i.ConnectionType === gridConnectionInformation.ConnectionType
        );
if (feeInfo) {
    const PeriodicConnectionFee = feeInfo.PeriodicConnectionFee;

    const price = dayAheadPrices[1];
    const sdeSubsidies = generateSDESubsidies(31, dayAheadPrices, 1.027, INPUT, conditions);
    const expenditures = generateExpenditures(31, PeriodicConnectionFee, INPUT);

    console.log(sdeSubsidies);
    console.log(expenditures);

} else {
    console.log("No Info about the Periodic Connection Fee");
}






// Other Metrics | no need for a model here
const energyPotential = INPUT.Yield * INPUT.Capacity;
const CO2Saved = 173.6 * energyPotential / 1000;
const electricityPrice = 0.2;
const costsSaved // Method 2 (euro)
    = electricityPrice
    * energyPotential
    * INPUT.DirectOwnConsumption;

console.log(energyPotential);
console.log(CO2Saved);
console.log(costsSaved);




