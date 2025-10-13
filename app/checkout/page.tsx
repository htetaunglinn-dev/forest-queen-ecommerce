'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { ShippingAddress, PaymentMethod, ShippingMethod } from '@/types';
import { calculateShipping, calculateTax, calculateTotal, isValidEmail, isValidPhone, isValidCardNumber, generateOrderNumber } from '@/lib/utils';
import { ArrowLeft, Truck, CreditCard, Lock } from 'lucide-react';

const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 0,
    estimatedDays: '5-7 days',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 9.99,
    estimatedDays: '2-3 days',
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: 19.99,
    estimatedDays: '1 day',
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCart();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'card',
  });

  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod>(shippingMethods[0]);

  const [shippingErrors, setShippingErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});
  const [paymentErrors, setPaymentErrors] = useState<Partial<Record<keyof PaymentMethod, string>>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const subtotal = getSubtotal();
  const shipping = selectedShippingMethod.price === 0 && subtotal >= 50 ? 0 : selectedShippingMethod.price;
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, shipping, tax);

  const handleShippingChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (shippingErrors[field]) {
      setShippingErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePaymentChange = (field: keyof PaymentMethod, value: string) => {
    setPaymentMethod((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (paymentErrors[field]) {
      setPaymentErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePaymentTypeChange = (type: 'card' | 'paypal' | 'apple-pay') => {
    setPaymentMethod({ type });
    setPaymentErrors({});
  };

  const validateShippingAddress = (): boolean => {
    const errors: Partial<Record<keyof ShippingAddress, string>> = {};

    if (!shippingAddress.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!shippingAddress.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(shippingAddress.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!shippingAddress.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!isValidPhone(shippingAddress.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!shippingAddress.address.trim()) {
      errors.address = 'Street address is required';
    }

    if (!shippingAddress.city.trim()) {
      errors.city = 'City is required';
    }

    if (!shippingAddress.state.trim()) {
      errors.state = 'State/Province is required';
    }

    if (!shippingAddress.postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
    }

    if (!shippingAddress.country) {
      errors.country = 'Please select a country';
    }

    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentMethod = (): boolean => {
    if (paymentMethod.type !== 'card') {
      return true; // PayPal and Apple Pay don't need validation in this mock
    }

    const errors: Partial<Record<keyof PaymentMethod, string>> = {};

    if (!paymentMethod.cardNumber?.trim()) {
      errors.cardNumber = 'Card number is required';
    } else if (!isValidCardNumber(paymentMethod.cardNumber)) {
      errors.cardNumber = 'Please enter a valid card number';
    }

    if (!paymentMethod.cardName?.trim()) {
      errors.cardName = 'Cardholder name is required';
    }

    if (!paymentMethod.expiryDate?.trim()) {
      errors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentMethod.expiryDate)) {
      errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!paymentMethod.cvv?.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentMethod.cvv)) {
      errors.cvv = 'Please enter a valid CVV';
    }

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    // Validate all fields
    const isShippingValid = validateShippingAddress();
    const isPaymentValid = validatePaymentMethod();

    if (!isShippingValid || !isPaymentValid) {
      // Scroll to first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order number and store order details
    const orderNumber = generateOrderNumber();
    const orderData = {
      orderNumber,
      items,
      shippingAddress,
      shippingMethod: selectedShippingMethod,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total,
      date: new Date().toISOString(),
    };

    // Store order in localStorage (in a real app, this would be an API call)
    localStorage.setItem('forest-queen-last-order', JSON.stringify(orderData));

    // Clear cart
    clearCart();

    // Redirect to confirmation page
    router.push(`/order-confirmation?order=${orderNumber}`);
  };

  if (items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
                <p className="text-gray-600">Complete your purchase</p>
              </div>
              <button
                onClick={() => router.push('/cart')}
                className="hidden md:flex items-center gap-2 text-forest-600 hover:text-forest-700 font-medium transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ShippingForm
                  shippingAddress={shippingAddress}
                  onChange={handleShippingChange}
                  errors={shippingErrors}
                />
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Truck className="w-6 h-6" />
                  Shipping Method
                </h2>
                <div className="space-y-3">
                  {shippingMethods.map((method) => {
                    const finalPrice = method.price === 0 && subtotal >= 50 ? 0 : method.price;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedShippingMethod.id === method.id
                            ? 'border-forest-600 bg-forest-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={selectedShippingMethod.id === method.id}
                            onChange={() => setSelectedShippingMethod(method)}
                            className="w-4 h-4 text-forest-600"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.description}</div>
                          </div>
                        </div>
                        <div className="font-bold text-gray-900">
                          {finalPrice === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `$${finalPrice.toFixed(2)}`
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
                {subtotal < 50 && (
                  <p className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    Add ${(50 - subtotal).toFixed(2)} more to qualify for free standard shipping!
                  </p>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-6 h-6" />
                  <PaymentForm
                    paymentMethod={paymentMethod}
                    onChange={handlePaymentChange}
                    onTypeChange={handlePaymentTypeChange}
                    errors={paymentErrors}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <OrderSummary
                  items={items}
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  shippingMethodName={selectedShippingMethod.name}
                />

                {/* Place Order Button */}
                <Button
                  onClick={handlePlaceOrder}
                  size="lg"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Place Order
                    </span>
                  )}
                </Button>

                {/* Security Notice */}
                <div className="text-center text-sm text-gray-600">
                  <p>Your payment information is secure and encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
