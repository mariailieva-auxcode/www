import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import { getWindModelResults } from './models/out/windModelFunction';

// import { UserInputs } from './models/models/wind/UserInputs';
import { Archetype } from './models/models/wind/Archetypes';
// import faunadb from 'faunadb'

// const q = faunadb.query;

const userInputs = {
    capacity: 5000,
    number: 1,
    latitude: 36.667,
    longitude: -4.483,
    landLength: 200,
    landWidth: 200,
    investmentYear: 2020,
    energyYear: 2021,
    directOwnConsumption: 0,
    rentingLand: false,
    archetype: Archetype.MoreThan15m,
    networkOperator: 'Liander',
    connectionType: '2000kVA - 5000kVA',
    distanceToGrid: 50,
}

export async function handler(event, _) {
    // try {

        const result = getWindModelResults(userInputs);

        return {
            statusCode: 200,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify(result),
        }


    // } catch (error) {
    //     return {
    //         statusCode: 500,
    //         body: JSON.stringify({ status: `err: ${error}` }),
    //     };
    // }
};