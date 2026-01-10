"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductSidebar } from '@/components/product/ProductSidebar';
import { VehicleSelector } from '@/components/product/VehicleSelector';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { api, Product } from '@/lib/api';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
    const { tenant } = useTenant();
    const searchParams = useSearchParams();
    const storeSlug = tenant?.subdomain || 'demo';

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filters from URL or state
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        brand: searchParams.get('brand') || '',
        make: '',
        model: '',
        year: ''
    });

    useEffect(() => {
        if (!tenant) return;

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const result = await api.getProducts(storeSlug, {
                    category: filters.category,
                    brand: filters.brand,
                    make: filters.make,
                    model: filters.model,
                    year: filters.year,
                    page,
                    limit: 20
                });
                setProducts(result.data);
                setTotalProducts(result.meta.total);
                setTotalPages(result.meta.totalPages);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [tenant, storeSlug, filters, page]);

    const handleVehicleSelect = (vehicle: { make?: string; model?: string; year?: string }) => {
        setFilters(prev => ({
            ...prev,
            make: vehicle.make || '',
            model: vehicle.model || '',
            year: vehicle.year || ''
        }));
        setPage(1);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b py-3">
                <div className="container-custom">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href={`/${storeSlug}`} className="text-gray-500 hover:text-[#C8102E]">HOME</Link>
                        <ChevronRight size={14} className="text-gray-400" />
                        <span className="text-gray-800 font-medium">ALL PRODUCTS</span>
                    </nav>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <ProductSidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Header with Vehicle Filter */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                                <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
                                <VehicleSelector onSelect={handleVehicleSelect} />
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500">{totalProducts} products</span>
                                <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                                    <option>Sort by: Latest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Name: A-Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(filters.make || filters.model || filters.year) && (
                            <div className="mb-4 p-3 bg-red-50 rounded-lg flex items-center gap-2">
                                <span className="text-sm text-red-700">
                                    Showing parts compatible with: <strong>{[filters.make, filters.model, filters.year].filter(Boolean).join(' ')}</strong>
                                </span>
                                <button
                                    onClick={() => handleVehicleSelect({})}
                                    className="text-red-600 text-sm underline ml-2"
                                >
                                    Clear
                                </button>
                            </div>
                        )}

                        {/* Loading State */}
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="w-10 h-10 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No products found matching your criteria.</p>
                            </div>
                        ) : (
                            <>
                                {/* Products Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            sku={product.sku}
                                            price={product.salePrice}
                                            image={product.images?.[0] || ''}
                                            category={product.category}
                                            stockStatus={product.stockQty > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK'}
                                            slug={product.id}
                                            matchedAlias={(product as typeof product & { matchedAlias?: string }).matchedAlias} // Pass matched alias from API
                                        />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-8">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                        >
                                            &lt;
                                        </button>
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p)}
                                                className={`w-10 h-10 rounded flex items-center justify-center ${page === p ? 'bg-[#C8102E] text-white' : 'border border-gray-300 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
