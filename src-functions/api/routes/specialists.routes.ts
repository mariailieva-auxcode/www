import { RESPONSE_HEADERS } from '../constants/response-headers.constant';
import faunadb from 'faunadb'
const q = faunadb.query;

exports.handler = async (event, context, callback) => {
    try {
        console.log(event);
        if (event.httpMethod == "POST") {
            /* configure faunaDB Client with our secret */
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.FAUNA_SECRET
            })

            const data = JSON.parse(event.body)

            return client.query(q.Create(q.Collection('specialists'), { data }))
                .then((response) => {
                    console.log('success', response)
                    callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(response),
                        RESPONSE_HEADERS
                    })
                }).catch((error) => {
                    console.log('error', error)
                    callback(null, {
                        statusCode: 400,
                        body: JSON.stringify(error),
                        RESPONSE_HEADERS
                    })
                })
        }
        else {
            callback(null, {
                statusCode: 204,
                body: JSON.stringify({}),
                RESPONSE_HEADERS
            })
        }
    } catch (error) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({ status: `error` }),
        });
    }
};