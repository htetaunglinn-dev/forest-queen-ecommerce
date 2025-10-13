import React from 'react';
import { Truck, RefreshCw, Headphones, ShieldCheck } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '30-day return policy',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer service',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
      description: '100% secure transactions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-full ${indicator.bgColor}`}>
                  <Icon size={28} className={indicator.color} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {indicator.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {indicator.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
