"use client";

import { useTenant } from '@/lib/tenant-context';
import { Truck, MessageSquare, RefreshCw, Shield, LucideIcon } from 'lucide-react';

// Icon mapping for dynamic benefits from backend
const iconMap: Record<string, LucideIcon> = {
    Truck: Truck,
    MessageSquare: MessageSquare,
    RefreshCw: RefreshCw,
    Shield: Shield,
};

const defaultBenefits = [
    {
        icon: 'Truck',
        title: 'Shipping',
        description: 'For all orders',
    },
    {
        icon: 'MessageSquare',
        title: 'Quick Response',
        description: 'Reach us via phone, email, or live chat',
    },
    {
        icon: 'RefreshCw',
        title: '100% Money Back',
        description: '14 days for return',
    },
    {
        icon: 'Shield',
        title: 'Safe Payment',
        description: 'Safe shopping guarantee',
    },
];

export function BenefitsBar() {
    const { tenant } = useTenant();

    // Use benefits from tenant config or defaults
    const benefits = tenant?.benefits?.length ? tenant.benefits : defaultBenefits;

    return (
        <section className="bg-white py-8 border-b border-gray-100">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => {
                        const Icon = iconMap[benefit.icon] || Shield;

                        return (
                            <div key={index} className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${tenant?.primaryColor || '#C8102E'}15` }}
                                >
                                    <Icon
                                        size={24}
                                        style={{ color: tenant?.primaryColor || '#C8102E' }}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">{benefit.title}</h4>
                                    <p className="text-sm text-gray-500 line-clamp-2">{benefit.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
