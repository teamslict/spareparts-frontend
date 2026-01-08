"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Package } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { useWishlist, WishlistItem } from '@/lib/wishlist-store';
import { useCart } from '@/lib/cart-store';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Section, Container, Grid, Surface } from '@/components/ui';

export default function WishlistPage() {
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';

    const { getItems, removeItem, clearWishlist } = useWishlist();
    const { addItem: addToCart } = useCart();

    const items = getItems(storeSlug);

    const handleAddToCart = (item: WishlistItem) => {
        addToCart(storeSlug, {
            productId: item.productId,
            name: item.name,
            sku: item.sku,
            price: item.price,
            image: item.image,
        }, 1);
        removeItem(storeSlug, item.productId);
    };

    const handleRemove = (productId: string) => {
        removeItem(storeSlug, productId);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Section size="lg">
                    <div className="max-w-md mx-auto text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart size={48} className="text-red-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h1>
                        <p className="text-gray-500 mb-8">
                            Start adding items you love by clicking the heart icon on any product.
                        </p>
                        <Link
                            href={`/${storeSlug}/products`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C8102E] to-[#e91e3a] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all"
                        >
                            <Package size={20} />
                            Browse Products
                        </Link>
                    </div>
                </Section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <Section size="sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href={`/${storeSlug}/account`}
                                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Heart size={24} className="text-red-500" />
                                    My Wishlist
                                </h1>
                                <p className="text-sm text-gray-500">{items.length} saved items</p>
                            </div>
                        </div>
                        <button
                            onClick={() => clearWishlist(storeSlug)}
                            className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
                        >
                            <Trash2 size={16} />
                            Clear All
                        </button>
                    </div>
                </Section>
            </div>

            {/* Items Grid */}
            <Section>
                <Grid minWidth="280px" gap="lg">
                    {items.map((item) => (
                        <Surface
                            key={item.productId}
                            padding="none"
                            className="overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Image */}
                            <Link href={`/${storeSlug}/products/${item.productId}`} className="block relative aspect-square bg-gray-50">
                                <Image
                                    src={item.image || PLACEHOLDER_IMAGE}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = PLACEHOLDER_IMAGE;
                                    }}
                                />

                                {/* Remove Button */}
                                <button
                                    onClick={() => handleRemove(item.productId)}
                                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </Link>

                            {/* Content */}
                            <div className="p-4">
                                <Link href={`/${storeSlug}/products/${item.productId}`}>
                                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-[#C8102E] transition-colors">
                                        {item.name}
                                    </h3>
                                </Link>
                                <p className="text-xs text-gray-500 font-mono mt-1">{item.sku}</p>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-xl font-bold text-[#C8102E]">
                                        <span className="text-sm text-gray-500 mr-1">{tenant?.currency || 'LKR'}</span>
                                        {item.price.toLocaleString()}
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="w-full mt-4 py-3 bg-gradient-to-r from-[#C8102E] to-[#e91e3a] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={18} />
                                    Move to Cart
                                </button>
                            </div>
                        </Surface>
                    ))}
                </Grid>
            </Section>
        </div>
    );
}
