function generateInstallationSizes(size: number = 214): number[] {
    let installationSizes = [15]; // init as a param?
    for (let i = 1; i < size; i++) {
        installationSizes.push(i * 50); // also parametrize?
    }
    return installationSizes;
}

function generateSolarPanelICs(
    size: number,
    range: number,
    gridConnection: number): number[] {
    if (size < range) {
        size = range; // so it makes sense
    }

    const init = 1049.5867768595 - gridConnection; // where does this come from??
    const end = 830; // param?
    let solarPanelICs = [init, init];

    for (let i = 0; i < range - 1; i++) {
        solarPanelICs.push(end + (init - end) / range * (range - i));
    }
    for (let i = 0; i < size - range - 1; i++) {
        solarPanelICs.push(end);
    }
    return solarPanelICs;
}

function investmentCost(
    year: number,
    solarPanelCost: number,
    aeCostReduction: number,
    refYear: number,
) {
    return solarPanelCost * Math.pow((1 - aeCostReduction), (year - refYear));
}

function generateYearlyCashFlow(
    beginYear: number,
    endYear: number,
    solarPanelIC: number,
    aeCostReduction: number,
    refYear: number): number[] {
    let cashFlow = [];
    for (let i = beginYear; i <= endYear; i++) {

        cashFlow.push(investmentCost(i, solarPanelIC, aeCostReduction, refYear))
    }
    return cashFlow;
}

export interface InvestmentCostTableRow {
    SolarPanelsInvestmentCost: number,
    installationSize: number,
    beginYear: number,
    endYear: number,
    yearlyCashFlow: number[]
}

interface InvestmentCostInput {
    "ReferenceYear" :number,
    "AnnualExpectedCostReduction" :number,
    "AnnualPastCostReduction" :number,
    "GridConnection" :number,
}

export function generateInvestmentCostTable(
    size: number,
    range: number,
    investmentCostInput: InvestmentCostInput,
    beginYear: number,
    endYear: number,
    ): InvestmentCostTableRow[] {
    let solarPanelICs = generateSolarPanelICs(size, range, investmentCostInput.GridConnection);
    let installationSizes = generateInstallationSizes(size);

    return solarPanelICs.map((v, i) => {
        return {
            SolarPanelsInvestmentCost: v,
            installationSize: installationSizes[i],
            beginYear,
            endYear,
            yearlyCashFlow: generateYearlyCashFlow(
                beginYear,
                endYear,
                v,
                investmentCostInput.AnnualExpectedCostReduction,
                investmentCostInput.ReferenceYear
            )
        };
    });
}