import { useEffect } from 'react';
import { useProductContext, sortProducts } from '../context/ProductContext';
import { productApi } from '../services/api';

export const useProducts = () => {
  const { state, dispatch } = useProductContext();

  // Fetch products based on current state
  const fetchProducts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const skip = (state.currentPage - 1) * state.itemsPerPage;
      let response;

      if (state.selectedCategory) {
        response = await productApi.getProductsByCategory(
          state.selectedCategory,
          state.itemsPerPage,
          skip
        );
      } else {
        response = await productApi.getProducts(state.itemsPerPage, skip);
      }

      // Sort products on client side
      const sortedProducts = sortProducts(response.products, state.sortBy, state.sortOrder);

      dispatch({
        type: 'SET_PRODUCTS',
        payload: {
          products: sortedProducts,
          total: response.total,
        },
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to fetch products',
      });
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const categories = await productApi.getCategories();
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Fetch product by ID
  const fetchProductById = async (id: number) => {
    try {
      const product = await productApi.getProductById(id);
      dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  // Actions
  const setCategory = (category: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  const setSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
  };

  const setPage = (page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const setSelectedProduct = (product: any) => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  // Effects
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [state.currentPage, state.selectedCategory, state.sortBy, state.sortOrder]);

  return {
    ...state,
    fetchProducts,
    fetchProductById,
    setCategory,
    setSort,
    setPage,
    setSelectedProduct,
    clearError,
  };
};