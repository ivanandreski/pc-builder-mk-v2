export const STORES = ["anhoch", "ddstore", "setec"] as const;
export type Store = (typeof STORES)[number];

export const CATEGORIES = [
  "CPU",
  "MOBO",
  "GPU",
  "PSU",
  "STORAGE",
  "CASE",
  "COOLER"
] as const;
export type Category = (typeof CATEGORIES)[number];
