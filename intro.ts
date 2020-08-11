import { Archetype } from "./models/archetypes";
import { Input, getConditionsFromInput } from "./models/conditions";
import { generateInvestmentCostTable } from "./functions/investmentCosts";
import { generateExpenditures, generateSDESubsidies, generatePaybackCashFlow } from "./functions/calculations";

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
const feeInfo
    = gridConnectionCosts
        .find(i =>
            i.Company === gridConnectionInformation.GridConnectionCompany
            && i.ConnectionType === gridConnectionInformation.ConnectionType
        );

const investmentInfo
    = investmentCostsTable
        .find(v =>
            v.installationSize === INPUT.Capacity
            && v.beginYear <= INPUT.InvestmentYear
            && v.endYear >= INPUT.InvestmentYear
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
        = investmentInfo.yearlyCashFlow[INPUT.InvestmentYear - investmentInfo.beginYear];
    const oneOffConnection
        = conditions.GridConnectionCosts
            ? oneOffConnectionInfo.ConnectionRate + oneOffConnectionInfo.CablingTariff * gridConnectionInformation.DistanceToGrid
            : 0;

    const investmentCost
        = INPUT.RentingTheLand
            ? installationCostsPerKWp * INPUT.Capacity + oneOffConnection
            : conditions.LandCostsIncluded
                ? (installationCostsPerKWp * INPUT.Capacity + INPUT.LandCosts * INPUT.LandArea / 1000 + oneOffConnection)
                : installationCostsPerKWp * INPUT.Capacity + oneOffConnection;


    const sdeSubsidies = generateSDESubsidies(31, dayAheadPrices, 1.027, INPUT, conditions);
    const expenditures = generateExpenditures(31, periodicConnectionFee, INPUT);

    const paybackCashFlow = generatePaybackCashFlow(investmentCost, INPUT, sdeSubsidies, expenditures);

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




