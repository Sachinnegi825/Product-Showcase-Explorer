// Product related types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Filter and sorting types
export type SortOption = 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc';

export interface FilterState {
  category: string;
  sortBy: SortOption;
  searchTerm: string;
}

// Pagination types
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

// Context types
export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: { slug: string; name: string }[];
  selectedProduct: Product | null;
  filters: FilterState;
  pagination: PaginationState;
  setSelectedProduct: (product: Product | null) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  changePage: (page: number) => void;
  fetchProducts: () => void;
}

// API Error type
export interface ApiError {
  message: string;
  status?: number;
}