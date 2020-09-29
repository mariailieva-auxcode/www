import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
import passwordHash from 'password-hash';
import { SiteOwner } from './api/interfaces/site-owner.interface';
import { Owner } from '../common/models/owner.model';
import { User } from '../common/models/user.model';

const q = faunadb.query;

export async function handler(event, _) {
    try {
        if (event.httpMethod == "POST") {
            /* configure faunaDB Client with our secret */
            let email = event.data.email; // from frontend
            let password = event.data.password;// from frontend

            let ownerId = uuid() // uuidv4
            let owner = new Owner(ownerId)
            
            await client.query(q.Create(q.Collection('owners'), {
                data: owner
            }))
            let user = new User(email, password, ownerId)
            await client.query(q.Create(q.Collection('users'), {
                data: user
            }))
            // console.log("CONNECTING TO DB")
            // const client = new faunadb.Client({
            //     secret: process.env.VUE_APP_FAUNA_SECRET
            // })
            // const data: User | SiteOwner = JSON.parse(event.body);
            // console.log(1)

            // data.password = passwordHash.generate(data.password);
            // console.log(data)
            // let response = await client.query(q.Create(q.Collection('users'), {
            //     data
            // }))
            // console.log(response)
            // return {
            //     statusCode: 200,
            //     body: JSON.stringify(response),
            //     headers: RESPONSE_HEADERS
            // }
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