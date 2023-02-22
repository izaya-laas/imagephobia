import playwright from "playwright";

const browser = await playwright.chromium.launch({
  headless: false,
});

const page = await browser.newPage();

await page.goto("https://kingsleague.pro");

const imagesData = await page.$$eval("img", (images) => {
  const data = [];

  images.forEach((image) => {
    const currentUrlImage = image.getAttribute("src");
    data.push(currentUrlImage);
  });

  return data;
});

imagesData.forEach((img) => console.log(img));
await page.close();

//Crear memes - Crear avatares - optimizar imagenes - optimizador de imagenes en paginas web - generar miniaturas para  youtube

//Aplicacion web que te pide la url y ve todas las images y videos de tu pagina. deciendote el rendimiento que podes tener optimizandolas y ofriendote codigo con cloudinary para que el traslado de tus imagenes a cloudinary sea mas facil.

//FECHA LIMITE 6 DE MARZO A LAS 23:59:59 CET
