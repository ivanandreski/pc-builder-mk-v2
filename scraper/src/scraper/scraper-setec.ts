// import { Scraper } from "@/scraper/scraper";
// import { convertFormattedPrice, writeDataToFile } from "@/utils";
// import { Store, Category, ScrapedProduct } from "@/types";
// import { IStoreScraper } from "@/scraper/IStoreScraper";
// import { setTimeout } from "node:timers/promises";
// import { ScrapeUtils } from "./utils";

// export const scraperSetec = (() => {
//   const scrapedProducts: ScrapedProduct[] = [];
//   const timestamp = Date.now();

//   return {
//     scrapedProducts,
//     timestamp,

//     async scrape(scraper: Scraper) {
//       const { page, storeConfig } = scraper;
//       for (const categoryConfig of storeConfig.categories) {
//         for (const path of categoryConfig.paths) {
//           const url = `${storeConfig.baseUrl}${path}`;
//           await page.goto(url);

//           const productDetailsLinks: Set<string> = new Set();

//           while (true) {
//             const productCards = await page.locator('div.relative div.grid div.relative');
//             console.log(await productCards.count());
//             // for (let i = 0; i < await productCards.count(); i++) {
//             //   const productLink = await productCards.nth(i).locator('a.product-name').getAttribute('href');
//             //   if (productLink) {
//             //     productDetailsLinks.add(productLink);
//             //   }
//             // }

//             //   const pagination = await page.locator('ul.pagination').nth(0);
//             //   const lastButton = await pagination
//             //     .locator('li.page-item:last-child button.page-link');

//             //   try {
//             //     if (await lastButton.evaluate(e => e.classList.contains('disabled'))) {
//             //       break;
//             //     }
//             //   } catch (_) {
//             //     console.log("Page has no pagination, single plage only. Breaking cycle!")
//             //     break;
//             //   }

//             //   await lastButton.click();
//             //   // Page doesn't fully load after click(), so we give it a timeout to make sure it's loaded
//             //   await setTimeout(5000);
//             // }

//             // for (const productDetailsLink of productDetailsLinks) {
//             //   await page.goto(productDetailsLink);

//             //   const productName = (await page.locator('h1.product-name').textContent() || '').trim();
//             //   const imageUrl = (await page.locator('div.base-image-slide img.zoomImg').nth(0).getAttribute('src') || '').trim();
//             //   const productPriceRAW = (await page.locator('div.details-info-middle div.product-price').innerText()).trim();
//             //   const productPrice = convertFormattedPrice(productPriceRAW.substring(0, productPriceRAW.length - 5));
//             //   const uniqueIdRAW = (await page.locator('li.sku').innerText()).trim();
//             //   const uniqueId = uniqueIdRAW.substring(7, uniqueIdRAW.length).trim();
//             //   const description = await page.locator('div#description').innerText();
//             //   const availability = await page.locator('div.availability').evaluate(e => e.classList.contains('in-stock'))

//             //   scrapedProducts.push({
//             //     store: Store.SETEC,
//             //     category: Category.CPU,
//             //     uniqueId: uniqueId,
//             //     name: productName,
//             //     description: description,
//             //     price: productPrice,
//             //     availability: availability,
//             //     imageUrl: imageUrl,
//             //     productUrl: productDetailsLink
//             //   })
//           }
//         }

//         ScrapeUtils.writeScrapedDataToFile(
//           storeConfig.store,
//           categoryConfig.category,
//           timestamp,
//           scrapedProducts
//         );
//         scrapedProducts.length = 0;
//       }
//     }
//   };
// })() satisfies IStoreScraper;