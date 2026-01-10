import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetailClient } from './ProductDetailClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Server-side data fetching
async function getProduct(storeSlug: string, productId: string) {
    try {
        const res = await fetch(
            `${API_URL}/api/public/spareparts/products/${productId}?subdomain=${storeSlug}`,
            { next: { revalidate: 60 } } // Cache for 60 seconds
        );

        if (!res.ok) {
            console.error('[SSR] Product fetch failed:', res.status, res.statusText);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

async function getTenantConfig(storeSlug: string) {
    try {
        const res = await fetch(
            `${API_URL}/api/public/spareparts/tenant?subdomain=${storeSlug}`,
            { next: { revalidate: 300 } } // Cache tenant config for 5 minutes
        );

        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ storeSlug: string; slug: string }> }): Promise<Metadata> {
    const { storeSlug, slug } = await params;
    const product = await getProduct(storeSlug, slug);
    const tenant = await getTenantConfig(storeSlug);

    if (!product) {
        return {
            title: 'Product Not Found',
            description: 'The requested product could not be found.',
        };
    }

    const storeName = tenant?.storeName || 'Auto Parts Store';
    const currency = tenant?.currency || 'LKR';
    const price = `${currency} ${Number(product.salePrice).toLocaleString()}`;

    // Build rich description
    const description = product.description
        ? product.description.slice(0, 155) + '...'
        : `Buy ${product.name} (${product.sku}) at ${storeName}. ${price}. ${product.brand ? `Brand: ${product.brand}.` : ''} ${product.stockQty > 0 ? 'In Stock. Fast delivery.' : 'Contact us for availability.'}`;

    const images = product.images?.length > 0 ? product.images : [];

    return {
        title: `${product.name} | ${product.brand || 'Parts'} | ${storeName}`,
        description,
        keywords: [
            product.name,
            product.sku,
            product.brand,
            product.category,
            ...(product.compatibleModels || []),
            'auto parts',
            'spare parts',
            storeName,
        ].filter(Boolean).join(', '),
        openGraph: {
            title: `${product.name} - ${storeName}`,
            description,
            type: 'website',
            images: images.map((img: string) => ({
                url: img,
                width: 800,
                height: 800,
                alt: product.name,
            })),
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description,
            images: images[0] ? [images[0]] : [],
        },
        other: {
            // Schema.org Product structured data hint
            'product:price:amount': product.salePrice?.toString() || '',
            'product:price:currency': currency,
            'product:availability': product.stockQty > 0 ? 'in stock' : 'out of stock',
        },
    };
}

// Server Component (SSR)
export default async function ProductDetailPage({ params }: { params: Promise<{ storeSlug: string; slug: string }> }) {
    const { storeSlug, slug } = await params;
    const product = await getProduct(storeSlug, slug);

    if (!product) {
        notFound();
    }

    // JSON-LD Structured Data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description || `${product.name} - High quality auto part`,
        sku: product.sku,
        brand: product.brand ? {
            '@type': 'Brand',
            name: product.brand,
        } : undefined,
        image: product.images?.length > 0 ? product.images : undefined,
        offers: {
            '@type': 'Offer',
            priceCurrency: 'LKR',
            price: product.salePrice || 0,
            availability: product.stockQty > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: 'Auto Parts Store',
            },
        },
    };

    return (
        <>
            {/* JSON-LD for Google Rich Results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Client Component for Interactivity */}
            <ProductDetailClient product={product} storeSlug={storeSlug} />
        </>
    );
}
