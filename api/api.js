import express from "express";
import cors from "cors";
import { scrapImages } from "../scrapping/scrapImages.js";
import { uploadImages } from "../cloudinary/uploadImages.js";
import { cleanDuplicateUrls } from "../helpers/cleanDuplicateUrls.js";
import { validateURL } from "../helpers/validateUrl.js";

const app = express();
const port = 8080;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  express.text({
    type: "*/*",
  })
);

app.use(cors());

app.post("/prueba", async (req, res) => {
  try {
    const urlPage = req.body;
    const config = req.query;

    console.log(urlPage);
    console.log(config);

    const resultValidate = validateURL(urlPage);

    if (!resultValidate) {
      throw { name: "URL BAD", status: 400 };
    }

    console.log("Escrapeamos imagenes");
    const arrayImages = await scrapImages(urlPage);

    if (arrayImages?.status) {
      const { name, status } = arrayImages;
      throw { name, status };
    }

    const arrayImagesFilteredDuplicates = cleanDuplicateUrls(arrayImages);

    console.log("Subiendo imagenes");
    const images = await uploadImages(arrayImagesFilteredDuplicates, config);
    return res.send(images);
  } catch (e) {
    const { name, status } = e;
    console.log(e);

    res.statusMessage = name;
    return res.status(status).send();
  }
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Estoy ejecutandome en http://localhost:${port}`);
});
