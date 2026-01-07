"use client";

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Minus, Plus, Facebook, Twitter, Share2, ShoppingCart } from 'lucide-react';
import { ProductSidebar } from '@/components/product/ProductSidebar';
import { useCart } from '@/lib/cart-store';
import { useTenant } from '@/lib/tenant-context';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/lib/api';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    // Unwrap params in Next.js 15+
    const unwrappedParams = use(params);
    const { slug } = unwrappedParams;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const { addItem } = useCart();
    const { tenant } = useTenant();

    // Add to cart dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [addedItem, setAddedItem] = useState<{ name: string, image: string, price: number, quantity: number } | null>(null);

    useEffect(() => {
        async function loadProduct() {
            if (!tenant || !slug) return;
            setLoading(true);
            try {
                const { api } = await import('@/lib/api');
                const data = await api.getProduct(tenant.subdomain, slug);
                setProduct(data);
            } catch (error) {
                console.error('Error loading product:', error);
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [tenant, slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 flex justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-[#C8102E] rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 text-center">
                <div className="bg-white p-8 rounded-xl shadow-sm inline-block max-w-md mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
                    <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
                    <Link href="/products" className="inline-flex items-center gap-2 text-[#C8102E] font-medium hover:underline">
                        <ChevronRight size={16} className="rotate-180" />
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const images = (product.images && product.images.length > 0) ? product.images : [PLACEHOLDER_IMAGE];
    const price = product.salePrice > 0 ? product.salePrice : null;

    const handleAddToCart = () => {
        if (price !== null && tenant) {
            addItem(tenant.subdomain, {
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
        <div className="bg-gray-50 min-h-screen font-sans">
            <AddToCartDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                product={addedItem!}
            />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100 py-4 sticky top-20 z-10 transition-shadow shadow-sm">
                <div className="container-custom">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#C8102E] transition-colors">Home</Link>
                        <ChevronRight size={14} className="text-gray-300" />
                        <Link href="/products" className="hover:text-[#C8102E] transition-colors">Products</Link>
                        {product.category && (
                            <>
                                <ChevronRight size={14} className="text-gray-300" />
                                <span className="hover:text-gray-900 cursor-default transition-colors">{product.category}</span>
                            </>
                        )}
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-gray-900 font-medium truncate max-w-[200px]" title={product.name}>{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container-custom py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
                            <div className="grid md:grid-cols-2 gap-10 lg:gap-14">

                                {/* Image Gallery - Sticky on desktop */}
                                <div className="space-y-4">
                                    {/* Main Image */}
                                    <div className="relative aspect-square bg-gray-50 border border-gray-100 rounded-xl overflow-hidden group">
                                        <Image
                                            src={images[selectedImage] || PLACEHOLDER_IMAGE}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                            priority
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = PLACEHOLDER_IMAGE;
                                            }}
                                        />

                                        {/* Zoom indicator */}
                                        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            <Share2 size={18} className="text-gray-600" />
                                        </div>
                                    </div>

                                    {/* Thumbnails */}
                                    {images.length > 1 && (
                                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                            {images.map((img, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedImage(index)}
                                                    className={`w-20 h-20 border-2 rounded-lg flex-shrink-0 overflow-hidden relative transition-all ${selectedImage === index
                                                        ? 'border-[#C8102E] ring-2 ring-red-100'
                                                        : 'border-transparent bg-gray-50 hover:border-gray-300'
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
                                        <div className="mb-3">
                                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                                                {product.brand}
                                            </span>
                                        </div>
                                    )}

                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                        {product.name}
                                    </h1>

                                    {/* Pricing Card */}
                                    <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            {price !== null ? (
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-500 font-medium">Sale Price</span>
                                                    <span className="text-4xl font-extrabold text-[#C8102E]" style={{ color: tenant?.primaryColor || '#C8102E' }}>
                                                        <span className="text-xl align-top mr-1 font-bold">{tenant?.currency || 'LKR'}</span>
                                                        {Number(price).toLocaleString()}
                                                    </span>
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
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${product.stockQty > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {product.stockQty > 0 ? 'In Stock' : 'Out of Stock'}
                                            </div>
                                        </div>

                                        {/* Quantity Discounts Badge */}
                                        {product.quantityDiscounts && product.quantityDiscounts.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <p className="text-sm font-semibold text-gray-700 mb-2">Bulk Discounts Available:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.quantityDiscounts.map((tier, idx) => (
                                                        <div key={idx} className="bg-white border border-green-200 text-green-700 text-sm py-1 px-3 rounded-lg shadow-sm flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                            Buy <span className="font-bold">{tier.minQuantity}+</span> get <span className="font-bold">{tier.discountType === 'PERCENTAGE' ? `${tier.discountValue}%` : `-${tier.discountValue}`} Off</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border border-gray-300 rounded-lg bg-white h-12">
                                                <button
                                                    onClick={() => handleQuantityChange(-1)}
                                                    className="w-12 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-lg transition-colors disabled:opacity-50"
                                                    disabled={quantity <= 1}
                                                >
                                                    <Minus size={18} />
                                                </button>
                                                <div className="w-12 h-full flex items-center justify-center border-x border-gray-200 font-semibold text-gray-900 bg-gray-50">
                                                    {quantity}
                                                </div>
                                                <button
                                                    onClick={() => handleQuantityChange(1)}
                                                    className="w-12 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-lg transition-colors"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={handleAddToCart}
                                                disabled={price === null || product.stockQty <= 0}
                                                style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
                                                className="flex-1 h-12 text-white font-bold rounded-lg hover:brightness-90 hover:shadow-lg active:scale-[0.98] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                                            >
                                                {product.stockQty > 0 ? (
                                                    <>
                                                        <ShoppingCart size={20} />
                                                        Add To Cart
                                                    </>
                                                ) : 'Out of Stock'}
                                            </button>
                                        </div>

                                        <div className="text-gray-600 leading-relaxed text-lg border-t border-gray-100 pt-6">
                                            {product.description || 'No description available for this product.'}
                                        </div>
                                    </div>

                                    {/* Technical Specs */}
                                    <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
                                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            Product Specifications
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                                            {product.category && (
                                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                                    <span className="text-gray-500">Category</span>
                                                    <span className="font-medium text-gray-900">{product.category}</span>
                                                </div>
                                            )}
                                            {product.brand && (
                                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                                    <span className="text-gray-500">Brand</span>
                                                    <span className="font-medium text-gray-900">{product.brand}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                                <span className="text-gray-500">SKU</span>
                                                <span className="font-mono text-gray-700">{product.sku}</span>
                                            </div>
                                        </div>

                                        {/* Compatible Models */}
                                        {product.compatibleModels && product.compatibleModels.length > 0 && (
                                            <div className="mt-6">
                                                <span className="text-gray-500 text-sm block mb-2">Compatible Models</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.compatibleModels.map((m, i) => (
                                                        <span key={i} className="inline-block bg-white border border-gray-200 text-gray-700 text-xs px-2 py-1 rounded shadow-sm">
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
                        {/* Benefit Cards / Promo could go here */}
                        <ProductSidebar />
                    </aside>
                </div>
            </div>
        </div>
    );
}

import { AddToCartDialog } from '@/components/product/AddToCartDialog';
