import { scraperAnhoch } from "@/scraper/scraper-anhoch";
import { Category, Store, StoreConfig } from "@/types";

export const configAnhoch: StoreConfig = {
  store: Store.ANHOCH,
  scraper: scraperAnhoch,
  baseUrl: 'https://www.anhoch.com/categories',
  categories: [
    {
      category: Category.CPU,
      paths: ['/procesori/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: Category.MOBO,
      paths: ['/matichni-plochi/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: Category.GPU,
      paths: ['/grafichki-karti/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: Category.PSU,
      paths: ['/napojuvanja/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: Category.STORAGE,
      paths: ['/diskovi-i-skladiranje/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: Category.CASE,
      paths: ['/kukjishta/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: Category.COOLER,
      paths: [
        '/vozdushni-ladilnici/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1',
        '/vodeno-ladenje/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1'
      ]
    },
  ]
}