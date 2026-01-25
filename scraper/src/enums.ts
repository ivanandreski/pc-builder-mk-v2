export const STORES = ["ANHOCH", "DDSTORE", "SETEC"] as const;
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
