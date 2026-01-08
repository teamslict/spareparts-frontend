"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { useCart } from '@/lib/cart-store';
import { api } from '@/lib/api';
import { Section, Surface, PageHeader } from '@/components/ui';

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
            <div className="bg-gray-50 min-h-screen">
                <Section>
                    <Surface className="text-center py-16">
                        <h1 className="text-2xl font-bold mb-4 text-gray-900">Your cart is empty</h1>
                        <Link href={`/${storeSlug}/products`} className="text-red-600 hover:underline font-medium">
                            Continue Shopping
                        </Link>
                    </Surface>
                </Section>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Section>
                <PageHeader title="Checkout" />

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Shipping Form */}
                    <Surface>
                        <h2 className="text-lg font-semibold mb-6 text-gray-900 border-b border-gray-100 pb-4">
                            Shipping Information
                        </h2>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 focus:bg-white transition-colors"
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 focus:bg-white transition-colors"
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 focus:bg-white transition-colors"
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 focus:bg-white transition-colors"
                                    placeholder="Colombo"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 mt-4"
                            >
                                {isLoading ? 'Processing...' : `Place Order - LKR ${subtotal.toLocaleString()}`}
                            </button>
                        </form>
                    </Surface>

                    {/* Order Summary */}
                    <Surface className="h-fit sticky top-24">
                        <h2 className="text-lg font-semibold mb-6 text-gray-900 border-b border-gray-100 pb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-6">
                            {items.map(item => (
                                <div key={item.productId} className="flex justify-between items-center group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                            {item.image && (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-gray-900 line-clamp-1">{item.name}</p>
                                            <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium text-gray-900 text-sm">
                                        LKR {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-900">LKR {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-4 mt-2">
                                <span className="text-gray-900">Total</span>
                                <span className="text-red-600">LKR {subtotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </Surface>
                </div>
            </Section>
        </div>
    );
}
