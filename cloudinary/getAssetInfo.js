import { cloudinary } from "./index.js";

const getAssetInfo = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return result;
  } catch (error) {
    console.error(error);
  }
};
