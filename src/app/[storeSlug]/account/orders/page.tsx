"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { api } from '@/lib/api';
import { Package, ChevronRight, Search, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Order {
    id: string;
    date: string;
    total: number;
    status: string;
    items: number;
    image: string;
}

export default function MyOrdersPage() {
    const { tenant } = useTenant();
    const router = useRouter();
    const storeSlug = tenant?.subdomain || 'demo';

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchOrders() {
            try {
                const token = localStorage.getItem('spareparts_token');
                if (!token) {
                    router.push(`/${storeSlug}/auth/login`);
                    return;
                }

                const data = await api.getOrders(storeSlug, token);
                setOrders(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load orders');
            } finally {
                setLoading(false);
            }
        }

        if (storeSlug) {
            fetchOrders();
        }
    }, [storeSlug, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href={`/${storeSlug}/account`} className="hover:text-red-600">Account</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-900">My Orders</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Filters */}
                    <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search order ID or product..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                            <Filter size={18} />
                            Filter Status
                        </button>
                    </div>

                    {/* Orders List */}
                    {orders.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package size={40} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                            <p className="text-gray-500 mb-6">Looks like you haven&apos;t placed any orders yet.</p>
                            <Link
                                href={`/${storeSlug}/products`}
                                className="inline-block px-6 py-3 bg-[#C8102E] text-white font-bold rounded-lg hover:bg-[#A60D24] transition-colors"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <div key={order.id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-gray-50 transition-colors group">
                                    <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                                        <img src={order.image} alt="Order" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-1">
                                            <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Ordered on {order.date} • {order.items} Items
                                        </p>
                                    </div>

                                    <div className="text-right min-w-[120px]">
                                        <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                        <p className="text-lg font-bold text-gray-900">LKR {order.total.toLocaleString()}</p>
                                    </div>

                                    <Link
                                        href={`/${storeSlug}/account/orders/${order.id}`}
                                        className="p-2 text-gray-400 hover:text-[#C8102E] hover:bg-[#C8102E]/5 rounded-lg transition-colors"
                                    >
                                        <ChevronRight size={24} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
