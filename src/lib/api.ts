import "server-only";

import { cache } from "react";
import type { Category, Product } from "@/types";

const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// Fetch data with fallback API
async function apiFetch<T>(path: string): Promise<T> {
  for (const baseURL of BASE_URLS) {
    try {
      const response = await fetch(`${baseURL}${path}`, {
        next: {
          revalidate: 300,
        },
      });

      if (!response.ok) {
        console.warn(
          `API request failed: ${response.status}`
        );

        continue;
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error("API connection error:", error);
    }
  }

  throw new Error(
    "API সার্ভার থেকে তথ্য আনা যাচ্ছে না। কিছুক্ষণ পরে চেষ্টা করুন।"
  );
}

// All Categories
export const getCategories = cache(
  async (): Promise<Category[]> => {
    return apiFetch<Category[]>("/categories");
  }
);

// Single Category
export const getCategory = cache(
  async (slug: string): Promise<Category | null> => {
    const categories = await getCategories();

    return (
      categories.find((category) => category.slug === slug) ??
      null
    );
  }
);

// All Products
export const getProducts = cache(
  async (): Promise<Product[]> => {
    return apiFetch<Product[]>("/products");
  }
);

// Filter Products
export const getProductsByCategory = cache(
  async (slug: string): Promise<Product[]> => {
    return apiFetch<Product[]>(
      `/products?category=${encodeURIComponent(slug)}`
    );
  }
);

// Single Product by Slug
export const getProduct = cache(
  async (slug: string): Promise<Product | null> => {
    const products = await getProducts();

    return (
      products.find((product) => product.slug === slug) ??
      null
    );
  }
);