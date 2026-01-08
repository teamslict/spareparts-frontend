"use client";

import Link from 'next/link';
import { Package, CreditCard, Car, User, ChevronRight, Settings, LogOut, Heart, MapPin, Bell } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
    const { tenant } = useTenant();
    const router = useRouter();
    const storeSlug = tenant?.subdomain || 'demo';

    // Mock User Data (Replace with real auth later)
    const user = {
        name: "Alex Fernando",
        email: "alex@example.com",
        tier: "Gold Member",
        avatar: "https://ui-avatars.com/api/?name=Alex+Fernando&background=random"
    };

    // Mock Recent Orders
    const recentOrders = [
        { id: 'ORD-8392', date: 'Oct 24, 2025', total: 45000, status: 'Delivered', items: 4, image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=200" },
        { id: 'ORD-8391', date: 'Oct 10, 2025', total: 12500, status: 'Processing', items: 2, image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=200" },
    ];

    const stats = [
        { label: "Total Orders", value: "24", icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Credit Limit", value: "LKR 100k", icon: CreditCard, color: "text-green-600", bg: "bg-green-50" },
        { label: "Saved Vehicles", value: "3", icon: Car, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Wishlist", value: "12", icon: Heart, color: "text-pink-600", bg: "bg-pink-50" },
    ];

    const handleLogout = () => {
        localStorage.removeItem('spareparts_token');
        localStorage.removeItem('spareparts_user');
        router.push(`/${storeSlug}/auth/login`);
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header / Hero Section */}
            <div className="relative bg-[#1a1b1e] text-white pb-32 pt-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C8102E]/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="container-custom relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-[#C8102E] rounded-full text-white shadow-lg hover:bg-[#A60D24] transition-colors">
                                <Settings size={14} />
                            </button>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <p className="text-gray-400">{user.email}</p>
                            <div className="flex items-center gap-2 mt-3 justify-center md:justify-start">
                                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold uppercase tracking-wider shadow-lg">
                                    {user.tier}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs">
                                    Member since 2023
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

                        {/* Promo Card */}
                        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#1a1b1e] rounded-2xl p-6 text-white overflow-hidden relative">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2">Upgrade to Platinum</h3>
                                <p className="text-white/70 text-sm mb-4">Get 5% extra discount on all bulk orders.</p>
                                <button className="w-full py-2 bg-white text-[#1E3A5F] rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                                    View Plans
                                </button>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                        </div>
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
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-gray-50/50 transition-colors group">
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                                                <img src={order.image} alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{order.id}</p>
                                                <p className="text-sm text-gray-500">{order.items} items • {order.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 ml-auto">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="text-right min-w-[100px]">
                                            <p className="font-bold text-gray-900">LKR {order.total.toLocaleString()}</p>
                                        </div>
                                        <button className="p-2 text-gray-400 hover:text-[#C8102E] hover:bg-[#C8102E]/5 rounded-lg transition-colors">
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                ))}
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
                                    <button className="px-4 py-2 bg-white text-[#C8102E] rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                                        Register Now
                                    </button>
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
                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
                                        View Addresses
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
