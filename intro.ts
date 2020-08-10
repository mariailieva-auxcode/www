import { Archetype } from "./models/archetypes";
import { Input, getConditionsFromInput } from "./models/conditions";
import { generateInvestmentCostTable } from "./functions/investmentCosts";

import * as sdeTariffsData from "./data/SDETariffsCategory.json";
import * as investmentCosts from "./data/InvestmentCosts.json";

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

let investmentCostsTable = generateInvestmentCostTable(
    214,
    30,
    investmentCosts.GridConnection, INPUT.InvestmentYear - 5,
    INPUT.InvestmentYear + 10,
    investmentCosts.AnnualExpectedCostReduction,
    investmentCosts.ReferenceYear
);







