import { uploadImage } from "./uploadImage.js";

export async function uploadImages(arrayImages, config) {
  const data = [];

  const promises = arrayImages.map(async (image) => {
    const currentImage = await uploadImage(image, config);

    if (!currentImage) return;

    data.push(currentImage);
  });

  await Promise.all(promises);

  return data;
}
