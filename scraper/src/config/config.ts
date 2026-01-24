import { Store, StoreConfig } from "@/types";
import { configAnhoch } from "@/config/config-anhoch";

export const storeConfigs: Record<string, StoreConfig> = {
  [Store.ANHOCH]: configAnhoch,
};