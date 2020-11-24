import { RESPONSE_HEADERS } from "./api/constants/responseHeaders";
import { StatusCode } from "./api/enums/status-codes.enum";
import AssetsService from "./data/services/assets.service"

export async function handler(event, _) {
    try {
        console.log(event)
        if (event.httpMethod == "POST") {
            let assetsService = new AssetsService();
            let body = JSON.parse(event.body)
            assetsService.uploadFile(body.file, body.filename); // put the base64 file as parameter + filename
            return {
                statusCode: StatusCode.Success, // (TODO: m1) put the status codes under api/enums/status-codes.ts as enum and give a proper name to every one of them
                body: JSON.stringify({}),
                headers: RESPONSE_HEADERS
            }
        } else {
            return {
                statusCode: StatusCode.NoContent,
                body: JSON.stringify({}),
                headers: RESPONSE_HEADERS
            }
        }
    } catch (error) {
        return {
            statusCode: StatusCode.FAIL,
            body: JSON.stringify({
                status: `error`
            }),
        };
    }
};