
import { TenantConfig } from './tenant-context';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://erp.slict.lk';

export interface Product {
    id: string;
    name: string;
    sku: string;
    salePrice: number;
    description: string;
    category: string;
    brand: string;
    images: string[];
    stockQty: number;
    compatibleModels: string[];
    slug: string; // usually ID or SKU-based slug
    quantityDiscounts?: Array<{
        promotionName: string;
        minQuantity: number;
        maxQuantity: number | null;
        discountType: string;
        discountValue: number;
    }>;
}

export interface Category {
    name: string;
    count: number;
    slug: string;
}

export interface Brand {
    name: string;
    count: number;
}

interface ProductResponse {
    data: Product[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const api = {
    /**
     * Get Products with optional filters
     */
    getProducts: async (storeSlug: string, params: {
        category?: string;
        brand?: string;
        search?: string;
        make?: string;
        model?: string;
        year?: string;
        page?: number;
        limit?: number;
    } = {}): Promise<ProductResponse> => {
        try {
            const query = new URLSearchParams({
                subdomain: storeSlug,
                page: (params.page || 1).toString(),
                limit: (params.limit || 20).toString()
            });

            if (params.category && params.category !== 'All') query.append('category', params.category);
            if (params.brand && params.brand !== 'All') query.append('brand', params.brand);
            if (params.search) query.append('search', params.search);
            if (params.make) query.append('make', params.make);
            if (params.model) query.append('model', params.model);
            if (params.year) query.append('year', params.year);

            const res = await fetch(`${API_URL}/api/public/spareparts/products?${query.toString()}`, {
                next: { revalidate: 60 }
            });

            if (!res.ok) throw new Error('Failed to fetch products');

            return await res.json();
        } catch (error) {
            console.error('API Error:', error);
            // Return empty result on error to prevent crash
            return { data: [], meta: { total: 0, page: 1, limit: 20, totalPages: 0 } };
        }
    },

    /**
     * Get distinct categories
     */
    getCategories: async (storeSlug: string): Promise<Category[]> => {
        try {
            const res = await fetch(`${API_URL}/api/public/spareparts/categories?subdomain=${storeSlug}`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) return [];
            return await res.json();
        } catch (error) {
            console.error('API Error:', error);
            return [];
        }
    },

    /**
     * Get distinct brands
     */
    getBrands: async (storeSlug: string): Promise<Brand[]> => {
        try {
            const res = await fetch(`${API_URL}/api/public/spareparts/brands?subdomain=${storeSlug}`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) return [];
            return await res.json();
        } catch (error) {
            console.error('API Error:', error);
            return [];
        }
    },

    /**
     * Get single product by ID/Slug
     */
    getProduct: async (storeSlug: string, slug: string): Promise<Product | null> => {
        try {
            const res = await fetch(`${API_URL}/api/public/spareparts/products/${slug}?subdomain=${storeSlug}`, {
                next: { revalidate: 60 }
            });
            if (!res.ok) return null;
            return await res.json();
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    },

    /**
     * Customer Authentication
     */
    registerCustomer: async (storeSlug: string, data: any) => {
        const res = await fetch(`${API_URL}/api/public/spareparts/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, subdomain: storeSlug })
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Registration failed');
        }
        return await res.json();
    },

    loginCustomer: async (storeSlug: string, data: any) => {
        const res = await fetch(`${API_URL}/api/public/spareparts/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, subdomain: storeSlug })
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Login failed');
        }
        return await res.json();
    },

    /**
     * Create Order (Checkout)
     */
    createOrder: async (storeSlug: string, data: {
        customerId?: string;
        customerName: string;
        customerPhone: string;
        shippingAddress: string;
        items: { productId: string; quantity: number }[];
    }) => {
        const res = await fetch(`${API_URL}/api/public/spareparts/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, subdomain: storeSlug })
        });

        if (!res.ok) {
            const json = await res.json().catch(() => null);
            if (json?.error) {
                throw new Error(`${json.error}: ${json.product} (available: ${json.available}, requested: ${json.requested})`);
            }
            throw new Error('Checkout failed');
        }
        return await res.json();
    }
};
