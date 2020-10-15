export function findHubHeightWind(hubHeight, averageWind, terrainType) {

    //-----------------------------------
    //
    // Used to find the average wind speed at the hub height of the turbine
    //
    //-----------------------------------
    //
    // hub_height = the hub height of the turbine (where the blades are)
    // average_wind = the average wind speed at that location 
    // terrain_type = the type of terrain at that location
    //
    //-----------------------------------
    // 
    // Returns: The average wind speed at that hub height
    //
    //-----------------------------------

    const terrain = {'very open': 0.03, 'open': 0.1, 'rough': 0.2, 'very rough': 0.4};
    const z0 = terrain[terrainType];

    let hub_wind;
    if (hubHeight > 60) {

        hub_wind = averageWind * Math.pow((hubHeight/100), 0.143);
    } else {
        const wind_60 = averageWind * Math.pow((60/100), 0.143);
        hub_wind = wind_60 * Math.log(hubHeight / z0) / Math.log(60 / z0);
    }
    return hub_wind
}