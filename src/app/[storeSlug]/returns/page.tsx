"use client";

import { useTenant } from '@/lib/tenant-context';
import { RefreshCcw, ShieldCheck, Clock } from 'lucide-react';

export default function ReturnsPage() {
    const { tenant } = useTenant();

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <section className="bg-slate-900 text-white py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Returns & Refunds</h1>
                    <p className="text-slate-400">Simple and transparent policies for your peace of mind.</p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6 -mt-8">
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">7 Days Return</h3>
                        <p className="text-sm text-slate-500">Return eligible items within 7 days of delivery</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <RefreshCcw size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Easy Process</h3>
                        <p className="text-sm text-slate-500">Hassle-free return initiation via support</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Full Refund</h3>
                        <p className="text-sm text-slate-500">Get your money back for defective items</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
                    <h2 className="text-slate-900">Return Eligibility</h2>
                    <p>
                        To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
                    </p>
                    <ul>
                        <li>Parts must not be installed or attempted to be installed.</li>
                        <li>Electrical parts are often non-returnable if the seal is broken.</li>
                        <li>Discounted or clearance items are final sale.</li>
                    </ul>

                    <h2 className="text-slate-900">Damages and Issues</h2>
                    <p>
                        Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
                    </p>

                    <h2 className="text-slate-900">Exchanges</h2>
                    <p>
                        The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
                    </p>

                    <h2 className="text-slate-900">Refunds</h2>
                    <p>
                        We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
                    </p>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-8 not-prose">
                        <h4 className="font-bold text-blue-900 mb-2">Need to start a return?</h4>
                        <p className="text-blue-700 mb-4">Contact our support team with your order number.</p>
                        <a href={`mailto:${tenant?.contactEmail}`} className="inline-block bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
