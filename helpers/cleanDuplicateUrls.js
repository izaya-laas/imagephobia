export function cleanDuplicateUrls(arrayImages) {
  const set = new Set(arrayImages);
  const arrayFilteredDuplicatedImages = Array.from(set);

  console.log(arrayImages.length, arrayFilteredDuplicatedImages.length);

  return arrayFilteredDuplicatedImages;
}
