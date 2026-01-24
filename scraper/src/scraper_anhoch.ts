import { Scraper } from "./scraper";
import { convertFormattedPrice, writeDataToFile } from "./utils";
import { ScrapedProduct, Store, Category } from "./types";
import { setTimeout } from "node:timers/promises";
import logger from "pino";

export const scrape = async (scraper: Scraper) => {
  const { browser, page, storeConfig } = scraper;
  for (const categoryConfig of storeConfig.categories) {
    const url = `${storeConfig.baseUrl}${categoryConfig.path}`;
    await page.goto(url);

    await page.waitForSelector('button.close')
    await page.click('button.close');

    const products: ScrapedProduct[] = [];
    const productDetailsLinks: Set<string> = new Set();

    while (true) {
      const productCards = await page.locator('div.product-card');
      for (let i = 0; i < await productCards.count(); i++) {
        const productLink = await productCards.nth(i).locator('a.product-name').getAttribute('href');
        productDetailsLinks.add(productLink);
      }

      const pagination = await page.locator('ul.pagination').nth(0);
      const lastButton = await pagination
        .locator('li.page-item:last-child button.page-link');

      if (await lastButton.evaluate(e => e.classList.contains('disabled'))) {
        break;
      }

      await lastButton.click();
      // Page doesn't fully load after click(), so we give it a timeout to make sure it's loaded
      await setTimeout(5000);
    }

    for (const productDetailsLink of productDetailsLinks) {
      await page.goto(productDetailsLink);

      const productName = (await page.locator('h1.product-name').textContent()).trim();
      const imageUrl = (await page.locator('div.base-image-slide img.zoomImg').nth(0).getAttribute('src')).trim();
      const productPriceRAW = (await page.locator('div.details-info-middle div.product-price').innerText()).trim();
      const productPrice = convertFormattedPrice(productPriceRAW.substring(0, productPriceRAW.length - 5));
      const uniqueIdRAW = (await page.locator('li.sku').innerText()).trim();
      const uniqueId = uniqueIdRAW.substring(7, uniqueIdRAW.length).trim();
      const description = await page.locator('div#description').innerText();
      const availability = await page.locator('div.availability').evaluate(e => e.classList.contains('in-stock'))

      products.push({
        store: Store.ANHOCH,
        category: Category.CPU,
        uniqueId: uniqueId,
        name: productName,
        description: description,
        price: productPrice,
        availability: availability,
        imageUrl: imageUrl,
        productUrl: productDetailsLink
      })
    }

    writeDataToFile(storeConfig.store, `${categoryConfig.category}_${Date.now()}.json`, products);
  }

  await browser.close();

}