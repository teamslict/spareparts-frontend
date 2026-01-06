import Link from 'next/link';
import { Package, CreditCard, Car, User, ChevronRight } from 'lucide-react';

// Demo account data
const recentOrders = [
    { id: 'ORD-001', date: '2024-01-05', total: 15000, status: 'Delivered', items: 3 },
    { id: 'ORD-002', date: '2024-01-02', total: 8500, status: 'Processing', items: 2 },
];

const savedVehicles = [
    { id: '1', make: 'Toyota', model: 'Vitz', year: 2015 },
    { id: '2', make: 'Nissan', model: 'March', year: 2018 },
];

export default function AccountPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Account</h1>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Sidebar */}
                    <aside className="md:col-span-1">
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User size={32} className="text-gray-500" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-800">John Doe</h2>
                                    <p className="text-sm text-gray-500">john@example.com</p>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                <Link href="/account" className="flex items-center justify-between px-4 py-3 bg-red-50 text-[#C8102E] rounded-lg font-medium">
                                    <span>Dashboard</span>
                                </Link>
                                <Link href="/account/orders" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                                    <span>Order History</span>
                                    <ChevronRight size={18} />
                                </Link>
                                <Link href="/account/credit" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                                    <span>Credit Balance</span>
                                    <ChevronRight size={18} />
                                </Link>
                                <Link href="/account/vehicles" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                                    <span>My Vehicles</span>
                                    <ChevronRight size={18} />
                                </Link>
                                <Link href="/account/profile" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                                    <span>Profile Settings</span>
                                    <ChevronRight size={18} />
                                </Link>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="md:col-span-2 space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg p-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Package size={24} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">12</p>
                                        <p className="text-sm text-gray-500">Total Orders</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CreditCard size={24} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">LKR 25,000</p>
                                        <p className="text-sm text-gray-500">Credit Available</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Car size={24} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">2</p>
                                        <p className="text-sm text-gray-500">Saved Vehicles</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
                                <Link href="/account/orders" className="text-sm text-[#C8102E] hover:underline">
                                    View All
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 font-medium text-gray-600">Order ID</th>
                                            <th className="text-left py-3 font-medium text-gray-600">Date</th>
                                            <th className="text-left py-3 font-medium text-gray-600">Items</th>
                                            <th className="text-left py-3 font-medium text-gray-600">Total</th>
                                            <th className="text-left py-3 font-medium text-gray-600">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} className="border-b last:border-b-0">
                                                <td className="py-3 font-medium text-[#C8102E]">{order.id}</td>
                                                <td className="py-3 text-gray-600">{order.date}</td>
                                                <td className="py-3 text-gray-600">{order.items} items</td>
                                                <td className="py-3 text-gray-800">LKR {order.total.toLocaleString()}</td>
                                                <td className="py-3">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Saved Vehicles */}
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-800">My Vehicles</h2>
                                <button className="text-sm text-[#C8102E] hover:underline">
                                    + Add Vehicle
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {savedVehicles.map((vehicle) => (
                                    <div key={vehicle.id} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                                        <Car size={32} className="text-gray-400" />
                                        <div>
                                            <p className="font-medium text-gray-800">{vehicle.make} {vehicle.model}</p>
                                            <p className="text-sm text-gray-500">{vehicle.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
