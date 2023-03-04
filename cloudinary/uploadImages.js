import { uploadImage } from "./uploadImage.js";

export async function uploadImages(arrayImages) {
  const data = [];

  for (let i = 0; i < arrayImages.length; i++) {
    const currentImage = await uploadImage(arrayImages[i]);

    if (!currentImage) continue;

    data.push(currentImage);
  }

  return data;
}
