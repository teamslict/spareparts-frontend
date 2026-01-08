import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default async function sitemap({ params }: { params: Promise<{ storeSlug: string }> }): Promise<MetadataRoute.Sitemap> {
    const resolvedParams = await params;
    const storeSlug = resolvedParams?.storeSlug || 'demo';
    const baseUrl = `https://spareparts.slict.lk/${storeSlug}`;
    const apiUrl = 'http://127.0.0.1:3000'; // Hardcoded for safety during debug

    // Static Routes
    const staticRoutes = [
        '',
        '/products',
        '/services',
        '/about',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Try fetching products, but don't fail if it crashes
    let productRoutes: MetadataRoute.Sitemap = [];

    try {
        console.log(`Fetching sitemap products for ${storeSlug} from ${apiUrl}...`);
        // Limit to 50 items for now to be safe and fast
        const res = await fetch(`${apiUrl}/api/public/spareparts/products?subdomain=${storeSlug}&limit=50&page=1`, {
            next: { revalidate: 60 }
        });

        if (res.ok) {
            const data = await res.json();
            if (data.data && Array.isArray(data.data)) {
                productRoutes = data.data.map((p: { id: string; slug?: string }) => ({
                    url: `${baseUrl}/products/${p.id}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.6
                }));
            }
        }
    } catch (e) {
        console.error("Sitemap fetch error:", e);
        // Ignore error
    }

    return [...staticRoutes, ...productRoutes];
}
