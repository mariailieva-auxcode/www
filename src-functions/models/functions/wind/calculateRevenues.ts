
// NOTE: SDEWind, DEIndex, DayAheadPrice not send here

import { UserInputs } from "../../models/wind/UserInputs";

// calculateSDE will be done seperately and SDESend will be given as a parameter
export function calculateRevenues(SDEOwn, annualEnergy, userInputs: UserInputs, SDESend) {

    //-----------------------------------
    //Used to caluclate the revenues for that year
    //-----------------------------------
    //
    // SDE_wind = dataframe with information about SDE values for different capacitys
    // SDE_own = SDE price for own consumption
    // annual_energy = annual energy generated from solar panels
    // SDE_index = index used to find SDE values based on capacity
    // user_inputs = data frame of user inputs
    // DayAheadPrice = average day ahead price for that yeah (euros/kWh)
    //
    //-----------------------------------
    // 
    // Returns: revenues for that year
    //
    //-----------------------------------

    // from calculateSDE import calculateSDE

    // SDESend = calculateSDE(SDE_wind, DayAheadPrice, SDE_index)

    return(
        annualEnergy * SDESend * (1 - userInputs.directOwnConsumption / annualEnergy)
        + userInputs.directOwnConsumption * SDEOwn
    );

}

