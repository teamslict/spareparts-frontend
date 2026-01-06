"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { useTenant } from '@/lib/tenant-context';

export default function CartPage() {
    const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
    const { tenant } = useTenant();

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: tenant?.currency || 'LKR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    if (items.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container-custom">
                    <div className="bg-white rounded-lg p-12 text-center">
                        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
                        <p className="text-gray-500 mb-6">Looks like you haven&apos;t added any items to your cart yet.</p>
                        <Link
                            href="/products"
                            className="inline-block px-6 py-3 bg-[#C8102E] text-white font-semibold rounded hover:bg-[#A60D24] transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg overflow-hidden">
                            {/* Table Header */}
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
                                            onClick={() => removeItem(item.productId)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image || '/images/placeholder.png'}
                                                alt={item.name}
                                                width={64}
                                                height={64}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div>
                                            <Link href={`/products/${item.productId}`} className="font-medium text-gray-800 hover:text-[#C8102E]">
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-4 md:col-span-2 text-center">
                                        <span className="md:hidden text-sm text-gray-500">Price: </span>
                                        {formatPrice(item.price)}
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-4 md:col-span-2 flex items-center justify-center gap-1">
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-10 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    {/* Total */}
                                    <div className="col-span-4 md:col-span-2 text-right font-semibold">
                                        <span className="md:hidden text-sm text-gray-500 font-normal">Total: </span>
                                        {formatPrice(item.price * item.quantity)}
                                    </div>
                                </div>
                            ))}

                            {/* Clear Cart */}
                            <div className="px-6 py-4 flex justify-between">
                                <button
                                    onClick={clearCart}
                                    className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    Clear Cart
                                </button>
                                <Link href="/products" className="text-sm text-[#C8102E] hover:underline">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

                            <div className="space-y-3 border-b pb-4 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>{formatPrice(getTotal())}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-green-600">Calculated at checkout</span>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    <button className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between text-lg font-bold mb-6">
                                <span>Total</span>
                                <span style={{ color: tenant?.primaryColor || '#C8102E' }}>{formatPrice(getTotal())}</span>
                            </div>

                            <Link
                                href="/checkout"
                                className="block w-full py-3 bg-[#C8102E] text-white text-center font-semibold rounded hover:bg-[#A60D24] transition-colors"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
