'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { api } from '@/lib/api';
import { ChevronRight, Check, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/lib/error-utils';
import type { Plan, User } from '@/types/models';

export default function PlansPage() {
    const { tenant } = useTenant();
    const router = useRouter();
    const storeSlug = tenant?.subdomain || 'demo';

    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [processing, setProcessing] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('spareparts_user');
        const token = localStorage.getItem('spareparts_token');

        if (!storedUser || !token) {
            router.push(`/${storeSlug}/auth/login`);
            return;
        }

        setUser(JSON.parse(storedUser));

        api.getPlans(storeSlug)
            .then(setPlans)
            .catch(err => console.error("Failed to fetch plans", err))
            .finally(() => setLoading(false));

        // Also refresh profile to get current tier
        api.getProfile(storeSlug, token)
            .then(data => setUser((prev) => (prev ? { ...prev, ...data as Partial<User> } : data as User)));

    }, [storeSlug, router]);

    const handleUpgrade = async (planId: string) => {
        if (!confirm(`Are you sure you want to upgrade to the ${planId} plan?`)) return;

        const token = localStorage.getItem('spareparts_token');
        if (!token) return;

        setProcessing(planId);
        try {
            const res = await api.upgradeSubscription(storeSlug, token, planId);
            alert(res.message);
            // Update local user
            if (res.customer) {
                const newUser = { ...user, ...res.customer };
                localStorage.setItem('spareparts_user', JSON.stringify(newUser));
                setUser(newUser);
            }
        } catch (error: unknown) {
            alert(getErrorMessage(error));
        } finally {
            setProcessing(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href={`/${storeSlug}/account`} className="hover:text-red-600">Account</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-900">Subscription Plans</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Upgrade Your Membership</h1>
                    <p className="text-gray-500 mt-2">Unlock exclusive discounts and priority support.</p>
                </div>
            </div>

            <div className="container-custom py-12">
                {loading ? (
                    <div className="text-center py-12">Loading plans...</div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan) => {
                            const isCurrent = user?.tier?.toLowerCase() === plan.id;
                            const isPopular = plan.isPopular;

                            return (
                                <div
                                    key={plan.id}
                                    className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isCurrent ? 'border-green-500 shadow-lg' :
                                        isPopular ? 'border-[#C8102E] shadow-md' : 'border-gray-100 shadow-sm'
                                        }`}
                                >
                                    {isPopular && (
                                        <div className="absolute top-0 right-0 bg-[#C8102E] text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
                                            MOST POPULAR
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline mb-4">
                                        <span className="text-3xl font-bold">LKR {plan.price}</span>
                                        <span className="text-gray-500 ml-1">/{plan.interval}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                                    <button
                                        onClick={() => !isCurrent && handleUpgrade(plan.id)}
                                        disabled={isCurrent || processing === plan.id}
                                        className={`w-full py-3 rounded-xl font-bold mb-8 transition-colors ${isCurrent
                                            ? 'bg-green-100 text-green-700 cursor-default'
                                            : isPopular
                                                ? 'bg-[#C8102E] text-white hover:bg-[#A60D24]'
                                                : 'bg-gray-900 text-white hover:bg-gray-800'
                                            }`}
                                    >
                                        {processing === plan.id ? 'Processing...' : isCurrent ? 'Current Plan' : 'Upgrade Now'}
                                    </button>

                                    <ul className="space-y-4">
                                        {plan.features.map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                                <div className="mt-0.5 min-w-[20px]">
                                                    <Check size={16} className="text-green-500" />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
