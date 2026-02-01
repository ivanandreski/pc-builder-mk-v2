import { storeConfigs } from "@/config/config";
import { Store, STORES } from "@/enums";
import { scraperFactory } from "./scraper/scraper-factory";

export const parseArguments = (): Store[] => {
  const storeArguments: Store[] = process.argv.filter(arg =>
    STORES.includes(arg as Store)
  ) as Store[];

  if (storeArguments.length == 0) {
    return [...STORES];
  }

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

    try {
      const storeScraper = await scraperFactory(storeConfig);
      await storeScraper.scrape();
    } catch (error) {
      console.error(error);
    }
  }
}

app();