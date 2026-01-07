"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { useCart } from '@/lib/cart-store';
import { api } from '@/lib/api';

export default function CheckoutPage() {
    const { tenant } = useTenant();
    const router = useRouter();
    const cart = useCart();
    const storeSlug = tenant?.subdomain || 'demo';

    const items = cart.getItems(storeSlug);
    const subtotal = cart.getTotal(storeSlug);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        shippingAddress: '',
        city: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Get customer ID from localStorage if logged in
            const storedUser = localStorage.getItem('spareparts_user');
            const customerId = storedUser ? JSON.parse(storedUser).id : undefined;

            const orderData = {
                customerId,
                customerName: formData.customerName,
                customerPhone: formData.customerPhone,
                shippingAddress: `${formData.shippingAddress}, ${formData.city}`,
                items: items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))
            };

            const result = await api.createOrder(storeSlug, orderData);

            // Clear cart on success
            cart.clearCart(storeSlug);

            // Redirect to success page
            router.push(`/${storeSlug}/checkout/success?order=${result.invoiceNumber}`);

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Checkout failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Link href={`/${storeSlug}/products`} className="text-[#C8102E] hover:underline">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Checkout</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Shipping Form */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="customerPhone"
                                value={formData.customerPhone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="+94 77 123 4567"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Shipping Address *
                            </label>
                            <textarea
                                name="shippingAddress"
                                value={formData.shippingAddress}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="123 Main Street, Apartment 4B"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                City *
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Colombo"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-[#C8102E] text-white font-semibold rounded-lg hover:bg-[#A60D24] transition-colors disabled:bg-gray-400"
                        >
                            {isLoading ? 'Processing...' : `Place Order - LKR ${subtotal.toLocaleString()}`}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                        {items.map(item => (
                            <div key={item.productId} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-200 rounded">
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{item.name}</p>
                                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-medium">
                                    LKR {(item.price * item.quantity).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>LKR {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                            <span>Total</span>
                            <span>LKR {subtotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
