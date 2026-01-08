"use client";

import { Heart } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist-store';
import { useTenant } from '@/lib/tenant-context';

interface WishlistButtonProps {
    productId: string;
    name: string;
    sku: string;
    price: number;
    image: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'icon' | 'button';
    className?: string;
}

export function WishlistButton({
    productId,
    name,
    sku,
    price,
    image,
    size = 'md',
    variant = 'icon',
    className = '',
}: WishlistButtonProps) {
    const { tenant } = useTenant();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const storeSlug = tenant?.subdomain || 'demo';
    const isWishlisted = isInWishlist(storeSlug, productId);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(storeSlug, { productId, name, sku, price, image });
    };

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    };

    const iconSize = {
        sm: 16,
        md: 20,
        lg: 24,
    };

    if (variant === 'button') {
        return (
            <button
                onClick={handleClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isWishlisted
                        ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                    } ${className}`}
            >
                <Heart
                    size={iconSize[size]}
                    className={`transition-all duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                />
                <span>{isWishlisted ? 'Saved' : 'Save'}</span>
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            className={`${sizeClasses[size]} rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isWishlisted
                    ? 'bg-red-500 text-white hover:bg-red-600 scale-110'
                    : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:bg-white hover:text-red-500 hover:scale-110'
                } ${className}`}
            aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
            <Heart
                size={iconSize[size]}
                className={`transition-all duration-300 ${isWishlisted ? 'fill-white' : ''}`}
            />
        </button>
    );
}
