"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { useTenant } from '@/lib/tenant-context';

import { PLACEHOLDER_IMAGE } from '@/lib/constants';

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
    const { tenant } = useTenant();

    // Use current tenant's slug for cart namespace and links
    const storeSlug = tenant?.subdomain || 'demo';

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (price !== null) {
            addItem(storeSlug, {
                productId: id,
                name,
                sku,
                price,
                image: image || PRODUCT_PLACEHOLDER,
            });
        }
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

    return (
        <Link href={`/${storeSlug}/products/${slug}`} className="block group">
            <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl border border-slate-200 hover:border-blue-200">
                {/* Image Container */}
                <div className="relative aspect-square p-8 bg-[#0F172A] group-hover:bg-[#1E293B] transition-colors duration-500 flex items-center justify-center">

                    {/* Floating Glow Behind Image */}
                    <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl scale-0 group-hover:scale-125 transition-transform duration-700 mx-10 my-10" />

                    {/* Unified Status Badge (Top Left) */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
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

                    {/* Wishlist Button */}
                    <button
                        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-red-500 backdrop-blur-md flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    >
                        <Heart size={14} />
                    </button>

                    {/* Product Image or Category Fallback */}
                    <div className="relative w-full h-full z-10 flex items-center justify-center">
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
                <div className="p-5 flex flex-col gap-2">

                    {/* Category - De-emphasized */}
                    {category && (
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-500 transition-colors mb-0.5">
                            {category}
                        </p>
                    )}

                    {/* Title - Dominant */}
                    <h3 className="font-bold text-white text-base leading-tight line-clamp-2 min-h-[44px] group-hover:text-blue-400 transition-colors">
                        {name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex text-yellow-500/80 text-[10px]">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-3 h-3 ${i < (rating || 5) ? 'fill-current' : 'text-slate-800 fill-current'}`} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            ))}
                        </div>
                        <span className="text-[10px] text-slate-600 font-medium">({Math.floor(Math.random() * 50) + 10} Reviews)</span>
                    </div>

                    {/* Price and Action Row */}
                    <div className="pt-2 flex items-center justify-between">
                        <div>
                            {price !== null ? (
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 line-through mb-0.5">LKR {(price * 1.1).toLocaleString()}</span>
                                    <span className="text-xl font-bold text-slate-900 tracking-tight">
                                        {formatPrice(price)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-sm font-semibold text-blue-400">Ask for Price</span>
                            )}
                        </div>


                    </div>
                    {/* Add to Cart Button (Full width style as per reference) */}
                    <div className="mt-2">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 active:scale-[0.98] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                            <ShoppingCart size={18} className="transition-transform group-hover/btn:scale-110" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
