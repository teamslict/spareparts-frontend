"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Loader } from '@/components/ui/Loader';

// Complete tenant config matching SparePartsConfig from backend
export interface TenantConfig {
    tenantId: string;
    subdomain: string;

    // Branding
    storeName: string;
    tagline?: string;
    logoUrl?: string;
    faviconUrl?: string;
    primaryColor: string;
    secondaryColor?: string;

    // Hero Section (uploadable from backend)
    heroSlides?: {
        id: string;
        imageUrl: string;
        title: string;
        subtitle: string;
        buttonText: string;
        buttonLink: string;
    }[];

    // Contact Info (editable from backend)
    contactEmail?: string;
    contactPhone?: string;
    contactPhone2?: string;
    address?: string;
    whatsappNumber?: string;

    // Social
    facebookUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;

    // Store Settings
    currency: string;
    taxRate?: number;
    enableCredit?: boolean;
    creditTermDays?: number;

    // SEO
    metaTitle?: string;
    metaDescription?: string;

    // Benefits Bar (editable from backend)
    benefits?: {
        icon: string;
        title: string;
        description: string;
    }[];

    // Promo Banners (editable from backend)
    promoBanners?: {
        id: string;
        imageUrl: string;
        title: string;
        subtitle: string;
        link: string;
        bgColor: string;
    }[];

    // Featured Categories (editable from backend)
    featuredCategories?: {
        name: string;
        slug: string;
        imageUrl: string;
    }[];

    // Dynamic Pages Content (About, Contact, etc.)
    aboutUs?: {
        story?: string;
        mission?: string;
        vision?: string;
        stats?: { label: string; value: string; }[];
        values?: { title: string; desc: string; }[];
    };

    // Detailed Contact Info
    businessHours?: {
        weekday?: string;
        weekend?: string;
        text?: string;
    };
    mapUrl?: string; // Embed URL for Google Maps
}

interface TenantContextType {
    tenant: TenantConfig | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

// Default config for when API fails or is not available yet
const defaultTenant: TenantConfig = {
    tenantId: 'demo',
    subdomain: 'demo',
    storeName: 'Auto Parts Store',
    tagline: 'Quality Automotive Spare Parts',
    primaryColor: '#C8102E',
    secondaryColor: '#1E3A5F',
    contactPhone: '+94 77 123 4567',
    contactPhone2: '+94 76 666 7055',
    contactEmail: 'sales@spareparts.lk',
    whatsappNumber: '+94771234567',
    address: 'No. 123, Main Street, Colombo, Sri Lanka',
    currency: 'LKR',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
    enableCredit: true,
    creditTermDays: 30,

    // Default hero slides (will be replaced by backend data)
    heroSlides: [
        {
            id: '1',
            imageUrl: '', // Will use fallback
            title: 'Top Quality',
            subtitle: 'Aftermarket Turbocharger Specialist',
            buttonText: 'SHOPPING NOW',
            buttonLink: '/products',
        },
        {
            id: '2',
            imageUrl: '',
            title: 'Best Prices',
            subtitle: 'Engine Parts & Accessories',
            buttonText: 'SHOP NOW',
            buttonLink: '/category/engine-parts',
        },
    ],

    // Default benefits (editable from backend)
    benefits: [
        { icon: 'Truck', title: 'Shipping', description: 'For all orders' },
        { icon: 'MessageSquare', title: 'Quick Response', description: 'Reach us via phone, email, or live chat' },
        { icon: 'RefreshCw', title: '100% Money Back', description: '14 days for return' },
        { icon: 'Shield', title: 'Safe Payment', description: 'Safe shopping guarantee' },
    ],

    // Default promo banners
    promoBanners: [
        {
            id: '1',
            imageUrl: '',
            title: 'Car Audio',
            subtitle: 'Super Natural Sound',
            link: '/category/audio',
            bgColor: '#1E3A5F',
        },
        {
            id: '2',
            imageUrl: '',
            title: 'All - New',
            subtitle: 'Performance Parts',
            link: '/category/performance',
            bgColor: '#F5F5F5',
        },
    ],
};

const TenantContext = createContext<TenantContextType>({
    tenant: defaultTenant,
    loading: false,
    error: null,
    refetch: () => { },
});

export function TenantProvider({
    children,
    storeSlug
}: {
    children: ReactNode;
    storeSlug?: string;
}) {
    const [tenant, setTenant] = useState<TenantConfig>(defaultTenant);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTenant = async () => {
        try {
            setLoading(true);
            setError(null);

            // Determine subdomain/slug
            // If storeSlug is provided (Path-Based), use it.
            // If not provided (Root Domain), assume 'default' or process.env logic
            let slug = storeSlug || 'demo';

            // If strictly root path is visited, we use 'default' or a specific ENV
            if (!storeSlug) {
                slug = process.env.NEXT_PUBLIC_DEFAULT_TENANT || 'demo';
            }

            // Fetch tenant config from backend
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
            // Note: usage of 'subdomain' query param is legacy naming, backend treats it as the lookup key.
            const response = await fetch(`${apiUrl}/api/public/spareparts/config?subdomain=${slug}`, {
                next: { revalidate: 60 }, // Cache for 60 seconds
            });

            if (response.ok) {
                const data = await response.json();

                // Merge backend data with defaults
                setTenant({
                    ...defaultTenant,
                    tenantId: data.tenantId || defaultTenant.tenantId,
                    subdomain: data.subdomain || slug,
                    storeName: data.config?.storeName || defaultTenant.storeName,
                    tagline: data.config?.tagline || defaultTenant.tagline,
                    logoUrl: data.config?.logoUrl,
                    faviconUrl: data.config?.faviconUrl,
                    primaryColor: data.config?.primaryColor || defaultTenant.primaryColor,
                    secondaryColor: data.config?.secondaryColor || defaultTenant.secondaryColor,
                    contactEmail: data.config?.contactEmail || defaultTenant.contactEmail,
                    contactPhone: data.config?.contactPhone || defaultTenant.contactPhone,
                    contactPhone2: data.config?.contactPhone2 || defaultTenant.contactPhone2,
                    address: data.config?.address || defaultTenant.address,
                    whatsappNumber: data.config?.whatsappNumber || defaultTenant.whatsappNumber,
                    facebookUrl: data.config?.facebookUrl || defaultTenant.facebookUrl,
                    instagramUrl: data.config?.instagramUrl || defaultTenant.instagramUrl,
                    linkedinUrl: data.config?.linkedinUrl || defaultTenant.linkedinUrl,
                    currency: data.config?.currency || defaultTenant.currency,
                    taxRate: data.config?.taxRate,
                    enableCredit: data.config?.enableCredit ?? defaultTenant.enableCredit,
                    creditTermDays: data.config?.creditTermDays || defaultTenant.creditTermDays,
                    heroSlides: data.config?.heroSlides || defaultTenant.heroSlides,
                    benefits: data.config?.benefits || defaultTenant.benefits,
                    promoBanners: data.config?.promoBanners || defaultTenant.promoBanners,
                    featuredCategories: data.config?.featuredCategories || [],
                    metaTitle: data.config?.metaTitle,
                    metaDescription: data.config?.metaDescription,
                });
            } else {
                // API not available yet - use defaults
                console.warn('Tenant API not available, using defaults');
                setTenant(defaultTenant);
            }
        } catch (err) {
            console.warn('Failed to fetch tenant config, using defaults:', err);
            setTenant(defaultTenant);
            setError('Using default configuration');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTenant();
    }, [storeSlug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader />
            </div>
        );
    }

    return (
        <TenantContext.Provider value={{ tenant, loading, error, refetch: fetchTenant }}>
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    const context = useContext(TenantContext);
    if (!context) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
}
