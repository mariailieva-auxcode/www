import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
const q = faunadb.query;

export async function handler(event, _) {
    try {
        if (event.httpMethod == "GET") {
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })
            return client.query(q.Map(
                q.Paginate(q.Documents(q.Collection('perceels'))),
                q.Lambda(x => q.Get(x))
            )).then((response) => {
                console.log("success", JSON.stringify(response));
                return {
                    statusCode: 200,
                    body: JSON.stringify(response),
                    headers: RESPONSE_HEADERS
                }
            }).catch((error) => {
                console.log("error", error);
                return {
                    statusCode: 400,
                    body: JSON.stringify(error),
                    headers: RESPONSE_HEADERS
                }
            })
        }
        else {
            return {
                statusCode: 204,
                body: JSON.stringify({}),
                headers: RESPONSE_HEADERS
            }
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ status: `error` }),
        }
    }
};