import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "decfzzdye",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };
