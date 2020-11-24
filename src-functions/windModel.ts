import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import { getWindModelResults } from './models/out/windModelFunction';

// import { UserInputs } from './models/models/wind/UserInputs';
import { Archetype } from './models/models/wind/Archetypes';
import { StatusCode } from './api/enums/status-codes.enum';
// import faunadb from 'faunadb'

// const q = faunadb.query;

const userInputs = {
    capacity: 300,
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
    try {
        let number = event.queryStringParameters.number;
        let capacity = event.queryStringParameters.capacity;
        let latitude = event.queryStringParameters.latitude;
        let longitude = event.queryStringParameters.longitude;
        let landArea = event.queryStringParameters.landArea;
        let landLength = Math.sqrt(landArea);
        let landWidth = Math.sqrt(landArea);
        console.log(`cap: ${capacity}`)

        if (!number)
            number = 1
        else
            number = +number

        if (!capacity)
            capacity = 300 + Number(landArea)
        else
            capacity = +capacity

        console.log({ ...userInputs, number, capacity, latitude, longitude, landLength, landWidth })

        const result = getWindModelResults({ ...userInputs, number, capacity, latitude, longitude, landLength, landWidth })

        return {
            statusCode: StatusCode.Success,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify(result),
        }


    } catch (error) {
        return {
            statusCode: StatusCode.FAIL,
            body: JSON.stringify({ status: `err: ${error}` }),
        };
    }
};