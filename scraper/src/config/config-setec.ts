import { scraperSetec } from "@/scraper/scraper-setec";
import { Category, Store, StoreConfig } from "@/types";

export const configSetec: StoreConfig = {
  store: Store.SETEC,
  scraper: scraperSetec,
  baseUrl: 'https://setec.mk/category',
  categories: [
    {
      category: Category.CPU,
      paths: ['/protsesori-21']
    },
  ]
}