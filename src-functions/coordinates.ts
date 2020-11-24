import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
import { StatusCode } from './api/enums/status-codes.enum';
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
                    statusCode: StatusCode.Success,
                    body: JSON.stringify(response),
                    headers: RESPONSE_HEADERS
                }
            }).catch((error) => {
                console.log("error", error);
                return {
                    statusCode: StatusCode.BadRequest,
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
            const polygon = { color: data.data.color, coordinates: data.data.coordinates, ownerId: data.data.ownerId }
            return client.query(q.Update(q.Ref(q.Collection('coordinates'), refId), { data: polygon }))
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