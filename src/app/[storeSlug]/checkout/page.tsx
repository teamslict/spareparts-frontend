"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { useCart } from '@/lib/cart-store';
import { api } from '@/lib/api';
import { getErrorMessage } from '@/lib/error-utils';

interface AppliedPromotion {
    id: string;
    name: string;
    description?: string;
    code?: string;
    type: string;
    discountType: string;
    discountValue: number;
    discountAmount: number;
    source: 'AUTOMATIC' | 'CODE' | 'QUANTITY';
    productId?: string;
    productName?: string;
    minQuantity?: number;
}

export default function CheckoutPage() {
    const { tenant } = useTenant();
    const router = useRouter();
    const cart = useCart();
    const storeSlug = tenant?.subdomain || 'demo';

    const items = cart.getItems(storeSlug);
    const subtotal = cart.getTotal(storeSlug);

    // Tax calculation
    const rawTax = Number(tenant?.taxRate);
    const taxRate = rawTax > 0 ? rawTax : 18;
    const taxAmount = subtotal * (taxRate / 100);

    // Promotions state
    const [promoCode, setPromoCode] = useState('');
    const [promoError, setPromoError] = useState('');
    const [promoLoading, setPromoLoading] = useState(false);
    const [appliedPromotions, setAppliedPromotions] = useState<AppliedPromotion[]>([]);
    const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);

    // Calculate totals
    const promoDiscount = appliedPromotions.reduce((sum, p) => sum + p.discountAmount, 0);
    const total = subtotal + taxAmount - promoDiscount;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [loggedInUser, setLoggedInUser] = useState<{ id: string; name: string; phone?: string; address?: string } | null>(null);
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        shippingAddress: '',
        city: '',
    });

    // Pre-fill form data from logged-in user's profile
    useEffect(() => {
        const storedUser = localStorage.getItem('spareparts_user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setLoggedInUser(user);
                // Pre-fill form with user's data
                setFormData(prev => ({
                    customerName: user.name || prev.customerName,
                    customerPhone: user.phone || prev.customerPhone,
                    shippingAddress: user.address || prev.shippingAddress,
                    city: user.city || prev.city,
                }));
            } catch (e) {
                console.error('Error parsing stored user:', e);
            }
        }
    }, []);

    // Fetch promotions when cart changes
    const fetchPromotions = useCallback(async (code?: string) => {
        if (items.length === 0) {
            setAppliedPromotions([]);
            return;
        }

        try {
            setPromoLoading(true);
            const customerId = loggedInUser?.id;

            const result = await api.checkPromotions(storeSlug, {
                items: items.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                customerId,
                promoCode: code || appliedPromoCode || undefined
            });

            if (result.codeError && code) {
                setPromoError(result.codeError);
            } else if (code) {
                setPromoError('');
                setAppliedPromoCode(code);
            }

            setAppliedPromotions(result.promotions);
        } catch (error) {
            console.error('Error fetching promotions:', error);
        } finally {
            setPromoLoading(false);
        }
    }, [items, storeSlug, appliedPromoCode, loggedInUser?.id]);

    // Fetch automatic promotions on mount and cart change
    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchPromotions();
        }, 500);
        return () => clearTimeout(debounce);
    }, [fetchPromotions]);

    const handleApplyPromoCode = async () => {
        if (!promoCode.trim()) {
            setPromoError('Please enter a promo code');
            return;
        }
        await fetchPromotions(promoCode.trim());
        setPromoCode('');
    };

    const handleRemovePromoCode = () => {
        setAppliedPromoCode(null);
        setAppliedPromotions(prev => prev.filter(p => p.source !== 'CODE'));
        fetchPromotions();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const orderData = {
                customerId: loggedInUser?.id,
                customerName: formData.customerName,
                customerPhone: formData.customerPhone,
                shippingAddress: `${formData.shippingAddress}, ${formData.city}`,
                items: items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                })),
                subtotal,
                taxAmount,
                taxRate,
                discountAmount: promoDiscount,
                appliedPromotions: appliedPromotions.map(p => ({
                    promotionId: p.id,
                    name: p.name,
                    discountAmount: p.discountAmount
                })),
                total,
                shippingAmount: 0
            };

            const result = await api.createOrder(storeSlug, orderData);
            cart.clearCart(storeSlug);
            router.push(`/${storeSlug}/checkout/success?order=${result.invoiceNumber}`);

        } catch (err: unknown) {
            console.error(err);
            setError(getErrorMessage(err));
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
                            {isLoading ? 'Processing...' : `Place Order - LKR ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="space-y-4">
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
                            {taxAmount > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span>Tax ({taxRate}%)</span>
                                    <span>LKR {taxAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                            )}
                            {promoDiscount > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Discount</span>
                                    <span>-LKR {promoDiscount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total</span>
                                <span>LKR {total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    </div>

                    {/* Promo Code Section */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-md font-semibold mb-3">Promo Code</h3>

                        {appliedPromoCode ? (
                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div>
                                    <span className="font-medium text-green-700">{appliedPromoCode}</span>
                                    <span className="text-sm text-green-600 ml-2">Applied!</span>
                                </div>
                                <button
                                    onClick={handleRemovePromoCode}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => {
                                        setPromoCode(e.target.value.toUpperCase());
                                        setPromoError('');
                                    }}
                                    placeholder="Enter code"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleApplyPromoCode}
                                    disabled={promoLoading}
                                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
                                >
                                    {promoLoading ? '...' : 'Apply'}
                                </button>
                            </div>
                        )}

                        {promoError && (
                            <p className="text-red-500 text-sm mt-2">{promoError}</p>
                        )}
                    </div>

                    {/* Applied Promotions */}
                    {appliedPromotions.length > 0 && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                            <h3 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Applied Discounts
                            </h3>
                            <div className="space-y-2">
                                {appliedPromotions.map((promo) => (
                                    <div key={promo.id + (promo.productId || '')} className="flex justify-between items-center text-sm">
                                        <div>
                                            <span className="font-medium">{promo.name}</span>
                                            {promo.source === 'QUANTITY' && promo.productName && (
                                                <span className="text-gray-500 text-xs block">
                                                    {promo.productName} (Qty {promo.minQuantity}+)
                                                </span>
                                            )}
                                            {promo.source === 'CODE' && promo.code && (
                                                <span className="text-gray-500 text-xs block">
                                                    Code: {promo.code}
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-bold text-green-600">
                                            -LKR {promo.discountAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-green-200 mt-3 pt-2 flex justify-between text-sm font-bold text-green-700">
                                <span>Total Savings</span>
                                <span>LKR {promoDiscount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
