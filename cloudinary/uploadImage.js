import { cloudinary } from "./index.js";
import { optimizeImage } from "./optimizeImage.js";

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

export async function uploadImage(imagePath) {
  try {
    const image = {
      oldImage: {},
      optimizedImage: {},
    };

    const result = await cloudinary.uploader.upload(imagePath, options);

    const { public_id: publicId, format, bytes, url } = result;
    const resultOptimizedImage = await optimizeImage(publicId);

    image.oldImage = { publicId, format, bytes, url };
    image.optimizedImage = { ...resultOptimizedImage };

    return image;
  } catch (error) {
    console.error(error);
  }
}
