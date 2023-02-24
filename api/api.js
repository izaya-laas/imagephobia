import express from "express";
import cors from "cors";
import { scrapImages } from "../scrapping/scrapImages.js";

const app = express();
const port = 8080;

console.log(cors());

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

app.get("/prueba/:url", (req, res) => {
  res.send("Hola, estoy funcionando");
  console.log("xd funciona get");

  const { url } = req.params;

  console.log(url);
});

app.post("/prueba", async (req, res) => {
  console.log("xd funciona post");

  console.log(req.body);
  const images = await scrapImages();
  res.send(images);
});

app.listen(port, () => {
  console.log(`Estoy ejecutandome en http://localhost:${port}`);
});
