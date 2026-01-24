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
  HDD = "Hard Drive",
  SSD = "Solid State Drive",
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
  path: string;
}

export interface StoreConfig {
  store: Store;
  baseUrl: string;
  categories: CategoryConfig[]
}