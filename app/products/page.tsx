'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductQuickView } from '@/components/products/ProductQuickView';
import { products, categories } from '@/data/products';
import { Product } from '@/types';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showOnSale, setShowOnSale] = useState(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by sale
    if (showOnSale) {
      filtered = filtered.filter(p => p.discount && p.discount > 0);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => {
          const aIsNew = a.badges?.includes('New') ? 1 : 0;
          const bIsNew = b.badges?.includes('New') ? 1 : 0;
          return bIsNew - aIsNew;
        });
        break;
      default:
        // Featured - prioritize best sellers and high ratings
        filtered.sort((a, b) => {
          const aScore = (a.badges?.includes('Best Seller') ? 100 : 0) + a.rating * 10;
          const bScore = (b.badges?.includes('Best Seller') ? 100 : 0) + b.rating * 10;
          return bScore - aScore;
        });
    }

    return filtered;
  }, [selectedCategory, sortBy, priceRange, showOnSale]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-forest-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">All Products</h1>
            <p className="text-lg text-gray-100 max-w-2xl">
              Discover our complete collection of premium outdoor gear for your next adventure
            </p>
          </div>
        </div>

        {/* Filters and Products */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-sm text-gray-700 uppercase tracking-wide">
                    Category
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={selectedCategory === 'all'}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-forest-600 focus:ring-forest-500"
                      />
                      <span className="ml-2 text-sm group-hover:text-forest-600">
                        All Products
                      </span>
                    </label>
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={category.slug}
                          checked={selectedCategory === category.slug}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-forest-600 focus:ring-forest-500"
                        />
                        <span className="ml-2 text-sm group-hover:text-forest-600">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-medium mb-3 text-sm text-gray-700 uppercase tracking-wide">
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-forest-600"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* On Sale Filter */}
                <div>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={showOnSale}
                      onChange={(e) => setShowOnSale(e.target.checked)}
                      className="w-4 h-4 text-forest-600 rounded focus:ring-forest-500"
                    />
                    <span className="ml-2 text-sm group-hover:text-forest-600">
                      On Sale Only
                    </span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort and Results Count */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredAndSortedProducts.length}</span> products
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-600">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={handleQuickView}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg mb-2">No products found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </div>
  );
}
