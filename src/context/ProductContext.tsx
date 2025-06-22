import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type {
  Product,
  ProductContextType,
  FilterState,
  PaginationState,
  SortOption,
} from "../types/product.types";
import { api } from "../services/api";
import { sortProducts, filterProductsBySearch } from "../utils/helpers";

// Action types
type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_ALL_PRODUCTS"; payload: Product[] }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "SET_SELECTED_PRODUCT"; payload: Product | null }
  | { type: "UPDATE_FILTERS"; payload: Partial<FilterState> }
  | { type: "SET_PAGINATION"; payload: Partial<PaginationState> }
  | { type: "CHANGE_PAGE"; payload: number };

// Initial state
interface State {
  products: Product[];
  allProducts: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  selectedProduct: Product | null;
  filters: FilterState;
  pagination: PaginationState;
}

const initialState: State = {
  products: [],
  allProducts: [],
  loading: true,
  error: null,
  categories: [],
  selectedProduct: null,
  filters: {
    category: "all",
    sortBy: "title-asc" as SortOption,
    searchTerm: "",
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 12,
    totalItems: 0,
  },
};

// Reducer
const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, loading: false };
    case "SET_ALL_PRODUCTS":
      return { ...state, allProducts: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload };
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, currentPage: 1 },
      };
    case "SET_PAGINATION":
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    case "CHANGE_PAGE":
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: action.payload },
      };
    default:
      return state;
  }
};

// Context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Apply filters and pagination to products
  const applyFiltersAndPagination = () => {
    let filteredProducts = [...state.allProducts];

    // Apply search filter
    if (state.filters.searchTerm) {
      filteredProducts = filterProductsBySearch(
        filteredProducts,
        state.filters.searchTerm
      );
    }

    // Apply category filter
    if (state.filters.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === state.filters.category
      );
    }

    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, state.filters.sortBy);

    // Calculate pagination
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / state.pagination.itemsPerPage);
    const startIndex =
      (state.pagination.currentPage - 1) * state.pagination.itemsPerPage;
    const endIndex = startIndex + state.pagination.itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    dispatch({ type: "SET_PRODUCTS", payload: paginatedProducts });
    dispatch({
      type: "SET_PAGINATION",
      payload: { totalItems, totalPages },
    });
  };

  // Fetch initial data
  const fetchProducts = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      // Fetch more products initially for better filtering/sorting
      const response = await api.getProducts(100, 0);

      dispatch({ type: "SET_ALL_PRODUCTS", payload: response.products });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to fetch products",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await api.getCategories();
      console.log("Fetched categories:", categories);
      dispatch({ type: "SET_CATEGORIES", payload: categories });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Context methods
  const setSelectedProduct = (product: Product | null) => {
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
  };

  const updateFilters = (filters: Partial<FilterState>) => {
    dispatch({ type: "UPDATE_FILTERS", payload: filters });
  };

  const changePage = (page: number) => {
    dispatch({ type: "CHANGE_PAGE", payload: page });
  };

  // Effects
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (state.allProducts.length > 0) {
      applyFiltersAndPagination();
    }
  }, [state.allProducts, state.filters, state.pagination.currentPage]);

  const contextValue: ProductContextType = {
    products: state.products,
    loading: state.loading,
    error: state.error,
    categories: state.categories.map((cat) => ({ slug: cat, name: cat })),
    selectedProduct: state.selectedProduct,
    filters: state.filters,
    pagination: state.pagination,
    setSelectedProduct,
    updateFilters,
    changePage,
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use context
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
