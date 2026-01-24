import { Scraper } from "@/scraper/scraper";
import { ScrapedProduct } from "@/types";

export interface IStoreScraper {
  scrapedProducts: ScrapedProduct[]
  scrape: (scraper: Scraper) => void;
}