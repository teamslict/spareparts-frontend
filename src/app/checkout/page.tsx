"use client";

import { useState, useMemo } from 'react';
import { useCart } from '@/lib/cart-store';
import { useTenant } from '@/lib/tenant-context';
import { useRouter, useParams } from 'next/navigation';
import { CreditCard, Banknote, Building2, CheckCircle } from 'lucide-react';

type PaymentMethod = 'COD' | 'BANK' | 'CREDIT';

export default function CheckoutPage() {
    const { getItems, getTotal, clearCart } = useCart();
    const { tenant } = useTenant();
    const router = useRouter();
    const params = useParams();

    // Get store slug from URL params or tenant subdomain
    const storeSlug = (params?.storeSlug as string) || tenant?.subdomain || 'demo';

    // Get items for this store
    const items = useMemo(() => getItems(storeSlug), [getItems, storeSlug]);
    const total = useMemo(() => getTotal(storeSlug), [getTotal, storeSlug]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        notes: '',
    });

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: tenant?.currency || 'LKR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // In production, this would call /api/public/spareparts/orders
        console.log('Order submitted:', {
            customer: formData,
            items,
            total: total,
            paymentMethod,
        });

        setOrderPlaced(true);
        clearCart(storeSlug);
        setIsSubmitting(false);
    };

    if (items.length === 0 && !orderPlaced) {
        router.push('/cart');
        return null;
    }

    if (orderPlaced) {
        return (
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container-custom max-w-xl">
                    <div className="bg-white rounded-lg p-8 text-center">
                        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
                        <p className="text-gray-500 mb-6">
                            Thank you for your order. We will contact you shortly to confirm your order.
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="px-6 py-3 bg-[#C8102E] text-white font-semibold rounded hover:bg-[#A60D24] transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Customer Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contact Information */}
                            <div className="bg-white rounded-lg p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white rounded-lg p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Shipping Address</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-lg p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Payment Method</h2>
                                <div className="space-y-3">
                                    {/* Cash on Delivery */}
                                    <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-[#C8102E] bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="COD"
                                            checked={paymentMethod === 'COD'}
                                            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                            className="w-4 h-4 text-[#C8102E]"
                                        />
                                        <Banknote size={24} className="text-green-600" />
                                        <div>
                                            <p className="font-medium text-gray-800">Cash on Delivery</p>
                                            <p className="text-sm text-gray-500">Pay when you receive the order</p>
                                        </div>
                                    </label>

                                    {/* Bank Transfer */}
                                    <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'BANK' ? 'border-[#C8102E] bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="BANK"
                                            checked={paymentMethod === 'BANK'}
                                            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                            className="w-4 h-4 text-[#C8102E]"
                                        />
                                        <Building2 size={24} className="text-blue-600" />
                                        <div>
                                            <p className="font-medium text-gray-800">Bank Transfer</p>
                                            <p className="text-sm text-gray-500">Transfer to our bank account</p>
                                        </div>
                                    </label>

                                    {/* Buy on Credit */}
                                    <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'CREDIT' ? 'border-[#C8102E] bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="CREDIT"
                                            checked={paymentMethod === 'CREDIT'}
                                            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                            className="w-4 h-4 text-[#C8102E]"
                                        />
                                        <CreditCard size={24} className="text-purple-600" />
                                        <div>
                                            <p className="font-medium text-gray-800">Buy on Credit</p>
                                            <p className="text-sm text-gray-500">Pay later within credit terms (for registered customers)</p>
                                        </div>
                                    </label>
                                </div>

                                {paymentMethod === 'CREDIT' && (
                                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Note:</strong> Credit purchases require an approved credit account.
                                            If you don&apos;t have one, please contact us or select another payment method.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Order Notes */}
                            <div className="bg-white rounded-lg p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Order Notes (Optional)</h2>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Any special instructions for your order..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg p-6 sticky top-4">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

                                {/* Items */}
                                <div className="space-y-3 border-b pb-4 mb-4 max-h-64 overflow-y-auto">
                                    {items.map((item) => (
                                        <div key={item.productId} className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {item.name} <span className="text-gray-400">x{item.quantity}</span>
                                            </span>
                                            <span>{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="space-y-2 border-b pb-4 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-green-600">To be calculated</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-lg font-bold mb-6">
                                    <span>Total</span>
                                    <span style={{ color: tenant?.primaryColor || '#C8102E' }}>{formatPrice(total)}</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-[#C8102E] text-white font-semibold rounded hover:bg-[#A60D24] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
