import type { Product, ProductsResponse } from "../types/product.types";

const BASE_URL = 'https://dummyjson.com';

export const api = {
  // Fetch all products with pagination
  async getProducts(limit: number = 12, skip: number = 0): Promise<ProductsResponse> {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Fetch single product by ID
  async getProductById(id: number): Promise<Product> {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Fetch products by category
  async getProductsByCategory(category: string, limit: number = 12, skip: number = 0): Promise<ProductsResponse> {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch products by category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Fetch all categories
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Search products
  async searchProducts(query: string, limit: number = 12, skip: number = 0): Promise<ProductsResponse> {
    try {
      const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to search products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};