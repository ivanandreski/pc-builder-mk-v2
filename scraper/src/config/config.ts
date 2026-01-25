import { StoreConfig } from "@/types";
import { configAnhoch } from "@/config/config-anhoch";
import { Store } from "@/enums";
// import { configSetec } from "./config-setec";

// TODO: set the key as Store, once all scrapers are done
export const storeConfigs: Record<string, StoreConfig> = {
  anhoch: configAnhoch,
  // [Store.SETEC]: configSetec
};