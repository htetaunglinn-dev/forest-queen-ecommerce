'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Categories } from '@/components/sections/Categories';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { TrustIndicators } from '@/components/sections/TrustIndicators';
import { Newsletter } from '@/components/sections/Newsletter';
import { ProductQuickView } from '@/components/products/ProductQuickView';
import { Product } from '@/types';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <TrustIndicators />
        <Categories />
        <ProductShowcase onQuickView={handleQuickView} />
        <Newsletter />
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
