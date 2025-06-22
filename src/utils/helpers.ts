import type { Product, SortOption } from "../types/product.types";

// Sort products based on sort option
export const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const sortedProducts = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'title-asc':
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sortedProducts;
  }
};

// Filter products by search term
export const filterProductsBySearch = (products: Product[], searchTerm: string): Product[] => {
  if (!searchTerm.trim()) return products;
  
  const term = searchTerm.toLowerCase();
  return products?.filter(product =>
    product?.title?.toLowerCase().includes(term) ||
    product?.description?.toLowerCase().includes(term) ||
    product?.brand?.toLowerCase().includes(term) ||
    product?.category?.toLowerCase().includes(term)
  );
};

// Format price with currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Calculate discounted price
export const calculateDiscountedPrice = (price: number, discountPercentage: number): number => {
  return price - (price * discountPercentage / 100);
};

// Format category name for display
export const formatCategoryName = (category: string): string => {
  return String(category)?.split('-')?.map(word => word.charAt(0).toUpperCase() + word.slice(1))?.join(' ');
};

// Generate star rating display
export const generateStarRating = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars);
};

// Debounce function for search input
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Calculate pagination info
export const calculatePagination = (currentPage: number, totalItems: number, itemsPerPage: number) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  return {
    totalPages,
    startIndex,
    endIndex,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
};