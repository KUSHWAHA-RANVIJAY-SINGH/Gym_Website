const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadBase64 = async (base64Str, folder = 'gymos') => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(base64Str, {
      folder,
      resource_type: 'auto'
    });
    return uploadResponse.secure_url;
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

module.exports = {
  cloudinary,
  uploadBase64
};
