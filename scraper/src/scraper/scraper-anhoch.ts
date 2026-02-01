import { setTimeout } from "node:timers/promises";

import { Scraper } from "@/scraper/scraper";
import { convertFormattedPrice } from "@/utils";
import { ScrapeUtils } from "@/scraper/utils";
import { AbstractStoreScraper } from "@/scraper/types";
import { StoreConfig } from "@/types";

export class ScraperAnhoch extends AbstractStoreScraper {
  constructor(scraper: Scraper) {
    super(scraper);
  }

  static async init(storeConfig: StoreConfig): Promise<ScraperAnhoch> {
    const scraper = await Scraper.init(storeConfig);

    return new ScraperAnhoch(scraper);
  }

  async tryCloseModal() {
    try {
      await this.scraper.page.waitForSelector('button.close', { timeout: 2000 });
      await this.scraper.page.click('button.close');
    } catch (_) { }
  }

  async scrapeProductDetailsLinks() {
    this.productDetailsLinks.clear();
    while (true) {
      const productCards = await this.scraper.page.locator('div.product-card');
      for (let i = 0; i < await productCards.count(); i++) {
        const productLink = await productCards.nth(i).locator('a.product-name').getAttribute('href');
        if (productLink) {
          this.productDetailsLinks.add(productLink);
        }
      }

      const pagination = await this.scraper.page.locator('ul.pagination').nth(0);
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

  async scrapeProductDetails() {
    for (const productDetailsLink of this.productDetailsLinks) {
      await this.scraper.page.goto(productDetailsLink);

      const productName = (await this.scraper.page.locator('h1.product-name').textContent() || '').trim();
      const imageUrl = (await this.scraper.page.locator('div.base-image-slide img.zoomImg').nth(0).getAttribute('src') || '').trim();
      const productPriceRAW = (await this.scraper.page.locator('div.details-info-middle div.product-price').innerText()).trim();
      const productPrice = convertFormattedPrice(productPriceRAW.substring(0, productPriceRAW.length - 5));
      const uniqueIdRAW = (await this.scraper.page.locator('li.sku').innerText()).trim();
      const uniqueId = uniqueIdRAW.substring(7, uniqueIdRAW.length).trim();
      const description = await this.scraper.page.locator('div#description').innerText();
      const availability = await this.scraper.page.locator('div.availability').evaluate(e => e.classList.contains('in-stock'))

      this.scrapedProducts.push({
        store: 'ANHOCH',
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

  async scrape() {
    const { storeConfig } = this.scraper;
    for (const categoryConfig of storeConfig.categories) {
      for (const path of categoryConfig.paths) {
        const url = `${storeConfig.baseUrl}${path}`;
        await this.scraper.page.goto(url);

        await this.tryCloseModal();

        await this.scrapeProductDetailsLinks();

        await this.scrapeProductDetails();
      }

      ScrapeUtils.writeScrapedDataToFile(
        storeConfig.store,
        categoryConfig.category,
        this.timestamp,
        this.scrapedProducts
      );
      this.scrapedProducts.length = 0;
    }

    await this.scraper.browser.close();
  }
}