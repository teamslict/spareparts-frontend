"use client";

import { useTenant } from '@/lib/tenant-context';
import { Truck, Globe, Clock, AlertCircle } from 'lucide-react';

export default function ShippingPage() {
    const { tenant } = useTenant();

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <section className="bg-slate-900 text-white py-12 md:py-16">
                <div className="container-custom text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Shipping Information</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">Fast, reliable, and secure delivery to your doorstep.</p>
                </div>
            </section>

            <div className="container-custom -mt-8">
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Truck size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Island-wide</h3>
                        <p className="text-sm text-slate-500">We deliver to all districts in Sri Lanka</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">24-48 Hours</h3>
                        <p className="text-sm text-slate-500">Typical delivery time for Colombo area</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Globe size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Live Tracking</h3>
                        <p className="text-sm text-slate-500">Monitor your package status anytime</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
                    <h2 className="text-slate-900">Delivery Methods</h2>
                    <p>
                        We partner with leading courier services to ensure your parts arrive safely. Depending on your location and the size of the item, we use:
                    </p>
                    <ul>
                        <li><strong>Standard Courier:</strong> For most spare parts and accessories (1-3 business days).</li>
                        <li><strong>Heavy Transport:</strong> For engines, gearboxes, and body panels (2-5 business days).</li>
                        <li><strong>Express Delivery:</strong> Same-day delivery available within Colombo city limits for urgent orders.</li>
                    </ul>

                    <h2 className="text-slate-900">Shipping Costs</h2>
                    <p>
                        Shipping costs are calculated based on the weight of your order and the delivery location. You can view the exact shipping cost at checkout before completing your purchase.
                    </p>
                    <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg not-prose border border-yellow-100">
                        <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-bold text-yellow-800 text-sm">Oversized Items</h4>
                            <p className="text-yellow-700 text-sm">Some heavy items may require store pickup or special transport arrangements. Our team will contact you if this applies.</p>
                        </div>
                    </div>

                    <h2 className="text-slate-900">Order Processing</h2>
                    <p>
                        Orders placed before 2:00 PM are typically processed and handed over to the courier on the same day. Orders placed on weekends or holidays will be processed on the next business day.
                    </p>
                </div>
            </div>
        </div>
    );
}
