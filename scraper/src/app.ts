import { storeConfigs } from "@/config/config";
import { Scraper } from "@/scraper/scraper";
import { Store } from "@/types";


const app = async () => {
  // TODO add arguments check, if no provided run all, else only needed
  for (const store of Object.values(Store)) {
    const storeConfig = storeConfigs[store];
    if (!storeConfig) {
      console.log(`Skipping store: ${store}, no config found!`)
      continue;
    }

    const scraper = await Scraper.init(storeConfigs[store]);
    await storeConfig.scraper.scrape(scraper);
    await scraper.browser.close();
  }
}

app();