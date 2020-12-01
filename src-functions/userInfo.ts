import { RESPONSE_HEADERS } from './api/constants/responseHeaders';
import faunadb from 'faunadb'
import { StatusCode } from './api/enums/status-codes.enum';
const q = faunadb.query;

export async function handler(event, _) {
    try {
        if (event.httpMethod == "PUT") {
            console.log("CONNECTING TO DB")
            const client = new faunadb.Client({
                secret: process.env.VUE_APP_FAUNA_SECRET
            })
            const data = JSON.parse(event.body)
            console.log(data);
            return client.query(q.Update(
                q.Select(
                    "ref",
                    q.Get(q.Match(q.Index("user_by_id"), data.ownerId))
                ),
                { data }
            )).then((response) => {
                return {
                    statusCode: StatusCode.Success,
                    body: JSON.stringify(response),
                    headers: RESPONSE_HEADERS
                }
            }).catch(error => {
                return {
                    statusCode: StatusCode.BadRequest,
                    body: JSON.stringify(error),
                    headers: RESPONSE_HEADERS
                }
            })
        }
        return {
            statusCode: StatusCode.Success,
            headers: RESPONSE_HEADERS,
            body: "enable cors"
        }

    } catch (error) {
        return {
            statusCode: StatusCode.FAIL,
            body: JSON.stringify({ status: `error` }),
        }
    }
}