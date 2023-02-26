import { cloudinary } from "./index.js";

export async function optimizeImage(public_id) {
  const optimizedImage = cloudinary.image(public_id, {
    transformation: [
      { quality: "auto" },
      { secure: true },
      { fetch_format: "webp" },
      { flags: "lossy" },
      { dpr: "auto" },
    ],
  });

  const [urlImageWithQuotation] = optimizedImage.match(/'.+'/);
  const urlOptimizedImage = urlImageWithQuotation.replaceAll("'", "");

  const result = await cloudinary.uploader.upload(urlOptimizedImage, {
    overwrite: true,
    public_id: `${public_id}-optimized`,
  });

  const { public_id: publicId, format, bytes, url } = result;

  return { public_id: publicId, format, bytes, url };
}
