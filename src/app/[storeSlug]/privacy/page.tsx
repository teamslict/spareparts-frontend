"use client";

import { useTenant } from '@/lib/tenant-context';

export default function PrivacyPage() {
    const { tenant } = useTenant();
    const storeName = tenant?.storeName || 'Slict';

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <section className="bg-slate-900 text-white py-12 md:py-16">
                <div className="container-custom text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">Values that drive us to protect you.</p>
                </div>
            </section>

            <div className="container-custom -mt-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
                    <h2 className="text-slate-900">1. Information We Collect</h2>
                    <p>
                        When you visit {storeName}, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.
                    </p>

                    <h2 className="text-slate-900">2. How We Use Your Information</h2>
                    <p>
                        We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
                    </p>

                    <h2 className="text-slate-900">3. Sharing Personal Information</h2>
                    <p>
                        We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example, we use Stripe to power our online store.
                    </p>

                    <h2 className="text-slate-900">4. Data Retention</h2>
                    <p>
                        When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                    </p>

                    <h2 className="text-slate-900">5. Changes</h2>
                    <p>
                        We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
                    </p>

                    <h2 className="text-slate-900">6. Contact</h2>
                    <p>
                        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at {tenant?.contactEmail || 'sales@slict.lk'}.
                    </p>
                </div>
            </div>
        </div>
    );
}
