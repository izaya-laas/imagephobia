import { chromium } from "playwright";

export async function scrapImages(urlPage) {
  const browser = await chromium.launch({
    headless: false,
  });
  const page = await browser.newPage();

  try {
    const { origin } = new URL(urlPage);

    await page.goto(urlPage);

    await page.waitForLoadState("load");
    await page.waitForTimeout(4000);

    const imagesData2 = await page.$$eval("img", (images) => {
      const data = [];
      images.forEach((image) => {
        if (image.style.display === "none") return;

        image.scrollIntoView();
        let currentUrlImage = image.getAttribute("src");

        if (!currentUrlImage) return;

        if (!currentUrlImage.includes("http"))
          currentUrlImage = `${origin}${currentUrlImage}`;

        data.push(currentUrlImage);
      });

      return data;
    });

    await page.close();
    return imagesData2;
  } catch (e) {
    await page.close();

    return {
      name: "Error on scrap images, the website don't respond",
      status: 400,
    };
  }
}
