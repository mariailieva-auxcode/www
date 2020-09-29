import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
import passwordHash from 'password-hash';
import { User } from './api/interfaces/user.interface';
import { SiteOwner } from './api/interfaces/site-owner.interface';
import { Site } from '../common/models/site.model';


const q = faunadb.query;

export function getSite(): Site {

    return new Site({})
}
export async function handler(event, _) {
    try {
        if (event.httpMethod == "POST") {
            /* configure faunaDB Client with our secret */
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })
            let site = new Site()
            const data: User | SiteOwner = JSON.parse(event.body);
            console.log(1)

            data.password = passwordHash.generate(data.password);
            console.log(data)
            let response = await client.query(q.Create(q.Collection('users'), {
                data
            }))
            console.log(response)
            return {
                statusCode: 200,
                body: JSON.stringify(response),
                headers: RESPONSE_HEADERS
            }
        } else {
            return {
                statusCode: 204,
                body: JSON.stringify({}),
                headers: RESPONSE_HEADERS
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