import { SDEWind } from '../../models/wind/SDEWind';

export function calculateSDE(sdeWind: SDEWind, DayAheadPrice) {

    //-----------------------------------
    //Used to find the price for sending electricity to the grid based on SDE subsidy
    //-----------------------------------
    //
    // SDE_wind = dataframe with information about SDE values for different wind speeds
    // SDE_index = index used to find SDE values based on capacity
    // DayAheadPrice = average day ahead price for that yeah (euros/kWh)
    //
    //-----------------------------------
    // 
    // Returns: price for sending electricity to the grid based on SDE subsidy
    //
    //-----------------------------------

    if (sdeWind.MaximumBase < DayAheadPrice) {
        return DayAheadPrice;
    } else {
        if (DayAheadPrice > sdeWind.ProvisionalCorrection_GridDelivery) {
            return sdeWind.MaximumBase;
        } else {
            return sdeWind.MaximumBase
                - (sdeWind.ProvisionalCorrection_GridDelivery - DayAheadPrice);
        }
    }

}



