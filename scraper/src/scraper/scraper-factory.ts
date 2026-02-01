import { StoreConfig } from "@/types";
import { ScraperAnhoch } from "./scraper-anhoch";
import { AbstractStoreScraper } from "./types";

export const scraperFactory = async (storeConfig: StoreConfig): Promise<AbstractStoreScraper> => {
  switch (storeConfig.store) {
    case "ANHOCH":
      return await ScraperAnhoch.init(storeConfig);
    // case "DDSTORE":
    //   return null;
    // case "SETEC":
    //   return null;

    default:
      throw new Error("Unsupported store provided!");
  }
}