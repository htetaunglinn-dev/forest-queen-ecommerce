import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Explore the Great
              <span className="block text-amber-400">Outdoors</span>
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-emerald-100 max-w-2xl mx-auto lg:mx-0">
              Premium camping and hiking gear for your next adventure. Quality equipment that stands up to nature&apos;s challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group">
                Shop Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                View Collection
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-3xl font-bold text-amber-400">500+</div>
                <div className="text-sm text-emerald-200">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">10k+</div>
                <div className="text-sm text-emerald-200">Happy Campers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">4.8</div>
                <div className="text-sm text-emerald-200">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image - Decorative */}
          <div className="relative hidden lg:block">
            <div className="relative h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-transparent rounded-2xl z-10" />
              <Image
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop"
                alt="Camping in nature"
                fill
                sizes="(max-width: 1024px) 0vw, 50vw"
                className="rounded-2xl shadow-2xl object-cover"
                priority
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 right-6 bg-white text-gray-900 rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">Trusted Quality</div>
                    <div className="text-sm text-gray-500">Certified Gear</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};
