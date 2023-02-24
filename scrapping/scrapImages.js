import playwright from "playwright";

export async function scrapImages() {
  const browser = await playwright.chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://oxylabs.io/blog/playwright-web-scraping");

  const imagesData = await page.$$eval("img", (images) => {
    const data = [];

    images.forEach((image) => {
      if (image.style.display === "none") return;

      const currentUrlImage = image.getAttribute("src");
      console.log(currentUrlImage);
      data.push(currentUrlImage);
    });

    return data;
  });

  await page.close();

  // const image = await fetch(`https://playwright.dev${imagesData[0]}`);

  return imagesData;
}

//Crear memes - Crear avatares - optimizar imagenes - optimizador de imagenes en paginas web - generar miniaturas para  youtube

//Aplicacion web que te pide la url y ve todas las images y videos de tu pagina. deciendote el rendimiento que podes tener optimizandolas y ofriendote codigo con cloudinary para que el traslado de tus imagenes a cloudinary sea mas facil.

//FECHA LIMITE 6 DE MARZO A LAS 23:59:59 CET
