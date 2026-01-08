
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';

// Force dynamic since we use search params and dynamic data
export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        storeSlug: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { storeSlug, slug } = await params;

    // Fetch categories to resolve slug to name
    const categories = await api.getCategories(storeSlug);
    const category = categories.find(c => c.slug === slug);

    if (!category) {
        return {
            title: 'Category Not Found',
        };
    }

    return {
        title: `${category.name} | Auto Parts Store`,
        description: `Browse our selection of ${category.name}`,
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { storeSlug, slug } = await params;

    // 1. Fetch all categories to find the matching name for this slug
    const categories = await api.getCategories(storeSlug);
    const category = categories.find(c => c.slug === slug);

    if (!category) {
        notFound();
    }

    // 2. Fetch products for this category
    const res = await api.getProducts(storeSlug, {
        category: category.name,
        limit: 50
    });

    const products = res.data;

    return (
        <div className="container-custom py-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{category.name}</h1>
                <p className="text-slate-500">
                    {products.length} {products.length === 1 ? 'product' : 'products'} found
                </p>
            </div>

            {/* Product Grid */}
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
                            rating={5}
                            slug={(product as typeof product & { matchedAlias?: string }).matchedAlias || product.id} // Use matched alias if available, else ID
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <p className="text-gray-500 text-lg">No products found in this category.</p>
                </div>
            )}
        </div>
    );
}
