# Product Showcase Explorer

A modern, responsive web application built with React, TypeScript, and Framer Motion that allows users to explore products from the DummyJSON API with smooth animations and intuitive filtering capabilities.

## 🚀 Features

- **Product Grid Display**: Responsive product cards showing images, titles, and prices
- **Product Detail View**: Modal with comprehensive product information
- **Category Filtering**: Filter products by category with dynamic category loading
- **Price & Title Sorting**: Sort products by price (ascending/descending) and title (A-Z/Z-A)
- **Client-side Pagination**: Smooth pagination with customizable items per page
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Loading States**: loader for loadings
- **Error Handling**: Graceful error handling with user-friendly messages
- **Fully Responsive**: Optimized for mobile, tablet, and desktop

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   │
│   │   ├── LoadingSpinner.tsx
│   │   ├── Pagination.tsx
│   │   └──ErrorMessage.tsx
│   ├── layout/
│   │   ├── Header/
│   │   │   └── Header.tsx
│   │   └── Layout.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── ProductList.tsx
│   │   └── ProductFilters.tsx
│
├── context/
│   └── ProductContext.tsx
│
├── hooks/
│   └── useProducts.ts
│
├── services/
│   └──api.ts
├── types/
│   └──product.types.ts
├── utils/
│   └── helpers.ts
├──index.css
├── App.tsx
└── main.tsx
```

## 🎨 Animation Features

### Framer Motion Animations

- **Staggered Product Cards**: Cards animate in with a staggered fade-in effect
- **Modal Transitions**: Smooth scale and fade animations for product detail modal
- **Hover Effects**: Subtle lift and shadow animations on product cards
- **Filter Transitions**: Smooth transitions when filtering products
- **Loading States**: Animated skeleton loaders for better UX

### Micro-interactions

- Button hover effects with scale animations
- Card hover animations with smooth transitions
- Smooth pagination transitions
- Filter button active states with spring animations

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Sachinnegi825/Product-Showcase-Explorer.git
cd product-showcase-explorer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Responsive Design

The application is fully responsive

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

## 🎯 Core Features Implementation

### Product Display

- Fetches products from DummyJSON API
- Displays products in responsive card layout using Flexbox
- Shows product image, title, price, and rating
- Implements client-side pagination

### Product Details

- Modal-based detail view with product information
- Multiple product images carousel
- Detailed product specifications
- Stock availability and brand information

### Filtering & Sorting

- Dynamic category filtering with API integration
- Client-side sorting by price and title
- Combines filters and sorts seamlessly
- Maintains state across navigation

### State Management

- React Context API for global state
- Custom hooks for data fetching and management
- Local storage integration for user preferences
- Error and loading state management

## 🌟 Performance Optimizations

- Lazy loading of product images
- Debounced search functionality
- Memoized components to prevent unnecessary re-renders
- Optimized API calls with proper error handling
- Image optimization for different screen sizes

## 🔒 Error Handling

- Network error handling with retry functionality
- API error responses with user-friendly messages
- Fallback UI components for failed states
- Loading states for all async operations

## 🎨 Styling Approach

- Tailwind CSS for utility-first styling
- Custom CSS variables for theme consistency
- Responsive design with mobile-first approach
- Dark mode ready color scheme
- Consistent spacing and typography scales

## 📦 Dependencies

### Core Dependencies

- `react` - UI library
- `react-dom` - React DOM rendering
- `typescript` - Type safety
- `framer-motion` - Animations
- `lucide-react` - Icons

### Development Dependencies

- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `tailwindcss` - CSS framework
- `autoprefixer` - CSS vendor prefixes
- `postcss` - CSS processing
- `@types/react` - React TypeScript types
- `eslint` - Code linting
- `@typescript-eslint/eslint-plugin` - TypeScript ESLint rules

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DummyJSON API](https://dummyjson.com) for providing the product data
- [Framer Motion](https://www.framer.com/motion/) for amazing animations
- [Tailwind CSS](https://tailwindcss.com) for utility-first CSS framework

## 📞 Support

If you have any questions or issues, please feel free to:

- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

Built with ❤️
