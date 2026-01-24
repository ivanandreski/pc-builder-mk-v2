import { chromium } from "playwright";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { StoreConfig } from "@/types";

export class Scraper {
  public readonly storeConfig: StoreConfig;
  public readonly browser: Browser;
  public readonly context: BrowserContext;
  public readonly page: Page;

  constructor(storeConfig: StoreConfig, browser: Browser, context: BrowserContext, page: Page) {
    this.storeConfig = storeConfig;
    this.browser = browser;
    this.context = context;
    this.page = page;
  }

  static async init(storeConfig: StoreConfig): Promise<Scraper> {
    const browser = await chromium.launch({
      headless: false
    });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    });
    const page = await context.newPage();

    return new Scraper(storeConfig, browser, context, page)
  }
}