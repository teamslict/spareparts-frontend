"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Minus, Plus, Share2, ShoppingCart, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { ProductSidebar } from '@/components/product/ProductSidebar';
import { useCart } from '@/lib/cart-store';
import { useTenant } from '@/lib/tenant-context';
import { Product } from '@/lib/api';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { AddToCartDialog } from '@/components/product/AddToCartDialog';
import { WishlistButton } from '@/components/product/WishlistButton';

interface Props {
    product: Product;
    storeSlug: string;
}

export function ProductDetailClient({ product, storeSlug }: Props) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [addedItem, setAddedItem] = useState<{ name: string, image: string, price: number, quantity: number } | null>(null);

    const { addItem } = useCart();
    const { tenant } = useTenant();

    const images = (product.images && product.images.length > 0) ? product.images : [PLACEHOLDER_IMAGE];
    const price = product.salePrice > 0 ? product.salePrice : null;

    const handleAddToCart = () => {
        if (price !== null) {
            addItem(storeSlug, {
                productId: product.id,
                name: product.name,
                sku: product.sku,
                price: Number(price),
                image: images[0],
            }, quantity);

            setAddedItem({
                name: product.name,
                image: images[0],
                price: Number(price),
                quantity: quantity
            });
            setIsDialogOpen(true);
        }
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen font-sans">
            <AddToCartDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                product={addedItem!}
            />

            {/* Breadcrumb - Premium Style */}
            <div className="bg-white/80 backdrop-blur-md border-b border-gray-100/50 py-4 sticky top-20 z-10">
                <div className="container-custom">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href={`/${storeSlug}`} className="hover:text-[#C8102E] transition-colors">Home</Link>
                        <ChevronRight size={14} className="text-gray-300" />
                        <Link href={`/${storeSlug}/products`} className="hover:text-[#C8102E] transition-colors">Products</Link>
                        {product.category && (
                            <>
                                <ChevronRight size={14} className="text-gray-300" />
                                <Link href={`/${storeSlug}/products?category=${product.category}`} className="hover:text-[#C8102E] transition-colors">{product.category}</Link>
                            </>
                        )}
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container-custom py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-xl shadow-gray-100/50 border border-gray-100/50 overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-10 lg:gap-14">

                                {/* Image Gallery - Premium */}
                                <div className="space-y-4">
                                    {/* Main Image */}
                                    <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/50 rounded-2xl overflow-hidden group">
                                        <Image
                                            src={images[selectedImage] || PLACEHOLDER_IMAGE}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-8 group-hover:scale-105 transition-transform duration-700 ease-out"
                                            priority
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = PLACEHOLDER_IMAGE;
                                            }}
                                        />

                                        {/* Wishlist Button */}
                                        <WishlistButton
                                            productId={product.id}
                                            name={product.name}
                                            sku={product.sku}
                                            price={Number(price) || 0}
                                            image={images[0]}
                                            size="md"
                                            className="absolute top-4 right-4"
                                        />

                                        {/* Share Button */}
                                        <button className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100">
                                            <Share2 size={18} className="text-gray-500" />
                                        </button>

                                        {/* Stock Badge */}
                                        {product.stockQty > 0 && product.stockQty <= 5 && (
                                            <div className="absolute bottom-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                                                Only {product.stockQty} left!
                                            </div>
                                        )}
                                    </div>

                                    {/* Thumbnails */}
                                    {images.length > 1 && (
                                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                            {images.map((img, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedImage(index)}
                                                    className={`w-20 h-20 border-2 rounded-xl flex-shrink-0 overflow-hidden relative transition-all duration-200 ${selectedImage === index
                                                        ? 'border-[#C8102E] ring-4 ring-red-100 scale-105'
                                                        : 'border-transparent bg-gray-50 hover:border-gray-300 hover:scale-105'
                                                        }`}
                                                >
                                                    <Image
                                                        src={img || PLACEHOLDER_IMAGE}
                                                        alt={`${product.name} ${index + 1}`}
                                                        fill
                                                        className="object-contain p-2"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="flex flex-col">
                                    {/* Brand Badge */}
                                    {product.brand && (
                                        <div className="mb-4">
                                            <span className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                                {product.brand}
                                            </span>
                                        </div>
                                    )}

                                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
                                        {product.name}
                                    </h1>

                                    <p className="text-sm text-gray-500 mb-6">SKU: <span className="font-mono text-gray-700">{product.sku}</span></p>

                                    {/* Pricing Card - Premium Glassmorphism */}
                                    <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl p-6 mb-8 border border-gray-200/50 shadow-lg shadow-gray-100/30 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-2xl"></div>

                                        <div className="flex items-start justify-between mb-4 relative z-10">
                                            {price !== null ? (
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Price</span>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-lg font-bold text-gray-500">{tenant?.currency || 'LKR'}</span>
                                                        <span className="text-5xl font-black bg-gradient-to-r from-[#C8102E] to-[#e91e3a] bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
                                                            {Number(price).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span className="text-lg font-semibold text-gray-800">Contact Us for Price</span>
                                                    {tenant?.contactPhone && (
                                                        <a
                                                            href={`tel:${tenant.contactPhone}`}
                                                            className="block text-[#C8102E] font-bold text-xl mt-1 hover:underline"
                                                        >
                                                            {tenant.contactPhone}
                                                        </a>
                                                    )}
                                                </div>
                                            )}

                                            {/* Stock Status */}
                                            <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${product.stockQty > 0
                                                ? 'bg-green-100 text-green-700 border border-green-200'
                                                : 'bg-red-100 text-red-700 border border-red-200'
                                                }`}>
                                                {product.stockQty > 0 ? (
                                                    <>
                                                        <Check size={16} />
                                                        In Stock
                                                    </>
                                                ) : 'Out of Stock'}
                                            </div>
                                        </div>

                                        {/* Quantity Discounts */}
                                        {product.quantityDiscounts && product.quantityDiscounts.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-gray-200/50">
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Save More, Buy More</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.quantityDiscounts.map((tier, idx) => (
                                                        <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 text-sm py-2 px-4 rounded-xl shadow-sm flex items-center gap-2 hover:scale-105 transition-transform cursor-default">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                            Buy <span className="font-black">{tier.minQuantity}+</span> → <span className="font-black text-green-600">{tier.discountType === 'PERCENTAGE' ? `${tier.discountValue}% OFF` : `-${tier.discountValue}`}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white h-14 shadow-sm">
                                                <button
                                                    onClick={() => handleQuantityChange(-1)}
                                                    className="w-14 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-l-xl transition-all disabled:opacity-30"
                                                    disabled={quantity <= 1}
                                                >
                                                    <Minus size={20} />
                                                </button>
                                                <div className="w-14 h-full flex items-center justify-center border-x-2 border-gray-200 font-bold text-xl text-gray-900 bg-gray-50">
                                                    {quantity}
                                                </div>
                                                <button
                                                    onClick={() => handleQuantityChange(1)}
                                                    className="w-14 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-r-xl transition-all"
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            </div>

                                            {/* Add to Cart Button */}
                                            <button
                                                onClick={handleAddToCart}
                                                disabled={price === null || product.stockQty <= 0}
                                                className="flex-1 h-14 bg-gradient-to-r from-[#C8102E] to-[#e91e3a] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-red-500/25 active:scale-[0.98] transition-all disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-3 uppercase tracking-wider text-sm"
                                            >
                                                {product.stockQty > 0 ? (
                                                    <>
                                                        <ShoppingCart size={22} />
                                                        Add To Cart
                                                    </>
                                                ) : 'Out of Stock'}
                                            </button>
                                        </div>

                                        {/* Trust Badges */}
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                                                <Truck size={20} className="text-gray-600 mb-1" />
                                                <span className="text-xs font-medium text-gray-600">Free Shipping</span>
                                            </div>
                                            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                                                <Shield size={20} className="text-gray-600 mb-1" />
                                                <span className="text-xs font-medium text-gray-600">Genuine Parts</span>
                                            </div>
                                            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                                                <RotateCcw size={20} className="text-gray-600 mb-1" />
                                                <span className="text-xs font-medium text-gray-600">Easy Returns</span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="text-gray-600 leading-relaxed text-lg border-t border-gray-100 pt-6">
                                            {product.description || 'No description available for this product.'}
                                        </div>
                                    </div>

                                    {/* Technical Specs */}
                                    <div className="mt-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                                        <h3 className="font-bold text-gray-900 mb-4 text-lg">Specifications</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                                            {product.category && (
                                                <div className="flex justify-between border-b border-gray-200/50 pb-3">
                                                    <span className="text-gray-500">Category</span>
                                                    <span className="font-semibold text-gray-900">{product.category}</span>
                                                </div>
                                            )}
                                            {product.brand && (
                                                <div className="flex justify-between border-b border-gray-200/50 pb-3">
                                                    <span className="text-gray-500">Brand</span>
                                                    <span className="font-semibold text-gray-900">{product.brand}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between border-b border-gray-200/50 pb-3">
                                                <span className="text-gray-500">SKU</span>
                                                <span className="font-mono text-gray-700">{product.sku}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200/50 pb-3">
                                                <span className="text-gray-500">Availability</span>
                                                <span className={`font-semibold ${product.stockQty > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {product.stockQty > 0 ? `${product.stockQty} units` : 'Out of Stock'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Compatible Models */}
                                        {product.compatibleModels && product.compatibleModels.length > 0 && (
                                            <div className="mt-6 pt-4 border-t border-gray-200/50">
                                                <span className="text-gray-500 text-sm font-medium block mb-3">Compatible Vehicles</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.compatibleModels.map((m, i) => (
                                                        <span key={i} className="inline-block bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors cursor-default">
                                                            {m}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Sidebar - Desktop Only */}
                    <aside className="hidden lg:block lg:w-80 flex-shrink-0 space-y-8">
                        <ProductSidebar />
                    </aside>
                </div>
            </div>
        </div>
    );
}
