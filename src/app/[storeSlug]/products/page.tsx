"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductSidebar } from '@/components/product/ProductSidebar';
import { VehicleSelector } from '@/components/product/VehicleSelector';
import Link from 'next/link';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { api, Product } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import { Section, Container, Grid, PageHeader, Surface } from '@/components/ui';

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
            <div className="bg-white border-b">
                <Container className="py-3">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href={`/${storeSlug}`} className="text-gray-500 hover:text-red-600 transition-colors">
                            Home
                        </Link>
                        <ChevronRight size={14} className="text-gray-400" />
                        <span className="text-gray-900 font-medium">All Products</span>
                    </nav>
                </Container>
            </div>

            {/* Main Content */}
            <Section>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <Surface padding="md" className="sticky top-24">
                            <ProductSidebar />
                        </Surface>
                    </aside>

                    {/* Products Area */}
                    <main className="flex-1 min-w-0">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
                                <VehicleSelector onSelect={handleVehicleSelect} />
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500">{totalProducts} products</span>
                                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                                    <option>Sort by: Latest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Name: A-Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Vehicle Filter */}
                        {(filters.make || filters.model || filters.year) && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center justify-between">
                                <span className="text-sm text-red-700">
                                    Showing parts for: <strong>{[filters.make, filters.model, filters.year].filter(Boolean).join(' ')}</strong>
                                </span>
                                <button
                                    onClick={() => handleVehicleSelect({})}
                                    className="text-red-600 text-sm font-medium hover:underline"
                                >
                                    Clear filter
                                </button>
                            </div>
                        )}

                        {/* Loading State */}
                        {loading ? (
                            <div className="flex items-center justify-center py-24">
                                <Loader2 size={32} className="text-gray-400 animate-spin" />
                            </div>
                        ) : products.length === 0 ? (
                            /* Empty State */
                            <Surface padding="lg" className="text-center">
                                <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
                                <button
                                    onClick={() => setFilters({ category: '', brand: '', make: '', model: '', year: '' })}
                                    className="text-red-600 font-medium hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </Surface>
                        ) : (
                            <>
                                {/* Products Grid */}
                                <Grid minWidth="240px" gap="md">
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
                                            matchedAlias={(product as any).matchedAlias}
                                        />
                                    ))}
                                </Grid>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-8">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            &lt;
                                        </button>
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p)}
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${page === p
                                                    ? 'bg-gray-900 text-white'
                                                    : 'border border-gray-200 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </Section>
        </div>
    );
}
