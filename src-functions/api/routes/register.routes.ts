import { RESPONSE_HEADERS } from '../constants/response-headers.constant';
import faunadb from 'faunadb'
import passwordHash from 'password-hash';
import { User } from '../interfaces/user.interface';
import { SiteOwner } from '../interfaces/site-owner.interface';

const q = faunadb.query;

export async function handler(event, _) {
    try {
        if (event.httpMethod == "POST") {
            /* configure faunaDB Client with our secret */
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })

            const data: User | SiteOwner = JSON.parse(event.body);
            data.password = passwordHash.generate(data.password);

            let response = await client.query(q.Create(q.Collection('users'), {
                data
            }))
            return {
                statusCode: 200,
                body: JSON.stringify(response),
                RESPONSE_HEADERS
            }
        } else {
            return {
                statusCode: 204,
                body: JSON.stringify({}),
                RESPONSE_HEADERS
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