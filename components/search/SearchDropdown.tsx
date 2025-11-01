'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { Product } from '@/types';

interface SearchDropdownProps {
  searchQuery: string;
  searchResults: Product[];
  isOpen: boolean;
  onClose: () => void;
  onClearSearch: () => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  searchQuery,
  searchResults,
  isOpen,
  onClose,
  onClearSearch
}) => {
  if (!isOpen || !searchQuery.trim()) {
    return null;
  }

  const handleLinkClick = () => {
    onClose();
    onClearSearch();
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[500px] overflow-y-auto z-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search size={18} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            {searchResults.length > 0
              ? `Found ${searchResults.length} ${searchResults.length === 1 ? 'product' : 'products'}`
              : 'No products found'
            }
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close search"
        >
          <X size={18} />
        </button>
      </div>

      {/* Results */}
      {searchResults.length > 0 ? (
        <div className="py-2">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              onClick={handleLinkClick}
              className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              {/* Product Image */}
              <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-emerald-700">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex-shrink-0 text-right">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-medium text-gray-700">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  ({product.reviewCount})
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium mb-1">No products found</p>
          <p className="text-sm text-gray-500">
            Try adjusting your search terms
          </p>
        </div>
      )}

      {/* Footer - Show if there are many results */}
      {searchResults.length > 5 && (
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 py-3 text-center">
          <p className="text-xs text-gray-600">
            Showing top {Math.min(searchResults.length, 10)} results.
            <Link
              href={`/categories/all-products`}
              onClick={handleLinkClick}
              className="text-emerald-700 hover:text-emerald-800 font-medium ml-1"
            >
              View all products
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};
