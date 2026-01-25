import { ScrapedProduct } from "@/types";
import { Scraper } from "@/scraper/scraper";

export interface StoreScraper {
  scrapedProducts: ScrapedProduct[];
  timestamp: number;
  scrape: (scraper: Scraper) => void;
}

export interface ScraperProperties {
  productDetailsLinks: Set<string>;
  scrapedProducts: ScrapedProduct[];
  timestamp: number;
}