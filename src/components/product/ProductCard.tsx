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
    slug
}: ProductCardProps) {
    const { addItem } = useCart();
    const { tenant } = useTenant();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (price !== null) {
            addItem({
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
        <Link href={`/products/${slug}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative aspect-square p-6 bg-gray-50/50 group-hover:bg-gray-50 transition-colors">
                    {/* Stock Badge */}
                    <div className="absolute top-3 left-3 z-10">
                        {stockStatus !== 'IN_STOCK' && (
                            <span
                                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm"
                                style={{
                                    backgroundColor: stockStatus === 'LOW_STOCK' ? '#f59e0b' : '#ef4444',
                                    color: 'white'
                                }}
                            >
                                {badge.text}
                            </span>
                        )}
                    </div>

                    {/* Action Buttons - Show on Hover */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex flex-col gap-2">
                        <button
                            className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        >
                            <Heart size={14} />
                        </button>
                    </div>

                    {/* Product Image */}
                    <div className="relative w-full h-full">
                        <Image
                            src={image || PRODUCT_PLACEHOLDER}
                            alt={name}
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-4 md:p-5">
                    {category && (
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">{category}</p>
                    )}

                    <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-snug mb-2 group-hover:text-red-600 transition-colors line-clamp-2 min-h-[44px]">
                        {name}
                    </h3>

                    {/* Rating Stats - Simplified */}
                    <div className="flex items-center gap-1 mb-3">
                        <div className="flex text-yellow-400 text-xs">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-3 h-3 ${i < (rating || 5) ? 'fill-current' : 'text-gray-200 fill-current'}`} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            ))}
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">(24 reviews)</span>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-end justify-between">
                        <div>
                            {price !== null ? (
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 line-through">LKR {(price * 1.1).toLocaleString()}</span>
                                    <span className="text-lg font-bold text-gray-900">
                                        {formatPrice(price)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-xs font-semibold text-blue-600 hover:underline">
                                    Ask for Price
                                </span>
                            )}
                        </div>

                        {stockStatus !== 'OUT_OF_STOCK' && (
                            <button
                                onClick={handleAddToCart}
                                className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                                aria-label="Add to cart"
                            >
                                <ShoppingCart size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
