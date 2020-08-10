import { Archetype } from "./models/archetypes";
import { Input, getConditionsFromInput } from "./models/conditions";

import * as sdeTariffsData from "./data/SDETariffsCategory.json";


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
}

let result = getConditionsFromInput(INPUT, sdeTariffsData);
console.log(result);



