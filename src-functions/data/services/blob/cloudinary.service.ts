import cloudinary from 'cloudinary'

export class CloudinaryService {
    init() { // move to the cloudinary service
        cloudinary.v2.config({
            cloud_name: process.env.VUE_APP_CLOUDINARY_API_CLOUDNAME,
            api_key: process.env.VUE_APP_CLOUDINARY_API_KEY,
            api_secret: process.env.VUE_APP_CLOUDINARY_API_SECRET
        });
    }

    uploadFile(fileInBase64: string, filename: string) {
        this.init();

        cloudinary.v2.uploader.upload(fileInBase64, { public_id: 'test', type: "private" }, (error, result) => {
            console.log(result, error)
        })
    }
}
export default new CloudinaryService()
