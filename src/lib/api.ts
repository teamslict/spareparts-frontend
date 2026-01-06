
import { TenantConfig } from './tenant-context';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
    getProducts: async (subdomain: string, params: {
        category?: string;
        brand?: string;
        search?: string;
        page?: number;
        limit?: number;
    } = {}): Promise<ProductResponse> => {
        try {
            const query = new URLSearchParams({
                subdomain,
                page: (params.page || 1).toString(),
                limit: (params.limit || 20).toString()
            });

            if (params.category && params.category !== 'All') query.append('category', params.category);
            if (params.brand && params.brand !== 'All') query.append('brand', params.brand);
            if (params.search) query.append('search', params.search);

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
    getCategories: async (subdomain: string): Promise<Category[]> => {
        try {
            const res = await fetch(`${API_URL}/api/public/spareparts/categories?subdomain=${subdomain}`, {
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
    getBrands: async (subdomain: string): Promise<Brand[]> => {
        try {
            const res = await fetch(`${API_URL}/api/public/spareparts/brands?subdomain=${subdomain}`, {
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
    getProduct: async (subdomain: string, slug: string): Promise<Product | null> => {
        try {
            const res = await fetch(`${API_URL}/api/public/spareparts/products/${slug}?subdomain=${subdomain}`, {
                next: { revalidate: 60 }
            });
            if (!res.ok) return null;
            return await res.json();
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    }
};
