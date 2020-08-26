import { RESPONSE_HEADERS } from "./api/constants/response-headers.constant";
import AssetsService from "./data/services/assets.service"

export async function handler(event, _) {
    try {
        if (event.httpMethod == "POST") {
            let assetsService = new AssetsService();
            assetsService.uploadFile(); // put the base64 file as parameter + filename
            return {
                statusCode: 200,
                body: JSON.stringify({}),
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