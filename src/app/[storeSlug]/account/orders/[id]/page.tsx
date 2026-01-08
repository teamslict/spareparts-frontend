"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { ChevronLeft, Package, MapPin, Truck, CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface OrderDetail {
    id: string;
    date: string;
    status: string;
    subtotal: number;
    tax: number;
    total: number;
    shippingAddress: string;
    paymentMethod: string;
    items: OrderItem[];
}

export default function OrderDetailsPage() {
    const { tenant } = useTenant();
    const params = useParams();
    const storeSlug = tenant?.subdomain || 'demo';
    const orderId = params.id as string;

    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem('spareparts_token');
                if (!token) return; // Handle redirect if needed

                const data = await api.getOrder(storeSlug, orderId, token);
                setOrder(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (storeSlug && orderId) {
            fetchOrder();
        }
    }, [storeSlug, orderId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-8">
                    <Link
                        href={`/${storeSlug}/account/orders`}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ChevronLeft size={16} />
                        Back to Orders
                    </Link>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold text-gray-900">Order {order.id}</h1>
                        <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 font-bold">
                            {order.status}
                        </span>
                    </div>
                    <p className="text-gray-500 mt-2">Placed on {order.date}</p>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Order Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                    <Package size={20} className="text-gray-400" />
                                    Items in Order
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {order.items.map((item) => (
                                    <div key={item.id} className="p-6 flex gap-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">LKR {(item.price * item.quantity).toLocaleString()}</p>
                                            <p className="text-xs text-gray-500">LKR {item.price.toLocaleString()} each</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Timeline / Status (Mock) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                                <Truck size={20} className="text-gray-400" />
                                Delivery Status
                            </h2>
                            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                                {[
                                    { status: 'Order Delivered', date: 'Oct 24, 02:30 PM', completed: true },
                                    { status: 'Out for Delivery', date: 'Oct 24, 08:15 AM', completed: true },
                                    { status: 'Shipped', date: 'Oct 23, 05:45 PM', completed: true },
                                    { status: 'Order Confirmed', date: 'Oct 22, 10:20 AM', completed: true },
                                ].map((step, i) => (
                                    <div key={i} className="relative pl-10">
                                        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${step.completed ? 'bg-green-100 border-green-500 text-green-600' : 'bg-gray-50 border-gray-300 text-gray-300'
                                            }`}>
                                            <CheckCircle size={14} fill={step.completed ? "currentColor" : "none"} />
                                        </div>
                                        <h4 className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.status}</h4>
                                        <p className="text-xs text-gray-500">{step.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary & Address */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>LKR {order.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>LKR {order.tax.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between font-bold text-lg text-gray-900">
                                    <span>Total</span>
                                    <span>LKR {order.total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin size={20} className="text-gray-400" />
                                Shipping Details
                            </h2>
                            <div>
                                <h4 className="font-semibold text-gray-900">Delivery Address</h4>
                                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                    {order.shippingAddress}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
