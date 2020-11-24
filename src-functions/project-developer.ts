import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
import { StatusCode } from './api/enums/status-codes.enum';

const q = faunadb.query;

export async function handler(event, _) {
    try {
        console.log(event);
        if (event.httpMethod == "POST") {
            /* configure faunaDB Client with our secret */
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })

            const data = JSON.parse(event.body)

            return client.query(q.Create(q.Collection('projectDev'), { data }))
                .then((response) => {
                    console.log('success', response)
                    return {
                        statusCode: StatusCode.Success,
                        body: JSON.stringify(response),
                        headers: RESPONSE_HEADERS
                    }
                }).catch((error) => {
                    console.log('error', error)
                    return {
                        statusCode: StatusCode.BadRequest,
                        body: JSON.stringify(error),
                        headers: RESPONSE_HEADERS
                    }
                })
        }
        else {
            return {
                statusCode: StatusCode.NoContent,
                body: JSON.stringify({}),
                headers: RESPONSE_HEADERS
            }
        }
    } catch (error) {
        return {
            statusCode: StatusCode.FAIL,
            body: JSON.stringify({ status: `error` }),
        }
    }
};