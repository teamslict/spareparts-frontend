// Tenant Context Types
export interface TenantSettings {
    contactEmail?: string;
    contactPhone?: string;
    address?: string;
    whatsappNumber?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
    aboutUs?: Record<string, unknown>;
    services?: Record<string, unknown>;
    businessHours?: Record<string, unknown>;
    mapUrl?: string;
    promoBanners?: Banner[];
    heroSlides?: HeroSlide[];
    featuredCategories?: FeaturedCategory[];
    benefits?: Benefit[];
}

export interface HeroSlide {
    id: string;
    imageUrl: string;
    title: string;
    subtitle: string;
    buttonText?: string;
    buttonLink?: string;
}

export interface Banner {
    id: string;
    imageUrl: string;
    title: string;
    subtitle?: string;
    link: string;
    bgColor?: string;
    size?: 'small' | 'medium' | 'large';
}

export interface FeaturedCategory {
    id?: string;
    name: string;
    slug: string;
    imageUrl?: string;
}

export interface Benefit {
    icon: string;
    title: string;
    description: string;
}

export interface Tenant {
    id: string;
    subdomain: string;
    name: string;
    logo?: string;
    primaryColor: string;
    companyName: string;
    currency?: string;
    heroSlides?: HeroSlide[];
    promoBanners?: Banner[];
    featuredCategories?: FeaturedCategory[];
    benefits?: Benefit[];
    contactEmail?: string;
    contactPhone?: string;
    address?: string;
    whatsappNumber?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
}
