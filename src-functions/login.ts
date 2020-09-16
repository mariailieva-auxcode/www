import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
import passwordHash from 'password-hash';
import { User } from './api/interfaces/user.interface';
import jwt from 'jsonwebtoken';

const q = faunadb.query;

export async function handler(event, _) {
    try {
        console.log(event);
        if (event.httpMethod == "POST") {
            /* configure faunaDB Client with our secret */
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })

            console.log(event)
            const body: User = JSON.parse(event.body)
            return client.query(q.Map(
                q.Paginate(q.Documents(q.Collection('users'))),
                q.Lambda(x => q.Get(x))
            ))
                .then((response: any) => {
                    const user = response.data.find((user: any) => user.data.email == body.email &&
                        passwordHash.verify(body.password, user.data.password))
                    if (user) {
                        // if (passwordHash.verify(body.password, user.data.password)) {
                        const token = jwt.sign(user.data, 'secret');
                        return {
                            statusCode: 200,
                            headers: RESPONSE_HEADERS,
                            body: JSON.stringify({ ...user.data, token }),
                        }
                    } else {
                        return {
                            statusCode: 400,
                            body: "Wrong username or password",
                            headers: RESPONSE_HEADERS
                        }
                    }
                    // not existing user
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
        };
    }
};