import { ScrapedProduct } from "@/types";
import { writeDataToFile } from "@/utils";
import { Category, Store } from "@/enums";

export const ScrapeUtils = {
  writeScrapedDataToFile: (store: Store, category: Category, timestamp: number, scrapedProducts: ScrapedProduct[]) => {
    writeDataToFile(
      store,
      `${category.toLowerCase()}_${timestamp}.json`,
      scrapedProducts
    );
  }
}