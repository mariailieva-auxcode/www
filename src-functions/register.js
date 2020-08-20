import { headers } from './constants/headers.constant';

const faunadb = require('faunadb');
const passwordHash = require('password-hash');
const q = faunadb.query;

export async function handler(event, _) {
    try {
        if (event.httpMethod == "POST") {
            /* configure faunaDB Client with our secret */
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })

            const data = JSON.parse(event.body)
            data.password = passwordHash.generate(data.password);

            let response = await client.query(q.Create(q.Collection('users'), {
                data
            }))
            return {
                statusCode: 200,
                body: JSON.stringify(response),
                headers
            }
        } else {
            return {
                statusCode: 204,
                body: JSON.stringify({}),
                headers
            }
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: `error`
            }),
        };
    }
};