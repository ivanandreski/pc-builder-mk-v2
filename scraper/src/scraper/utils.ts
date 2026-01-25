import { ScrapedProduct } from "@/types";
import { writeDataToFile } from "@/utils";
import { ScraperProperties } from "@/scraper/types";
import { Category, Store } from "@/enums";

export const ScrapeUtils = {
  initScraper: (): ScraperProperties => {
    return {
      productDetailsLinks: new Set(),
      scrapedProducts: [],
      timestamp: Date.now(),
    }
  },

  writeScrapedDataToFile: (store: Store, category: Category, timestamp: number, scrapedProducts: ScrapedProduct[]) => {
    writeDataToFile(
      store,
      `${category.toLowerCase()}_${timestamp}.json`,
      scrapedProducts
    );
  }
}