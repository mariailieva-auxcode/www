import { UserInputs } from "../../models/wind/UserInputs";


export function calculateGridCosts(
    userInputs: UserInputs,
    isConnectGrid: boolean,
    gridConnectionCostsJson: any[]) {

    // -----------------------------------
    // Used to caluclate the costs from the grid connection
    // -----------------------------------
    // 
    //  user_inputs = data frame of user inputs
    //  isConnectGrid = a boolean asking whether we need to include the one off initial grid connection costs
    // 
    // -----------------------------------
    //  
    //  Returns: One off grid connection costs for initial costs [euros]
    //           Periodic grid connection costs every year [euros]
    // 
    // -----------------------------------

    // NOTE: python translation: provide the data, don't load here
    // with open('GridConnectionCosts.json') as json_file:
    //     grid = json.load(json_file)
    const grid = gridConnectionCostsJson;

    const networkOperator = "" + userInputs.networkOperator;

    // Stage 1 of the process means that ConnectionType and distance to grid == None. The user has not inputted it yet.
    // If this is the case we find the connection type from the capacity

    // UNSAFE! might throw null exeption
    let connectionType;
    let connectionRate;
    let cabling;
    let periodicGridFee;
    let additionalConnectionFee;


    // 'None'???
    if (userInputs.connectionType != null) {
        connectionType = userInputs.connectionType;
    }




    for (let i = 0; i < grid.length; i++) {
        if (grid[i]['Company'] === networkOperator) {

            // If connection type is specified
            if (grid[i]['ConnectionType'] === connectionType) {
                connectionRate = grid[i]["ConnectionRate"];
                cabling = grid[i]["CablingTariff"];
                periodicGridFee = grid[i]["PeriodicConnectionFee"];
                additionalConnectionFee = grid[i]["AdditionalConnectionFee"];
                // print(grid[i]['Company'], grid[i]['ConnectionType'])
                break;
            }
            // If connection type is NOT specified
            else if (userInputs.capacity <= grid[i]['MaximumCapacity']) {

                connectionRate = grid[i]["ConnectionRate"];
                cabling = grid[i]["CablingTariff"];
                periodicGridFee = grid[i]["PeriodicConnectionFee"];
                additionalConnectionFee = grid[i]["AdditionalConnectionFee"];
                // print(grid[i]['ConnectionType'], grid[i]['MaximumCapacity'], capacity)
                break;
            }

        }

    }


    let gridCosts;
    if (isConnectGrid) {
        gridCosts = connectionRate + cabling * userInputs.distanceToGrid;
    } else {
        gridCosts = 0;
    }

    const periodicGridCosts
        = periodicGridFee
        + additionalConnectionFee * userInputs.distanceToGrid;

    // UNSAFE: might return null or the function might throw a null pointer exception
    return { gridCosts, periodicGridCosts };
}