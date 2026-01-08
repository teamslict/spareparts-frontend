"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { useTenant } from '@/lib/tenant-context';
import { Section, Surface, PageHeader } from '@/components/ui';

export default function CartPage() {
    const cart = useCart();
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';
    const items = cart.getItems(storeSlug);

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: tenant?.currency || 'LKR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Empty state
    if (items.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <Section>
                    <Surface padding="lg" className="max-w-lg mx-auto text-center">
                        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                        <p className="text-gray-500 mb-6">
                            Looks like you haven&apos;t added any items to your cart yet.
                        </p>
                        <Link
                            href={`/${storeSlug}/products`}
                            className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                        >
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
                <PageHeader
                    title="Shopping Cart"
                    subtitle={`${items.length} item${items.length > 1 ? 's' : ''} in your cart`}
                />

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <Surface padding="none">
                            {/* Table Header - Desktop */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b text-sm font-semibold text-gray-600">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-2 text-center">Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>

                            {/* Cart Items */}
                            {items.map((item) => (
                                <div key={item.productId} className="grid grid-cols-12 gap-4 px-6 py-4 border-b items-center">
                                    {/* Product */}
                                    <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                                        <button
                                            onClick={() => cart.removeItem(storeSlug, item.productId)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image || '/images/placeholder.png'}
                                                alt={item.name}
                                                width={64}
                                                height={64}
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <Link
                                                href={`/${storeSlug}/products/${item.productId}`}
                                                className="font-medium text-gray-900 hover:text-red-600 transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-4 md:col-span-2 text-center text-gray-900">
                                        <span className="md:hidden text-sm text-gray-500">Price: </span>
                                        {formatPrice(item.price)}
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-4 md:col-span-2 flex items-center justify-center gap-1">
                                        <button
                                            onClick={() => cart.updateQuantity(storeSlug, item.productId, item.quantity - 1)}
                                            className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => cart.updateQuantity(storeSlug, item.productId, item.quantity + 1)}
                                            className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    {/* Total */}
                                    <div className="col-span-4 md:col-span-2 text-right font-semibold text-gray-900">
                                        <span className="md:hidden text-sm text-gray-500 font-normal">Total: </span>
                                        {formatPrice(item.price * item.quantity)}
                                    </div>
                                </div>
                            ))}

                            {/* Cart Actions */}
                            <div className="px-6 py-4 flex justify-between">
                                <button
                                    onClick={() => cart.clearCart(storeSlug)}
                                    className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                                >
                                    Clear Cart
                                </button>
                                <Link
                                    href={`/${storeSlug}/products`}
                                    className="text-sm text-red-600 hover:underline font-medium"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </Surface>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Surface padding="md" className="sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                            <div className="space-y-3 border-b border-gray-100 pb-4 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-gray-900">{formatPrice(cart.getTotal(storeSlug))}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-green-600">Calculated at checkout</span>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Promo Code
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                    <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors font-medium">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between text-lg font-bold mb-6">
                                <span className="text-gray-900">Total</span>
                                <span className="text-red-600">{formatPrice(cart.getTotal(storeSlug))}</span>
                            </div>

                            <Link
                                href={`/${storeSlug}/checkout`}
                                className="block w-full py-3 bg-gray-900 text-white text-center font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Proceed to Checkout
                            </Link>
                        </Surface>
                    </div>
                </div>
            </Section>
        </div>
    );
}
