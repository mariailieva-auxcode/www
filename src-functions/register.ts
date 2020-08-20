import { headers } from './constants/headers.constant';
import faunadb from 'faunadb'
import passwordHash from 'password-hash';

const q = faunadb.query;

type UserInput = {
    email: string,
    password: string
}

type SiteOwnerInput = {
    email: string,
    password: string,
    energyType: {
        wind: boolean,
        solar: boolean,
      },
      siteType: {
        roof: boolean,
        land: boolean,
        water: boolean,
      },
      size: string,
      postCode: string,
      streetNumber: string,
      companyName: string,
      name: string,
      phoneNumber: string,
}

export async function handler(event, _) {
    try {
        if (event.httpMethod == "POST") {
            /* configure faunaDB Client with our secret */
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })

            const data: UserInput | SiteOwnerInput = JSON.parse(event.body);
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