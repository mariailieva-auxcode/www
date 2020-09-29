import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
const q = faunadb.query;

export async function handler(event, _) {
    try {
        if (event.httpMethod == "POST") {
            /* configure faunaDB Client with our secret */
            let ownerId = event.data.ownerId;// from frontend
            let site = {
                ownerId,
                coordinates
            }
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })

            console.log(event)
            const data = JSON.parse(event.body)

            return client.query(q.Create(q.Collection('coordinates'), { data: site }))
                .then((response) => {
                    console.log('success', response)
                    return {
                        statusCode: 200,
                        body: JSON.stringify(response),
                        headers: RESPONSE_HEADERS
                    }
                }).catch((error) => {
                    console.log('error', error)
                    return {
                        statusCode: 400,
                        body: JSON.stringify(error),
                        headers: RESPONSE_HEADERS
                    }
                })
        }
        else if (event.httpMethod == "PUT") {
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })

            console.log(event)
            const data = JSON.parse(event.body)

            return client.query(q.Update(q.Ref(q.Collection('coordinates'), '<id-of-the-document>'),
            { data: data.coordinates } ) )

                .then((response) => {
                    console.log('success', response)
                    return {
                        statusCode: 200,
                        body: JSON.stringify(response),
                        headers: RESPONSE_HEADERS
                    }
                }).catch((error) => {
                    console.log('error', error)
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