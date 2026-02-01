import { ScrapedProduct } from "@/types";
import { Scraper } from "@/scraper/scraper";

export interface StoreScraper {
  scraper: Scraper;
  scrapedProducts: ScrapedProduct[];
  timestamp: number;
}

export abstract class AbstractStoreScraper implements StoreScraper {
  public readonly scraper: Scraper;
  public readonly productDetailsLinks: Set<string>;
  public readonly scrapedProducts: ScrapedProduct[];
  public readonly timestamp: number;

  constructor(scraper: Scraper) {
    this.scraper = scraper;
    this.productDetailsLinks = new Set();
    this.scrapedProducts = [];
    this.timestamp = Date.now();
  }

  abstract scrape(): Promise<void>;
  abstract scrapeProductDetailsLinks(): Promise<void>;
  abstract scrapeProductDetails(): Promise<void>;
}

export interface ScraperProperties {
  productDetailsLinks: Set<string>;
  scrapedProducts: ScrapedProduct[];
  timestamp: number;
}