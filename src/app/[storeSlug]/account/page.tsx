"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, CreditCard, Car, User as UserIcon, ChevronRight, Settings, LogOut, Heart, MapPin, Bell } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { User, Order } from '@/types/models';

export default function AccountPage() {
    const { tenant } = useTenant();
    const router = useRouter();
    const storeSlug = tenant?.subdomain || 'demo';

    const [user, setUser] = useState<User | null>(null);
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const [vehiclesCount, setVehiclesCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('spareparts_user');
        const token = localStorage.getItem('spareparts_token');

        if (!storedUser || !token) {
            router.push(`/${storeSlug}/auth/login`);
            return;
        }

        // Use async IIFE to avoid synchronous setState
        (async () => {
            const initialUser = JSON.parse(storedUser);

            try {
                // Fetch latest profile to get tier
                const data = await api.getProfile(storeSlug, token);
                const updatedUser = { ...initialUser, ...data };
                setUser(updatedUser as User);
                localStorage.setItem('spareparts_user', JSON.stringify(updatedUser));
            } catch (err) {
                console.error("Failed to fetch profile", err);
                // Fall back to stored user
                setUser(initialUser as User);
            }
        })();

        // Fetch recent orders
        api.getOrders(storeSlug, token)
            .then(data => {
                setRecentOrders(data.slice(0, 3)); // Only show last 3
            })
            .catch(err => console.error(err));

        // Fetch vehicles count
        api.getVehicles(storeSlug, token)
            .then(data => setVehiclesCount(data.length))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));

    }, [storeSlug, router]);

    const stats = [
        { label: "Total Orders", value: recentOrders.length.toString(), icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Current Tier", value: user?.tier || 'Standard', icon: CreditCard, color: "text-green-600", bg: "bg-green-50" },
        { label: "Saved Vehicles", value: vehiclesCount.toString(), icon: Car, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Wishlist", value: "0", icon: Heart, color: "text-pink-600", bg: "bg-pink-50" },
    ];

    const handleLogout = () => {
        localStorage.removeItem('spareparts_token');
        localStorage.removeItem('spareparts_user');
        router.push(`/${storeSlug}/auth/login`);
    };

    if (loading) return null; // Or a skeleton

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header / Hero Section */}
            <div className="relative bg-[#1a1b1e] text-white pb-32 pt-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C8102E]/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="container-custom relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl flex items-center justify-center bg-gray-800 text-3xl font-bold">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <Link href={`/${storeSlug}/account/profile`} className="absolute bottom-0 right-0 p-2 bg-[#C8102E] rounded-full text-white shadow-lg hover:bg-[#A60D24] transition-colors">
                                <Settings size={14} />
                            </Link>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold">{user?.name}</h1>
                            <p className="text-gray-400">{user?.email}</p>
                            <div className="flex items-center gap-2 mt-3 justify-center md:justify-start">
                                <span className={`px-3 py-1 rounded-full text-black text-xs font-bold uppercase tracking-wider shadow-lg ${user?.tier === 'Platinum' ? 'bg-gradient-to-r from-slate-200 to-slate-400' :
                                    user?.tier === 'Gold' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                        'bg-gray-200 text-gray-700'
                                    }`}>
                                    {user?.tier || 'Standard'} Member
                                </span>
                                <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs">
                                    Member since {new Date(user?.createdAt || '2024-01-01').getFullYear()}
                                </span>
                            </div>
                        </div>
                        <div className="ml-auto flex gap-3">
                            <button onClick={handleLogout} className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom -mt-24 relative z-20 pb-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden">
                            <nav className="space-y-1">
                                {[
                                    { label: 'Overview', href: `/${storeSlug}/account`, icon: Package, active: true },
                                    { label: 'My Orders', href: `/${storeSlug}/account/orders`, icon: Package, active: false },
                                    { label: 'Garage', href: `/${storeSlug}/account/vehicles`, icon: Car, active: false },
                                    { label: 'Wishlist', href: `/${storeSlug}/account/wishlist`, icon: Heart, active: false },
                                    { label: 'Addresses', href: `/${storeSlug}/account/addresses`, icon: MapPin, active: false },
                                    { label: 'Settings', href: `/${storeSlug}/account/profile`, icon: Settings, active: false },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${item.active
                                            ? 'bg-[#C8102E]/5 text-[#C8102E] font-medium'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={18} className={item.active ? 'text-[#C8102E]' : 'text-gray-400 group-hover:text-gray-600'} />
                                            <span>{item.label}</span>
                                        </div>
                                        {item.active && <ChevronRight size={16} />}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Promo Card - Only show if not Platinum */}
                        {user?.tier !== 'Platinum' && (
                            <div className="bg-gradient-to-br from-[#1E3A5F] to-[#1a1b1e] rounded-2xl p-6 text-white overflow-hidden relative">
                                <div className="relative z-10">
                                    <h3 className="font-bold text-lg mb-2">Upgrade to Platinum</h3>
                                    <p className="text-white/70 text-sm mb-4">Get 5% extra discount on all bulk orders.</p>
                                    <Link href={`/${storeSlug}/account/plans`} className="block w-full py-2 bg-white text-[#1E3A5F] rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors text-center">
                                        View Plans
                                    </Link>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                            </div>
                        )}
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat) => (
                                <div key={stat.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                                        <stat.icon size={20} className={stat.color} />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recent Orders Section */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                                    <p className="text-sm text-gray-500">Track and manage your purchases</p>
                                </div>
                                <Link href={`/${storeSlug}/account/orders`} className="text-sm font-medium text-[#C8102E] hover:text-[#A60D24] flex items-center gap-1">
                                    View All <ChevronRight size={16} />
                                </Link>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {recentOrders.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        No recent orders found.
                                    </div>
                                ) : (
                                    recentOrders.map((order) => (
                                        <div key={order.id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-gray-50/50 transition-colors group">
                                            <div className="flex items-center gap-4 w-full md:w-auto">
                                                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                                                    <img src={order.image} alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{order.id}</p>
                                                    <p className="text-sm text-gray-500">{order.items?.length || 0} items • {order.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 ml-auto">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="text-right min-w-[100px]">
                                                <p className="font-bold text-gray-900">LKR {Number(order.total).toLocaleString()}</p>
                                            </div>
                                            <Link href={`/${storeSlug}/account/orders/${order.id}`} className="p-2 text-gray-400 hover:text-[#C8102E] hover:bg-[#C8102E]/5 rounded-lg transition-colors">
                                                <ChevronRight size={20} />
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Quick Actions Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-[#C8102E] to-[#A60D24] rounded-2xl p-6 text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                                        <Car size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">Add New Vehicle</h3>
                                    <p className="text-white/80 text-sm mb-4">Register your car for compatible parts.</p>
                                    <Link href={`/${storeSlug}/account/vehicles/add`} className="px-4 py-2 bg-white text-[#C8102E] rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors inline-block">
                                        Register Now
                                    </Link>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] group-hover:bg-white/20 transition-colors" />
                            </div>

                            <div className="bg-white border border-gray-100 rounded-2xl p-6 relative overflow-hidden group hover:border-gray-200 transition-colors">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                                        <MapPin size={24} className="text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-1 text-gray-900">Manage Addresses</h3>
                                    <p className="text-gray-500 text-sm mb-4">Update shipping locations for faster checkout.</p>
                                    <Link href={`/${storeSlug}/account/addresses`} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors inline-block">
                                        View Addresses
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
