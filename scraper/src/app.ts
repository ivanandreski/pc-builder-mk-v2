import { storeConfigs } from "@/config/config";
import { Scraper } from "@/scraper/scraper";
import { Store, STORES } from "@/enums";

export const parseArguments = (): Store[] => {
  const storeArguments: Store[] = process.argv.filter(arg =>
    STORES.includes(arg as Store)
  ) as Store[];

  return storeArguments;
};


const app = async () => {
  // TODO improve argument handling
  const storeArguments = parseArguments();

  for (const store of STORES.filter(v => storeArguments.includes(v))) {
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