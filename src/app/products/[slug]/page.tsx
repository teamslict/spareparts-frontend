"use client";

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Minus, Plus, Facebook, Twitter, Share2 } from 'lucide-react';
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
            <div className="min-h-screen bg-gray-50 pt-20 flex justify-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
                <Link href="/products" className="text-red-600 hover:underline mt-4 block">
                    Return to Shop
                </Link>
            </div>
        );
    }

    const images = (product.images && product.images.length > 0) ? product.images : [PLACEHOLDER_IMAGE];
    const price = product.salePrice > 0 ? product.salePrice : null;

    const handleAddToCart = () => {
        if (price !== null) {
            addItem({
                productId: product.id,
                name: product.name,
                sku: product.sku,
                price: Number(price),
                image: images[0],
            }, quantity);
        }
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b py-3">
                <div className="container-custom">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-[#C8102E]">HOME</Link>
                        <ChevronRight size={14} className="text-gray-400" />
                        <Link href="/products" className="text-gray-500 hover:text-[#C8102E]">PRODUCTS</Link>
                        <ChevronRight size={14} className="text-gray-400" />
                        <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                        <ProductSidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="bg-white rounded-lg p-6 mb-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Image Gallery */}
                                <div>
                                    {/* Main Image */}
                                    <div className="relative aspect-square bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
                                        <Image
                                            src={images[selectedImage] || PLACEHOLDER_IMAGE}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-4"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = PLACEHOLDER_IMAGE;
                                            }}
                                        />
                                    </div>

                                    {/* Thumbnails */}
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {images.map((img, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`w-16 h-16 border-2 rounded flex-shrink-0 overflow-hidden ${selectedImage === index ? 'border-[#C8102E]' : 'border-gray-200'
                                                    }`}
                                            >
                                                <Image
                                                    src={img || PLACEHOLDER_IMAGE}
                                                    alt={`${product.name} ${index + 1}`}
                                                    width={64}
                                                    height={64}
                                                    className="object-contain w-full h-full"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                        {product.name}
                                    </h1>

                                    {/* Price */}
                                    <div className="mb-4">
                                        {price !== null ? (
                                            <span className="text-3xl font-bold" style={{ color: tenant?.primaryColor || '#C8102E' }}>
                                                {tenant?.currency || 'LKR'} {Number(price).toLocaleString()}
                                            </span>
                                        ) : (
                                            <div>
                                                <span className="text-lg font-semibold text-gray-800">Contact Us for Price</span>
                                                {tenant?.contactPhone && (
                                                    <a
                                                        href={`tel:${tenant.contactPhone}`}
                                                        className="block text-[#C8102E] font-bold text-xl mt-1"
                                                    >
                                                        📞 {tenant.contactPhone}
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-gray-600 mb-6">{product.description || 'No description available.'}</p>

                                    {/* Quantity & Add to Cart */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center gap-1">
                                            <span className="text-gray-600 mr-2">Quantity</span>
                                            <button
                                                onClick={() => handleQuantityChange(-1)}
                                                className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                className="w-16 h-10 border border-gray-300 rounded text-center"
                                                min="1"
                                            />
                                            <button
                                                onClick={() => handleQuantityChange(1)}
                                                className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={handleAddToCart}
                                            disabled={price === null}
                                            style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
                                            className="px-8 py-3 text-white font-semibold rounded hover:brightness-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>

                                    {/* Product Details */}
                                    <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
                                        {product.category && <p><span className="font-medium text-gray-900">Category:</span> {product.category}</p>}
                                        {product.brand && <p><span className="font-medium text-gray-900">Brand:</span> {product.brand}</p>}
                                        <p><span className="font-medium text-gray-900">SKU:</span> {product.sku}</p>
                                        {product.compatibleModels && product.compatibleModels.length > 0 && (
                                            <div>
                                                <span className="font-medium text-gray-900">Compatible Models:</span>
                                                <ul className="list-disc list-inside mt-1 ml-1 text-gray-600">
                                                    {product.compatibleModels.map((m, i) => (
                                                        <li key={i}>{m}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
