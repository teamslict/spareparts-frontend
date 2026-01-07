"use client";

import { useState } from 'react';
import { Search, Package, MapPin, Calendar, CheckCircle } from 'lucide-react';

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState<any>(null);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock tracking logic for demo
        setStatus({
            id: orderId,
            status: 'Processing',
            date: new Date().toLocaleDateString(),
            steps: [
                { title: 'Order Placed', completed: true, date: 'Today' },
                { title: 'Processing', completed: true, date: 'Today' },
                { title: 'Shipped', completed: false, date: 'Pending' },
                { title: 'Delivered', completed: false, date: 'Pending' },
            ]
        });
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <section className="bg-slate-900 text-white py-20">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">Track Your Order</h1>
                    <p className="text-xl text-slate-300 mb-8">
                        Enter your order number to check the latest status.
                    </p>

                    <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Order Number (e.g. ORD-12345)"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="flex-1 h-14 px-6 rounded-xl text-slate-900 border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                        <button type="submit" className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-600/30">
                            Track
                        </button>
                    </form>
                </div>
            </section>

            {status && (
                <div className="max-w-3xl mx-auto px-6 -mt-10">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                        <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                            <div>
                                <p className="text-sm text-slate-500 uppercase tracking-wider font-bold">Order ID</p>
                                <p className="text-2xl font-bold text-slate-900">{status.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-500 uppercase tracking-wider font-bold">Estimated Delivery</p>
                                <p className="text-lg font-medium text-slate-700">3-5 Business Days</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {status.steps.map((step: any, idx: number) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.completed ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-300'}`}>
                                            {step.completed ? <CheckCircle size={16} /> : <div className="w-2 h-2 bg-slate-200 rounded-full" />}
                                        </div>
                                        {idx !== status.steps.length - 1 && (
                                            <div className={`w-0.5 h-12 my-2 ${step.completed ? 'bg-blue-600' : 'bg-slate-200'}`} />
                                        )}
                                    </div>
                                    <div className={`pt-1 ${step.completed ? 'opacity-100' : 'opacity-50'}`}>
                                        <h4 className="font-bold text-slate-900">{step.title}</h4>
                                        <p className="text-sm text-slate-500">{step.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {!status && (
                <div className="max-w-3xl mx-auto px-6 mt-12 text-center text-slate-500">
                    <Package size={48} className="mx-auto text-slate-300 mb-4" />
                    <p>Enter your order ID above to see tracking details.</p>
                </div>
            )}
        </div>
    );
}
