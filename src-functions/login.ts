import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken';
import { User } from '../common/models/user.model';
import { StatusCode } from './api/enums/status-codes.enum';

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

            const body: User & { password: string } = JSON.parse(event.body)
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
                        const loggedUser = new User(user.data);
                        return {
                            statusCode: StatusCode.Success,
                            headers: RESPONSE_HEADERS,
                            body: JSON.stringify({ ...loggedUser, token }),
                        }
                    } else {
                        return {
                            statusCode: StatusCode.BadRequest,
                            body: "Wrong username or password",
                            headers: RESPONSE_HEADERS
                        }
                    }
                    // not existing user
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
        };
    }
};