import { cloudinary } from "./index.js";

export async function optimizeImage(public_id, config) {
  const { ieCompatibility } = config;

  const formatOptimize = ieCompatibility === "true" ? "png" : "webp";

  const optimizedImage = cloudinary.image(public_id, {
    transformation: [
      { quality: "auto" },
      { secure: true },
      { fetch_format: formatOptimize },
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

  return { publicId, format, bytes, url };
}
