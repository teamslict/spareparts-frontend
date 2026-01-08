"use client";

import { useTenant } from '@/lib/tenant-context';
import { Truck, MessageSquare, RefreshCw, Shield, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    Truck, MessageSquare, RefreshCw, Shield,
};

const defaultBenefits = [
    { icon: 'Truck', title: 'Free Shipping', description: 'Island-wide delivery' },
    { icon: 'Shield', title: 'Quality Guarantee', description: 'Original & aftermarket' },
    { icon: 'RefreshCw', title: 'Easy Returns', description: '14 days return policy' },
    { icon: 'MessageSquare', title: '24/7 Support', description: 'Chat or call us' },
];

/**
 * BenefitsBar - Pure content component
 * Does NOT include its own Container or background
 * Parent Section decides layout and styling
 */
export function BenefitsBar() {
    const { tenant } = useTenant();
    const benefits = tenant?.benefits?.length ? tenant.benefits : defaultBenefits;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {benefits.map((benefit, index) => {
                const Icon = iconMap[benefit.icon] || Shield;

                return (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                            <Icon size={22} className="text-red-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                                {benefit.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {benefit.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}