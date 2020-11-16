import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
import passwordHash from 'password-hash';
import { SiteOwner } from './api/interfaces/site-owner.interface';
import { Owner } from '../common/models/owner.model';
import { User } from '../common/models/user.model';
import { uuid } from 'uuidv4';

const q = faunadb.query;

export async function handler(event, _) {
    try {
        if (event.httpMethod == "POST") {
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })
            const data: (User | SiteOwner) & { password: string } = JSON.parse(event.body);

            data.password = passwordHash.generate(data.password);
            /* configure faunaDB Client with our secret */
            let email = data.email;
            let password = data.password;

            let ownerId = uuid() // uuidv4
            let owner = new Owner(ownerId)

            await client.query(q.Create(q.Collection('owners'), {
                data: owner
            }))
            let user = new User({ email, ownerId })
            await client.query(q.Create(q.Collection('users'), {
                data: { ...user, password }
            }))
            return {
                statusCode: 200,
                body: JSON.stringify(user),
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