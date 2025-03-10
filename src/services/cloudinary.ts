import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// export const uploadArticleImage = async (filePath: string) => {
//     return cloudinary.uploader.upload(filePath, {
//       folder: 'articleimage',
//     });
//   };


export const uploadArticleImage = (buffer: Buffer): Promise<{ url: string; public_id: string }> => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "articleimage" },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Upload failed"));
          resolve({ url: result.secure_url, public_id: result.public_id });
        }
      );
      uploadStream.end(buffer); // Send the buffer to Cloudinary
    });
  };
  