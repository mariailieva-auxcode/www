import { Input, PVConditions } from "../models/conditions";

interface Expenditure {
    gridConnectionCost: number,
    LandRental: number,
}

function generateExpenditure(
    currentYear: number,
    periodicConnectionFee: number,
    input: Input,
): Expenditure {

    let gridConnectionCost
        = currentYear < input.YearOfProduction
            ? 0
            : periodicConnectionFee;
    let LandRental
        = currentYear < input.YearOfProduction
            ? 0
            : input.RentingTheLand
                ? input.LandArea * input.LandRentCosts / 10000
                : 0;
    return { gridConnectionCost, LandRental };
}

export function generateExpenditures(
    periodLength: number,
    periodicConnectionFee: number,
    input: Input
): Expenditure[] {
    let expenditures = [];
    for (let i = input.InvestmentYear; i < input.InvestmentYear + periodLength; i++) {
        expenditures.push(
            generateExpenditure(i, periodicConnectionFee, input)
        );
    }
    return expenditures;
}

interface DayAheadPrice {
    year: number,
    dayAheadPrice: number,
}

interface SDESubsidy {
    year: number,
    dayAheadPrice: number,
    SDEPriceForGridDelivery: number,
    SDEContributionForOwnUse: number,
    PercentageOfDirectOwnUse: number,
    maximumAllowedForSubsidy: number,
    TotalForSubsidy: number,
}

function generateSDESubsidy(price: DayAheadPrice, input: Input, conditions: PVConditions): SDESubsidy {
    const SDEPriceForGridDelivery = conditions.MaximumBaseAmount < price.dayAheadPrice
        ? price.dayAheadPrice
        : (price.dayAheadPrice > conditions.ProvisionalCorrectionAmountGridDelivery)
            ? conditions.MaximumBaseAmount
            : conditions.MaximumBaseAmount - (conditions.ProvisionalCorrectionAmountGridDelivery - price.dayAheadPrice);

    const SDEContributionForOwnUse = conditions.MaximumBaseAmount - conditions.ProvisionalCorrectionAmountOwnConsumption;
    const percentageOfDirectOwnUse = conditions.OwnConsumption ? input.DirectOwnConsumption : 0;
    const maximumAllowedForSubsidy = input.Capacity * 950;
    const totalForSubsidy
        = maximumAllowedForSubsidy
        * percentageOfDirectOwnUse
        * SDEContributionForOwnUse
        + maximumAllowedForSubsidy
        * SDEPriceForGridDelivery
        * (1 - percentageOfDirectOwnUse);

    return {
        year: price.year,
        dayAheadPrice: price.dayAheadPrice,
        SDEPriceForGridDelivery,
        SDEContributionForOwnUse,
        PercentageOfDirectOwnUse: percentageOfDirectOwnUse,
        maximumAllowedForSubsidy,
        TotalForSubsidy: totalForSubsidy,
    }
}

export function generateSDESubsidies(periodLength: number, dayAheadPrices: DayAheadPrice[], dayAheadPriceMaturity: number, input: Input, conditions: PVConditions): SDESubsidy[] {
    let sdeSubsidies = [];
    let len = dayAheadPrices.length;
    let prevPrice = dayAheadPrices[0];
    for (let i = 0; i < periodLength; i++) {
        const price
            = i > len - 1
                ? {
                    year: prevPrice.year + 1,
                    dayAheadPrice: prevPrice.dayAheadPrice * dayAheadPriceMaturity
                }
                : dayAheadPrices[i];

        prevPrice = price;

        sdeSubsidies.push(generateSDESubsidy(price, input, conditions));
    }
    return sdeSubsidies;
}



