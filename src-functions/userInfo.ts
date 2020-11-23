import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
const q = faunadb.query;

export async function handler(event, _) {
    try {
        if (event.httpMethod == "PUT") {
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })
            const data = JSON.parse(event.body)
            console.log(data);
            return client.query(q.Update(
                q.Select(
                    "ref",
                    q.Get(q.Match(q.Index("user_by_id"), data.ownerId))
                ),
                { data }
            )).then((response) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify(response),
                    headers: RESPONSE_HEADERS
                }
            }).catch(error => {
                return {
                    statusCode: 400,
                    body: JSON.stringify(error),
                    headers: RESPONSE_HEADERS
                }
            })

            // const refId = data.data.id
            // const polygon = { color: data.data.color, coordinates: data.data.coordinates, ownerId: data.data.ownerId }
            // return client.query(q.Update(q.Ref(q.Collection('coordinates'), refId), { data: polygon }))
            //     .then((response) => {
            //         console.log('success', response)
            //         return {
            //             statusCode: 200,
            //             body: JSON.stringify(response),
            //             headers: RESPONSE_HEADERS
            //         }
            //     }).catch((error) => {
            //         console.log('error', error)
            //         return {
            //             statusCode: 400,
            //             body: JSON.stringify(error),
            //             headers: RESPONSE_HEADERS
            //         }
            //     })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ status: `error` }),
        }
    }
}