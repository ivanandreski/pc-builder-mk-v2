import { scraperAnhoch } from "./scraper/scraper-anhoch";
import { Category, Store, StoreConfig } from "./types";

export const storeConfigs: Record<string, StoreConfig> = {
  [Store.ANHOCH]: {
    store: Store.ANHOCH,
    scraper: scraperAnhoch,
    baseUrl: 'https://www.anhoch.com/categories',
    categories: [
      {
        category: Category.CPU,
        path: '/procesori/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1'
      }
    ]
  }
};