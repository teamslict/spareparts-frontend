"use client";

import { useTenant } from '@/lib/tenant-context';

export default function TermsPage() {
    const { tenant } = useTenant();
    const storeName = tenant?.storeName || 'Slict';

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <section className="bg-slate-900 text-white py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
                    <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6 -mt-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
                    <h2 className="text-slate-900">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and placing an order with {storeName}, you confirm that you are in agreement with and bound by the terms of service contained in the Terms & Conditions outlined below. These terms apply to the entire website and any email or other type of communication between you and {storeName}.
                    </p>

                    <h2 className="text-slate-900">2. Products and Services</h2>
                    <p>
                        We strive to ensure that the colors, designs, and styles of our products are as accurately as possible to the photos displayed on our website. However, we cannot guarantee that your computer monitor&apos;s display of any color will be accurate.
                    </p>

                    <h2 className="text-slate-900">3. Pricing and Availability</h2>
                    <p>
                        All prices are subject to change without notice. We reserve the right to limit quantities or discontinue products at any time. In the event a product is listed at an incorrect price due to typographical error, we reserve the right to refuse or cancel any orders placed for the product listed at the incorrect price.
                    </p>

                    <h2 className="text-slate-900">4. Shipping and Delivery</h2>
                    <p>
                        Delivery times are estimates and start from the date of shipping, rather than the date of order. Delivery times are to be used as a guide only and are subject to the acceptance and approval of your order.
                    </p>

                    <h2 className="text-slate-900">5. Returns and Refunds</h2>
                    <p>
                        We want you to be completely satisfied with your purchase. If you are not satisfied with your purchase, please review our Return Policy for detailed information on how to return your products.
                    </p>

                    <h2 className="text-slate-900">6. Limitation of Liability</h2>
                    <p>
                        In no event shall {storeName} be liable for any direct, indirect, special, incidental, or consequential damages arising out of the use or inability to use the materials on this site.
                    </p>

                    <h2 className="text-slate-900">7. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms & Conditions, please contact us at:<br />
                        <strong>Email:</strong> {tenant?.contactEmail || 'sales@slict.lk'}<br />
                        <strong>Phone:</strong> {tenant?.contactPhone || '+94 77 123 4567'}
                    </p>
                </div>
            </div>
        </div>
    );
}
