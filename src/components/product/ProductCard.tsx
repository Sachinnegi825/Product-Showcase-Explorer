import React from "react";
import { motion } from "framer-motion";
import type { Product } from "../../types/product.types";
import {
  formatPrice,
  calculateDiscountedPrice,
  generateStarRating,
} from "../../utils/helpers";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  index: number; // Used for staggered animation delay
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  index,
}) => {
  // Defensive check for product prop
  if (!product) {
    console.error("ProductCard received a null or undefined product prop.");
    return null; // Render nothing or a fallback UI
  }

  // Ensure product.price and product.discountPercentage are numbers
  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage
  );

  return (
    // Added 'relative' to make this the positioning context for its absolute children
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1, // Staggered animation effect
        ease: "easeOut",
      }}
      whileHover={{
        y: -8, // Lift effect on hover
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onClick={() => onClick(product)}
      className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={product.thumbnail} // No optional chaining after product check
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
          // Fallback for broken images
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop
            e.currentTarget.src = `https://placehold.co/400x300/CCCCCC/000000?text=Image+Not+Found`;
          }}
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold"
          >
            -{Math.round(product.discountPercentage)}%
          </motion.div>
        )}

        {/* Stock Status */}
        {product.stock < 10 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
          {product.brand}
        </p>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 mr-1">
            {generateStarRating(product.rating)}
          </span>
          <span className="text-sm text-gray-600">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Category */}
        <p className="text-xs text-gray-400 mt-2 capitalize">
          {product.category.replace("-", " ")}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backdropFilter: "blur(10px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <motion.button
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
          className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold shadow-lg"
        >
          View Details
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// Export the component for use in other parts of your application
export default ProductCard;
