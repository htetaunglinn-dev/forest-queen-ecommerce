'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Mail size={32} className="text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Join the Adventure Club
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive deals, outdoor tips, and the latest gear updates. Get 10% off your first order!
          </p>

          {/* Form */}
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors z-10" size={20} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-400/50 focus:shadow-xl transition-all border-2 border-transparent focus:border-orange-400 font-medium"
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="group bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all px-8"
                >
                  Subscribe
                  <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <p className="text-sm text-emerald-100 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 text-white">
                <div className="bg-emerald-500 rounded-full p-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-semibold text-lg">
                  Thanks for subscribing!
                </span>
              </div>
            </div>
          )}

          {/* Social Proof */}
          <div className="mt-8 flex items-center justify-center gap-3 text-emerald-100">
            <div className="flex -space-x-3">
              {[
                'https://i.pravatar.cc/150?img=12',
                'https://i.pravatar.cc/150?img=33',
                'https://i.pravatar.cc/150?img=8',
                'https://i.pravatar.cc/150?img=25'
              ].map((avatar, i) => (
                <div
                  key={i}
                  className="relative w-10 h-10 rounded-full border-3 border-emerald-600 overflow-hidden ring-2 ring-white/30"
                >
                  <Image
                    src={avatar}
                    alt={`User ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-sm font-medium">
              Join 10,000+ outdoor enthusiasts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
