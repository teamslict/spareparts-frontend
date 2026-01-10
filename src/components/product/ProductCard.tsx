"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { useTenant } from '@/lib/tenant-context';
import { useWishlist } from '@/lib/wishlist-store';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { useState } from 'react';

// Product image placeholder SVG
const PRODUCT_PLACEHOLDER = PLACEHOLDER_IMAGE;

export interface ProductCardProps {
    id: string;
    name: string;
    sku: string;
    price: number | null;
    image: string;
    category?: string;
    stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK';
    rating?: number;
    slug: string;
}

export function ProductCard({
    id,
    name,
    sku,
    price,
    image,
    category,
    stockStatus,
    rating,
    slug,
    matchedAlias // New prop
}: ProductCardProps & { matchedAlias?: string | null }) {
    const { addItem } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { tenant } = useTenant();
    const [isAdded, setIsAdded] = useState(false);

    // Use current tenant's slug for cart namespace and links
    const storeSlug = tenant?.subdomain || 'demo';
    const isWishlisted = isInWishlist(storeSlug, id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addItem(storeSlug, {
            productId: id,
            name,
            sku,
            price: price || 0, // Fallback if null, but allow add
            image: image || PRODUCT_PLACEHOLDER,
        });

        // Trigger animation
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(storeSlug, {
            productId: id,
            name,
            sku,
            price: price || 0, // Fallback for price
            image: image || PLACEHOLDER_IMAGE,
        });
    };

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: tenant?.currency || 'LKR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const stockBadge = {
        IN_STOCK: { text: 'In Stock', bg: '#28A745', textColor: '#fff' },
        LOW_STOCK: { text: 'Low Stock', bg: '#FFC107', textColor: '#000' },
        OUT_OF_STOCK: { text: 'Out of Stock', bg: '#DC3545', textColor: '#fff' },
    };

    const badge = stockBadge[stockStatus];

    const productLink = `/${storeSlug}/products/${slug}`;

    return (
        <div className="block group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl border border-slate-200 hover:border-blue-200">
            {/* Image Container */}
            <div className="relative aspect-square p-8 bg-[#0F172A] group-hover:bg-[#1E293B] transition-colors duration-500 flex items-center justify-center">

                {/* Link wrapper for Image area */}
                <Link href={productLink} className="absolute inset-0 z-10" />

                {/* Floating Glow Behind Image */}
                <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl scale-0 group-hover:scale-125 transition-transform duration-700 mx-10 my-10 pointer-events-none" />

                {/* Unified Status Badge (Top Left) */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                    {stockStatus !== 'IN_STOCK' ? (
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-red-600 text-white shadow-lg backdrop-blur-md">
                            {badge.text}
                        </span>
                    ) : (
                        // "New" badge example
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-600 text-white shadow-lg backdrop-blur-md">
                            New
                        </span>
                    )}
                </div>

                {/* Wishlist Button - Z-30 to sit above the Link */}
                <button
                    className={`absolute top-4 right-4 z-30 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 transform hover:scale-110 cursor-pointer ${isWishlisted
                        ? 'bg-red-500 text-white shadow-red-500/30 shadow-lg'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-red-500'
                        }`}
                    onClick={handleWishlistToggle}
                >
                    <Heart size={14} className={isWishlisted ? 'fill-current' : ''} />
                </button>

                {/* Product Image or Category Fallback */}
                <div className="relative w-full h-full pointer-events-none flex items-center justify-center">
                    {image && image !== PRODUCT_PLACEHOLDER ? (
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-xl"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                    ) : (
                        // Category-Based Fallback Icon
                        <div className="text-slate-600 group-hover:text-blue-400 transition-colors duration-300 transform group-hover:scale-110 group-hover:-translate-y-2">
                            {/* Simple logic to choose icon based on category name */}
                            {category?.toLowerCase().includes('audio') ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                            ) : category?.toLowerCase().includes('engine') ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" /><path d="M8.5 8.5 12 12" /><path d="M12 12 15.5 8.5" /><path d="M12 12 8.5 15.5" /><path d="M12 12 15.5 15.5" /></svg> // Generic cog for engine
                            ) : category?.toLowerCase().includes('brake') ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><path d="M6 12h.01M18 12h.01" /></svg>
                            ) : (
                                // Default Box/Part Icon
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col gap-2 relative">

                {/* Category - De-emphasized */}
                {category && (
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-500 transition-colors mb-0.5">
                        {category}
                    </p>
                )}

                {/* Title - clickable via separate Link */}
                <Link href={productLink} className="block">
                    <h3 className="font-bold text-slate-900 text-base leading-tight line-clamp-2 min-h-[44px] group-hover:text-blue-600 transition-colors">
                        {name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-1 pointer-events-none">
                    <div className="flex text-yellow-500/80 text-[10px]">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < (rating || 5) ? 'fill-current' : 'text-slate-800 fill-current'}`} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                        ))}
                    </div>
                    <span className="text-[10px] text-slate-600 font-medium">({(rating || 5) * 10 + 5} Reviews)</span>
                </div>

                {/* Price and Action Row */}
                <div className="pt-2 flex items-center justify-between">
                    <div>
                        <div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 line-through mb-0.5">LKR {((price || 0) * 1.1).toLocaleString()}</span>
                                <span className="text-xl font-bold text-slate-900 tracking-tight">
                                    {formatPrice(price || 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add to Cart Button with Animation */}
                <div className="mt-2 relative z-20">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer overflow-hidden ${isAdded
                                ? 'bg-green-500 text-white shadow-green-500/30 scale-[1.02]'
                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20 hover:shadow-blue-500/30 hover:-translate-y-0.5'
                            }`}
                    >
                        <span className={`flex items-center gap-2 transition-all duration-300 ${isAdded ? 'animate-bounce' : ''}`}>
                            {isAdded ? (
                                <>
                                    <Check size={18} className="animate-[ping_0.5s_ease-in-out]" />
                                    Added!
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={18} className="transition-transform group-hover/btn:scale-110" />
                                    Add to Cart
                                </>
                            )}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

