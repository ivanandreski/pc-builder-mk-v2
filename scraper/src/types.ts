import { IStoreScraper } from "@/scraper/IStoreScraper";

export enum Store {
  SETEC = "SETEC",
  DDSTORE = "DDSTORE",
  ANHOCH = "ANHOCH",
}

export enum Category {
  CPU = "Processor",
  MOBO = "Motherboard",
  GPU = "Graphics Card",
  PSU = "Power Supply",
  STORAGE = "Storage",
  CASE = "Case",
  COOLER = "CPU Cooler"
}

export interface ScrapedProduct {
  store: Store;
  category: Category;
  uniqueId: string;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  imageUrl?: string;
  productUrl: string;
}

export interface CategoryConfig {
  category: Category;
  paths: string[];
}

export interface StoreConfig {
  store: Store;
  scraper: IStoreScraper;
  baseUrl: string;
  categories: CategoryConfig[]
}