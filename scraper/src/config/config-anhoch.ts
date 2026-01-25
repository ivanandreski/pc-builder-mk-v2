import { scraperAnhoch } from "@/scraper/scraper-anhoch";
import { StoreConfig } from "@/types";

export const configAnhoch: StoreConfig = {
  store: "ANHOCH",
  scraper: scraperAnhoch,
  baseUrl: 'https://www.anhoch.com/categories',
  categories: [
    {
      category: "CPU",
      paths: ['/procesori/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: "MOBO",
      paths: ['/matichni-plochi/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: "GPU",
      paths: ['/grafichki-karti/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: "PSU",
      paths: ['/napojuvanja/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: "STORAGE",
      paths: ['/diskovi-i-skladiranje/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: "CASE",
      paths: ['/kukjishta/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1']
    },
    {
      category: "COOLER",
      paths: [
        '/vozdushni-ladilnici/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1',
        '/vodeno-ladenje/products?inStockOnly=2&sort=priceLowToHigh&perPage=50&page=1'
      ]
    },
  ]
} as const;