import React from "react";
import { motion } from "framer-motion";
import { useProductContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import Pagination from "../common/Pagination";

const ProductList: React.FC = () => {
  const {
    products,
    loading,
    error,
    setSelectedProduct,
    pagination,
    changePage,
    fetchProducts,
  } = useProductContext();

  if (loading) {
    return <LoadingSpinner size="lg" message="Loading amazing products..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchProducts} />;
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No products found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters or search terms.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Results Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 text-sm text-gray-600"
      >
        Showing {products.length} of {pagination.totalItems} products
        {pagination.totalPages > 1 && (
          <span>
            {" "}
            (Page {pagination.currentPage} of {pagination.totalPages})
          </span>
        )}
      </motion.div>

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap gap-6"
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
          >
            <ProductCard
              product={product}
              onClick={setSelectedProduct}
              index={index}
            />
          </div>
        ))}
      </motion.div>

      {/* Pagination */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={changePage}
      />
    </div>
  );
};

export default ProductList;
