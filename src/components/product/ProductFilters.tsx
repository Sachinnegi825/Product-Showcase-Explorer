import React, { useState } from "react";
import { motion } from "framer-motion";
import { useProductContext } from "../../context/ProductContext";
import type { SortOption } from "../../types/product.types";
import { formatCategoryName, debounce } from "../../utils/helpers";

const ProductFilters: React.FC = () => {
  const { categories, filters, updateFilters } = useProductContext();
  const [searchInput, setSearchInput] = useState(filters.searchTerm);

  // Debounced search function
  const debouncedSearch = debounce((term: string) => {
    updateFilters({ searchTerm: term });
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleCategoryChange = (category: string) => {
    updateFilters({ category });
  };

  const handleSortChange = (sortBy: SortOption) => {
    updateFilters({ sortBy });
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "title-asc", label: "Name (A-Z)" },
    { value: "title-desc", label: "Name (Z-A)" },
    { value: "price-asc", label: "Price (Low to High)" },
    { value: "price-desc", label: "Price (High to Low)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:items-end">
        {/* Search Input */}
        <div className="flex-1">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Search Products
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            id="search"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search by name, description, brand..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex-1">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            id="category"
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="all">All Categories</option>
            {categories?.map((category) => (
              <option key={category?.slug} value={category?.slug}>
                {formatCategoryName(category?.slug)}
              </option>
            ))}
          </motion.select>
        </div>

        {/* Sort Filter */}
        <div className="flex-1">
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sort By
          </label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            id="sort"
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </motion.select>
        </div>

        {/* Clear Filters Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSearchInput("");
            updateFilters({
              category: "all",
              sortBy: "title-asc",
              searchTerm: "",
            });
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors whitespace-nowrap"
        >
          Clear Filters
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductFilters;
