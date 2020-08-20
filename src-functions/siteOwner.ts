import { headers } from './constants/headers.constant';
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
            /* construct the fauna query */
            // serverClient.query(
            //     q.Create(
            //         q.Ref(q.Collection('posts'), '1'),
            //         { data: { title: 'The first post' } },
            //     )
            // )
            //     .then((ret) => console.log(ret))

            return client.query(q.Create(q.Collection('siteOwner'), { data }))
                .then((response) => {
                    console.log('success', response)
                    callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(response),
                        headers
                    })
                }).catch((error) => {
                    console.log('error', error)
                    callback(null, {
                        statusCode: 400,
                        body: JSON.stringify(error),
                        headers
                    })
                })
        }
        else if (event.httpMethod == "GET") {
            const client = new faunadb.Client({
                secret: process.env.FAUNA_SECRET
            })
            console.log(event, context);
            return client.query(q.Map(
                q.Paginate(q.Documents(q.Collection('projectDev'))),
                q.Lambda(x => q.Get(x))
            )).then((response) => {
                console.log("success", response);
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(response),
                    headers,
                })
            }).catch((error) => {
                console.log("error", error);
                callback(null, {
                    statusCode: 400,
                    body: JSON.stringify(error),
                    headers,
                })
            })
        }
        else {
            callback(null, {
                statusCode: 204,
                body: JSON.stringify({}),
                headers
            })
        }
    } catch (error) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({ status: `error` }),
        });
    }
};