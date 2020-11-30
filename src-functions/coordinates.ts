import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
const q = faunadb.query;

export async function handler(event, _) {
    try {
        if (event.httpMethod == "POST") {
            /* configure faunaDB Client with our secret */
            const data = JSON.parse(event.body)
            const ownerId = data.ownerId;
            const coordinates = data.coordinates
            const type = data.type;
            const site = {
                ownerId,
                coordinates,
                type
            }
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })

            console.log(event)

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
        else if (event.httpMethod == "GET") {
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })
            const ownerId = event.queryStringParameters.ownerId
            return client.query(q.Map(
                q.Paginate(
                    q.Match(q.Index("coordinates_by_ownerId"), ownerId)
                ),
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
        else if (event.httpMethod == "PUT") {
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })
            const data = JSON.parse(event.body)
            const refId = data.data.id

            const polygon = { color: data.data.color, coordinates: data.data.coordinates, ownerId: data.data.ownerId,
            siteType: data.data.siteType, answers: data.data.answers, siteEnergy: data.data.siteEnergy, produce: data.data.produce, sell: data.data.sell, isOwner: data.data.isOwner}

            return client.query(q.Update(q.Ref(q.Collection('coordinates'), refId), { data: polygon }))
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
        else if (event.httpMethod == "DELETE") {
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })
            const id = event.queryStringParameters.id
            return client.query(q.Delete(q.Ref(q.Collection('coordinates'), id)))
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