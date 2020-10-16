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

function generateSDESubsidy(
    price: DayAheadPrice,
    input: Input,
    conditions: PVConditions
): SDESubsidy {
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

export function generateSDESubsidies(
    periodLength: number,
    dayAheadPrices: DayAheadPrice[],
    dayAheadPriceMaturity: number,
    input: Input,
    conditions: PVConditions
): SDESubsidy[] {
    let sdeSubsidies = [];
    const len = dayAheadPrices.length;
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

interface PaybackInfo {
    year: number,
    partOfYearForRepayment: number,
    unrecoupedPartOfInvestment: number,
    cumulativeCostSavingsAndIncome: number,
    costSavingsAndIncome: number,
    annualElectricityProduction: number,
}

function generatePayback(
    currentYear: number,
    investmentCost: number,
    prevYearCumulativeCostSavingsAndIncome: number,
    input: Input,
    sdeSubsidy: SDESubsidy,
    expenditure: Expenditure
): PaybackInfo {

    const annualElectricityProduction
        = currentYear < input.YearOfProduction
            ? 0
            : input.Yield * input.Capacity;

    const costSavingsAndIncome
        = currentYear <= input.YearOfProduction + 15 // Where does this 15 come from ?
            ? (1 - sdeSubsidy.PercentageOfDirectOwnUse)
            * annualElectricityProduction
            * sdeSubsidy.SDEPriceForGridDelivery
            + sdeSubsidy.SDEContributionForOwnUse
            * sdeSubsidy.PercentageOfDirectOwnUse
            * annualElectricityProduction
            - expenditure.gridConnectionCost
            - expenditure.LandRental
            : (1 - sdeSubsidy.PercentageOfDirectOwnUse)
            * annualElectricityProduction
            * sdeSubsidy.dayAheadPrice
            - expenditure.gridConnectionCost
            - expenditure.LandRental;

    const cumulativeCostSavingsAndIncome
        = prevYearCumulativeCostSavingsAndIncome + costSavingsAndIncome;

    const unrecoupedPartOfInvestment
        = investmentCost < cumulativeCostSavingsAndIncome
            ? 0
            : investmentCost - cumulativeCostSavingsAndIncome;

    const partOfYearForRepayment
        = unrecoupedPartOfInvestment > 0
            ? 1
            : unrecoupedPartOfInvestment / costSavingsAndIncome;

    return {
        year: currentYear,
        partOfYearForRepayment,
        unrecoupedPartOfInvestment,
        cumulativeCostSavingsAndIncome,
        costSavingsAndIncome,
        annualElectricityProduction,
    }
}

export function generatePaybackCashFlow(
    investmentCost: number,
    input: Input,
    sdeSubsidies: SDESubsidy[],
    expenditures: Expenditure[],
): PaybackInfo[] {

    let paybackCashFlow = [];
    const len = sdeSubsidies.length;

    let prevYearIncome = 0;
    for (let i = 0; i < len; i++) {
        const year = i + input.InvestmentYear;
        const sdeSubsidy = sdeSubsidies[i];
        const expenditure = expenditures[i];

        let result = generatePayback(year, investmentCost, prevYearIncome, input, sdeSubsidy, expenditure);
        prevYearIncome = result.cumulativeCostSavingsAndIncome;
        paybackCashFlow.push(result);
    }

    return paybackCashFlow;
}

export function calculateInvestmentCost(
    input: Input,
    conditions: PVConditions,
    installationCostsPerKWp: number,
    oneOffConnection: number
) {
    return input.RentingTheLand
        ? installationCostsPerKWp * input.Capacity + oneOffConnection
        : conditions.LandCostsIncluded
            ? (installationCostsPerKWp * input.Capacity + input.LandCosts * input.LandArea / 1000 + oneOffConnection)
            : installationCostsPerKWp * input.Capacity + oneOffConnection;
}


