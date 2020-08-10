import {
    landCostsIncluded,
    ownConsumption,
    gridConnectionCosts,
    Archetype,
} from './archetypes';

export interface Input {
    InvestmentYear: number,
    YearOfProduction: number,
    Capacity: number, // (kWp)
    Yield: number, // (kWh/kWp)
    DirectOwnConsumption: number, // (%)
    LandCosts: number, // (€/hectere)
    LandArea: number, // (m2)
    LandRentCosts: number, // (€/hectere/year)
    RentingTheLand: boolean,
    archetype: Archetype,
}

export interface PVConditions {
    LandCostsIncluded: boolean,
    OwnConsumption: boolean,
    GridConnectionCosts: boolean,
    MaximumBaseAmount: number,
    BaseEnergyPriceGridDelivery: number,
    BaseEnergyPriceOwnUse: number,
    ProvisionalCorrectionAmountGridDelivery: number,
    ProvisionalCorrectionAmountOwnConsumption: number,
}

interface SDETariffsCategoryData {
    MaximumBaseAmount : number,
    BaseEnergyPriceGridDelivery: number,
    BaseEnergyPriceOwnUse: number,
    ProvisionalCorrectionAmountGridDelivery: number,
    ProvisionalCorrectionAmountOwnConsumption: number
}
interface SDETariffsCategory {
    category1 : SDETariffsCategoryData,
    category2 : SDETariffsCategoryData,
}

export function getConditionsFromInput(input: Input, sdeTariffsCategory: SDETariffsCategory): PVConditions {
    return {
        LandCostsIncluded: landCostsIncluded(input.archetype),
        OwnConsumption: ownConsumption(input.archetype),
        GridConnectionCosts: gridConnectionCosts(input.archetype),
        MaximumBaseAmount:
            input.Capacity < 1000
                ? sdeTariffsCategory.category1.MaximumBaseAmount
                : sdeTariffsCategory.category2.MaximumBaseAmount,
        BaseEnergyPriceGridDelivery: sdeTariffsCategory.category1.BaseEnergyPriceGridDelivery,
        BaseEnergyPriceOwnUse: sdeTariffsCategory.category1.BaseEnergyPriceGridDelivery,
        ProvisionalCorrectionAmountGridDelivery:
            sdeTariffsCategory.category1.ProvisionalCorrectionAmountGridDelivery,
        ProvisionalCorrectionAmountOwnConsumption:
            sdeTariffsCategory.category1.ProvisionalCorrectionAmountOwnConsumption,
    }
}