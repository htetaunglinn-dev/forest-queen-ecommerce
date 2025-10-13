'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatOrderDate, calculateDeliveryDate } from '@/lib/utils';
import { CheckCircle, Package, Truck, Mail, Printer, ArrowRight } from 'lucide-react';

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Load order data from localStorage
    const savedOrder = localStorage.getItem('forest-queen-last-order');
    if (savedOrder) {
      try {
        const data = JSON.parse(savedOrder);
        if (data.orderNumber === orderNumber) {
          setOrderData(data);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Failed to load order:', error);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [orderNumber, router]);

  const handlePrint = () => {
    window.print();
  };

  const handleContinueShopping = () => {
    router.push('/products');
  };

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const estimatedDeliveryDate = calculateDeliveryDate(
    parseInt(orderData.shippingMethod.estimatedDays) || 7
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your order, {orderData.shippingAddress.fullName.split(' ')[0]}!
            </p>
            <p className="text-gray-600">
              Your order number is:{' '}
              <span className="font-bold text-forest-600">{orderData.orderNumber}</span>
            </p>
          </div>

          {/* Order Status Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Order Placed</h3>
                <p className="text-sm text-gray-600">
                  {formatOrderDate(new Date(orderData.date))}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Processing</h3>
                <p className="text-sm text-gray-600">1-2 business days</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Estimated Delivery</h3>
                <p className="text-sm text-gray-600">
                  {formatOrderDate(estimatedDeliveryDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 font-medium">Confirmation email sent!</p>
                <p className="text-sm text-blue-800 mt-1">
                  We've sent a confirmation email to{' '}
                  <span className="font-semibold">{orderData.shippingAddress.email}</span> with your
                  order details and tracking information.
                </p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 text-forest-600 hover:text-forest-700 font-medium transition-colors print:hidden"
              >
                <Printer className="w-5 h-5" />
                Print Receipt
              </button>
            </div>

            {/* Ordered Items */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-900">Items Ordered</h3>
              {orderData.items.map((item: any) => (
                <div key={item.product.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(item.product.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{formatCurrency(orderData.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping ({orderData.shippingMethod.name})</span>
                <span>
                  {orderData.shipping === 0 ? (
                    <span className="text-green-600 font-semibold">FREE</span>
                  ) : (
                    formatCurrency(orderData.shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>{formatCurrency(orderData.tax)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{formatCurrency(orderData.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Address
              </h3>
              <div className="text-gray-700 space-y-1">
                <p className="font-semibold">{orderData.shippingAddress.fullName}</p>
                <p>{orderData.shippingAddress.address}</p>
                <p>
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{' '}
                  {orderData.shippingAddress.postalCode}
                </p>
                <p>{orderData.shippingAddress.country}</p>
                <p className="pt-2">{orderData.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Payment Method
              </h3>
              <div className="text-gray-700">
                {orderData.paymentMethod.type === 'card' && (
                  <>
                    <p className="font-semibold">Credit Card</p>
                    <p className="text-sm mt-2">
                      {orderData.paymentMethod.cardName}
                    </p>
                    <p className="text-sm">**** **** **** {orderData.paymentMethod.cardNumber?.slice(-4)}</p>
                  </>
                )}
                {orderData.paymentMethod.type === 'paypal' && (
                  <p className="font-semibold">PayPal</p>
                )}
                {orderData.paymentMethod.type === 'apple-pay' && (
                  <p className="font-semibold">Apple Pay</p>
                )}
                <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Payment confirmed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
            <Button onClick={handleContinueShopping} size="lg" variant="primary">
              Continue Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => router.push('/account/orders')}
              size="lg"
              variant="outline"
            >
              View Order History
            </Button>
          </div>

          {/* Support Info */}
          <div className="mt-12 text-center text-gray-600 print:hidden">
            <p className="mb-2">Need help with your order?</p>
            <a href="/contact" className="text-forest-600 hover:text-forest-700 font-medium">
              Contact our support team
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
