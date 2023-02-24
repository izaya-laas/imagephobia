import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "decfzzdye",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(imagePath) {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    const { public_id: publicId, format, bytes, url } = result;
    console.log(result);
    await optimizeImage(publicId);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
}

export async function optimizeImage(public_id) {
  const imageOptimize = cloudinary.image(public_id, {
    transformation: [
      { quality: "auto" },
      { fetch_format: "auto" },
      { flags: "lossy" },
      { dpr: "auto" },
    ],
  });

  console.log(imageOptimize);
}

uploadImage(
  "https://www.freecodecamp.org/news/content/images/size/w2000/2022/06/How-to-Build-a-Weather-Application-using-React--14-.png"
);

const getAssetInfo = async (publicId) => {
  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options);
    console.log(result);
    return result.colors;
  } catch (error) {
    console.error(error);
  }
};
