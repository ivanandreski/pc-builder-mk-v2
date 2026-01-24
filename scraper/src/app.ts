import { storeConfigs } from "./config";
import { Scraper } from "./scraper";
import { scrape } from "./scraper_anhoch";
import { Store } from "./types";
import { scrape as scrapeAnhoch } from "./scraper_anhoch"


const app = async () => {
  // TODO add arguments check
  for (const store of Object.values(Store)) {
    const storeConfig = storeConfigs[store];
    if (!storeConfig) {
      console.log(`Skipping store: ${store}, no config found!`)
      continue;
    }

    const scraper = await Scraper.init(storeConfigs[store]);
    await scrapeAnhoch(scraper);
  }
}

app();