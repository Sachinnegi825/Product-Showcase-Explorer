import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductContext } from "../../context/ProductContext";
import {
  formatPrice,
  calculateDiscountedPrice,
  generateStarRating,
} from "../../utils/helpers";

const ProductDetail: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!selectedProduct) return null;

  const discountedPrice = calculateDiscountedPrice(
    selectedProduct.price,
    selectedProduct.discountPercentage
  );

  const handleClose = () => {
    setSelectedProduct(null);
    setSelectedImageIndex(0);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
        >
          {/* Close Button */}
          <div className="flex justify-end p-4 pb-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>

          <div className="flex flex-col lg:flex-row p-6 pt-0">
            {/* Image Section */}
            <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pr-6">
              {/* Main Image */}
              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <img
                  src={
                    selectedProduct.images[selectedImageIndex] ||
                    selectedProduct.thumbnail
                  }
                  alt={selectedProduct.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </motion.div>

              {/* Thumbnail Gallery */}
              {selectedProduct.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {selectedProduct.images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                        selectedImageIndex === index
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${selectedProduct.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="lg:w-1/2">
              {/* Brand */}
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-gray-500 uppercase tracking-wide mb-2"
              >
                {selectedProduct.brand}
              </motion.p>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4"
              >
                {selectedProduct.title}
              </motion.h1>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center mb-4"
              >
                <span className="text-yellow-400 text-lg mr-2">
                  {generateStarRating(selectedProduct.rating)}
                </span>
                <span className="text-gray-600">
                  ({selectedProduct.rating.toFixed(1)} rating)
                </span>
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(discountedPrice)}
                  </span>
                  {selectedProduct.discountPercentage > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(selectedProduct.price)}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        -{Math.round(selectedProduct.discountPercentage)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </motion.div>

              {/* Product Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-4 mb-6"
              >
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium text-gray-900 capitalize">
                    {selectedProduct.category.replace("-", " ")}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Stock</span>
                  <p
                    className={`font-medium ${
                      selectedProduct.stock > 10
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {selectedProduct.stock > 0
                      ? `${selectedProduct.stock} available`
                      : "Out of stock"}
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={selectedProduct.stock === 0}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  {selectedProduct.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  ♡
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetail;
