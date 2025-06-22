import React from "react";
import { ProductProvider } from "./context/ProductContext";
import ProductFilters from "./components/product/ProductFilters";
import ProductList from "./components/product/ProductList";
import ProductDetail from "./components/product/ProductDetail";
import Layout from "./components/layout/Layout";

const App: React.FC = () => {
  return (
    <ProductProvider>
      <Layout>
        <div className="space-y-6">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of premium products with advanced
              filtering and sorting options.
            </p>
          </div>

          {/* Filters */}
          <ProductFilters />

          {/* Product List */}
          <ProductList />

          {/* Product Detail Modal */}
          <ProductDetail />
        </div>
      </Layout>
    </ProductProvider>
  );
};

export default App;
