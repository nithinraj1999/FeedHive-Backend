"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadArticleImage = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// export const uploadArticleImage = async (filePath: string) => {
//     return cloudinary.uploader.upload(filePath, {
//       folder: 'articleimage',
//     });
//   };
const uploadArticleImage = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: "articleimage" }, (error, result) => {
            if (error)
                return reject(error);
            if (!result)
                return reject(new Error("Upload failed"));
            resolve({ url: result.secure_url, public_id: result.public_id });
        });
        uploadStream.end(buffer); // Send the buffer to Cloudinary
    });
};
exports.uploadArticleImage = uploadArticleImage;
