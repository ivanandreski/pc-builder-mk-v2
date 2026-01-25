import { setTimeout } from "node:timers/promises";

import { Scraper } from "@/scraper/scraper";
import { convertFormattedPrice } from "@/utils";
import { ScrapeUtils } from "@/scraper/utils";
import { StoreScraper } from "@/scraper/types";
import { Page } from "@playwright/test";

export const scraperAnhoch = (() => {
  const { productDetailsLinks, scrapedProducts, timestamp } = ScrapeUtils.initScraper();

  const tryCloseModal = async (page: Page) => {
    try {
      await page.waitForSelector('button.close', { timeout: 2000 });
      await page.click('button.close');
    } catch (_) { }
  }

  const scrapeProductDetailsLinks = async (page: Page) => {
    productDetailsLinks.clear();
    while (true) {
      const productCards = await page.locator('div.product-card');
      for (let i = 0; i < await productCards.count(); i++) {
        const productLink = await productCards.nth(i).locator('a.product-name').getAttribute('href');
        if (productLink) {
          productDetailsLinks.add(productLink);
        }
      }

      const pagination = await page.locator('ul.pagination').nth(0);
      const lastButton = await pagination
        .locator('li.page-item:last-child button.page-link');

      try {
        if (await lastButton.evaluate(e => e.classList.contains('disabled'))) {
          break;
        }
      } catch (_) {
        console.log("Page has no pagination, single plage only. Breaking cycle!")
        break;
      }

      await lastButton.click();
      // Page doesn't fully load after click(), so we give it a timeout to make sure it's loaded
      await setTimeout(5000);
    }
  }

  const scrapeProductDetails = async (page: Page) => {
    for (const productDetailsLink of productDetailsLinks) {
      await page.goto(productDetailsLink);

      const productName = (await page.locator('h1.product-name').textContent() || '').trim();
      const imageUrl = (await page.locator('div.base-image-slide img.zoomImg').nth(0).getAttribute('src') || '').trim();
      const productPriceRAW = (await page.locator('div.details-info-middle div.product-price').innerText()).trim();
      const productPrice = convertFormattedPrice(productPriceRAW.substring(0, productPriceRAW.length - 5));
      const uniqueIdRAW = (await page.locator('li.sku').innerText()).trim();
      const uniqueId = uniqueIdRAW.substring(7, uniqueIdRAW.length).trim();
      const description = await page.locator('div#description').innerText();
      const availability = await page.locator('div.availability').evaluate(e => e.classList.contains('in-stock'))

      scrapedProducts.push({
        store: 'anhoch',
        category: 'CPU',
        uniqueId: uniqueId,
        name: productName,
        description: description,
        price: productPrice,
        availability: availability,
        imageUrl: imageUrl,
        productUrl: productDetailsLink
      })
    }
  }

  return {
    scrapedProducts,
    timestamp,

    async scrape(scraper: Scraper) {
      const { page, storeConfig } = scraper;
      for (const categoryConfig of storeConfig.categories) {
        for (const path of categoryConfig.paths) {
          const url = `${storeConfig.baseUrl}${path}`;
          await page.goto(url);

          await tryCloseModal(page);

          await scrapeProductDetailsLinks(page);

          await scrapeProductDetails(page);
        }

        ScrapeUtils.writeScrapedDataToFile(
          storeConfig.store,
          categoryConfig.category,
          timestamp,
          scrapedProducts
        );
        scrapedProducts.length = 0;
      }
    },
  };
})() satisfies StoreScraper;