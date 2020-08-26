import cloudinary from 'cloudinary';
import { BlobProviders } from '../enums/blob-providers.enum';


export default class AssetsService {
    init() { // move to the cloudinary service
        cloudinary.v2.config({ 
            cloud_name: process.env.VUE_APP_CLOUDINARY_API_CLOUDNAME, 
            api_key: process.env.VUE_APP_CLOUDINARY_API_KEY, 
            api_secret: process.env.VUE_APP_CLOUDINARY_API_SECRET 
          });
    }

    uploadFile(fileInBase64: string, filename: string) {
        let blobProvider = BlobProviders.AMAZON
        if(blobProvider === BlobProviders.AMAZON) {
            // await s3Service.upload()
        } else if (blobProvider === BlobProviders.CLOUDINARY) {
            // await cloudinary.upload();
        }
        // all code bellow should go to cloudinary service
        this.init();
        var timestamp = Math.round((new Date).getTime()/1000);
        
        var signature = cloudinary.v2.utils.api_sign_request({
            timestamp: timestamp,
            eager: 'w_400,h_300,c_pad|w_260,h_200,c_crop', // how to remove the transformation (costly)
            public_id: filename}, process.env.VUE_APP_CLOUDINARY_API_SECRET);


        cloudinary.v2.uploader.upload(fileInBase64, (error, result) => { // where to put signature
            console.log(result, error)
        })
    }
}