import express from "express";
import cors from "cors";

const app = express();
const port = 8080;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  express.json({
    type: "*/*",
  })
);
app.use(cors());

app.get("/prueba", (req, res) => {
  res.send("Hola, estoy funcionando");
});

app.post("/prueba", (req, res) => {
  res.send("Me hicieron un post");
});

app.listen(port, () => {
  console.log(`Estoy ejecutandome en http://localhost:${port}`);
});
