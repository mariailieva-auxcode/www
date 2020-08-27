import cloudinaryService from './blob/cloudinary.service'
import { BlobProviders } from '../enums/blob-providers.enum';


export default class AssetsService {
    uploadFile(file: string, filename: string) {
        let blobProvider = BlobProviders.AMAZON
        if (blobProvider === BlobProviders.AMAZON) {
            // await s3Service.upload()
        } else if (blobProvider === BlobProviders.CLOUDINARY) {
            cloudinaryService.uploadFile(file, filename)
        }
    }
}