"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { useTenant } from '@/lib/tenant-context';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';

export interface ProductCardProps {
    id: string;
    name: string;
    sku: string;
    price: number | null;
    image: string;
    category?: string;
    brand?: string;
    stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK';
    rating?: number;
    slug: string;
    matchedAlias?: string | null;
}

/**
 * ProductCard - Light theme, consistent with page backgrounds
 * Uses Surface-like styling for visual consistency
 */
export function ProductCard({
    id,
    name,
    sku,
    price,
    image,
    category,
    brand,
    stockStatus,
    rating,
    slug,
    matchedAlias
}: ProductCardProps) {
    const { addItem } = useCart();
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';

    // Business logic: Add to cart
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (price !== null && stockStatus !== 'OUT_OF_STOCK') {
            addItem(storeSlug, {
                productId: id,
                name,
                sku,
                price,
                image: image || PLACEHOLDER_IMAGE,
            });
        }
    };

    // Business logic: Format price with tenant currency
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: tenant?.currency || 'LKR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Stock badge styling
    const stockBadgeStyles = {
        IN_STOCK: 'bg-green-100 text-green-700',
        LOW_STOCK: 'bg-amber-100 text-amber-700',
        OUT_OF_STOCK: 'bg-red-100 text-red-700',
    };

    const stockBadgeText = {
        IN_STOCK: 'In Stock',
        LOW_STOCK: 'Low Stock',
        OUT_OF_STOCK: 'Out of Stock',
    };

    const isOutOfStock = stockStatus === 'OUT_OF_STOCK';

    return (
        <Link href={`/${storeSlug}/products/${slug}`} className="block group">
            {/* Card Container - Light theme Surface-style */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300">

                {/* Image Container - Light gray background */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    {/* Stock Badge */}
                    <div className="absolute top-3 left-3 z-10">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-md ${stockBadgeStyles[stockStatus]}`}>
                            {stockBadgeText[stockStatus]}
                        </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-200 flex items-center justify-center transition-all"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        aria-label="Add to wishlist"
                    >
                        <Heart size={16} />
                    </button>

                    {/* Product Image */}
                    <div className="relative w-full h-full p-4 flex items-center justify-center">
                        {image && image !== PLACEHOLDER_IMAGE ? (
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className={`object-contain p-4 transition-transform duration-300 group-hover:scale-105 ${isOutOfStock ? 'opacity-50' : ''}`}
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        ) : (
                            // Fallback placeholder
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <ShoppingCart size={24} className="text-gray-400" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info - Light theme text */}
                <div className="p-4">
                    {/* Brand/Category */}
                    {(brand || category) && (
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            {brand || category}
                        </p>
                    )}

                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors">
                        {name}
                    </h3>

                    {/* Matched Alias (for search highlighting) */}
                    {matchedAlias && (
                        <p className="text-xs text-blue-600 mt-1">
                            Alt: {matchedAlias}
                        </p>
                    )}

                    {/* Rating */}
                    {rating !== undefined && (
                        <div className="flex items-center gap-1 mt-2">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-3 h-3 ${i < rating ? 'fill-current' : 'text-gray-200 fill-current'}`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">({rating})</span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="mt-3">
                        {price !== null ? (
                            <span className="text-lg font-bold text-gray-900">
                                {formatPrice(price)}
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-blue-600">
                                Contact for Price
                            </span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock || price === null}
                        className={`w-full mt-3 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${isOutOfStock || price === null
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]'
                            }`}
                    >
                        <ShoppingCart size={16} />
                        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </Link>
    );
}
