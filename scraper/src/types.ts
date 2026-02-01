import { Store, Category } from "@/enums";

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
  baseUrl: string;
  categories: CategoryConfig[]
}