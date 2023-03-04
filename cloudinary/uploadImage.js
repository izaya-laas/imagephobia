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

    if (image.oldImage.bytes < image.optimizedImage.bytes) {
      const { publicId: publicIdOld } = image.oldImage;
      const { publicId: publicIdOptimized } = image.optimizedImage;

      await cloudinary.uploader.destroy(publicIdOld);
      await cloudinary.uploader.destroy(publicIdOptimized);

      return null;
    }

    return image;
  } catch (error) {
    console.error(error);
  }
}
