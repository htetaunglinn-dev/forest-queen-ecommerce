import React from 'react';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export const Categories: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect gear for your outdoor adventures
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Category Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-base sm:text-lg mb-1 flex items-center justify-between">
                  {category.name}
                  <ArrowRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all"
                  />
                </h3>
                {category.description && (
                  <p className="text-xs text-gray-200 line-clamp-1">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 border-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
