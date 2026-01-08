// User and Account related types
export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    tier?: string;
    businessName?: string;
    createdAt?: string;
    [key: string]: unknown; // Allow additional properties
}

export interface Plan {
    id: string;
    name: string;
    price: number;
    interval: string;
    description: string;
    features: string[];
    isPopular?: boolean;
}

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
}

export interface Order {
    id: string;
    invoiceNumber: string;
    date: string;
    total: number;
    status: string;
    items: OrderItem[];
    image?: string;
}

export interface OrderStatus {
    id?: string;
    orderNumber: string;
    status: string;
    steps: OrderStep[];
}

export interface OrderStep {
    title: string;
    completed: boolean;
    date?: string;
}

export interface ProductDisplay {
    id: string;
    name: string;
    sku: string;
    slug: string;
    price: number | null;
    image?: string;
    stockStatus: string;
    rating?: number;
    category?: string;
}
