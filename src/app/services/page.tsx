import { Wrench, Truck, CreditCard, Search, Headphones, Shield } from 'lucide-react';
import { Section, Grid, Surface } from '@/components/ui';

const services = [
    {
        icon: Search,
        title: 'Part Finding Service',
        description: 'Can\'t find what you need? Our team will search our extensive network to locate the exact part for your vehicle.',
    },
    {
        icon: Truck,
        title: 'Island-wide Delivery',
        description: 'We deliver spare parts to any location in Sri Lanka. Fast and reliable shipping with tracking available.',
    },
    {
        icon: Wrench,
        title: 'Technical Support',
        description: 'Get expert advice on part compatibility, installation, and maintenance from our experienced team.',
    },
    {
        icon: CreditCard,
        title: 'Credit Facility',
        description: 'Registered customers can enjoy our credit facility, making it easier to manage your spare parts purchases.',
    },
    {
        icon: Headphones,
        title: 'Customer Support',
        description: 'Our dedicated customer service team is available to help you with orders, inquiries, and after-sales support.',
    },
    {
        icon: Shield,
        title: 'Quality Assurance',
        description: 'All our parts go through quality checks. We offer returns and replacements for any defective products.',
    },
];

export default function ServicesPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero */}
            <Section className="bg-[#1E3A5F] text-white py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Our Services</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        More than just parts – we offer complete solutions for your automotive needs
                    </p>
                </div>
            </Section>

            {/* Services Grid */}
            <Section>
                <Grid minWidth="300px" gap="lg">
                    {services.map((service, index) => (
                        <Surface key={index} className="hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                                <service.icon size={28} className="text-[#C8102E]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        </Surface>
                    ))}
                </Grid>
            </Section>

            {/* CTA */}
            <Section className="bg-[#C8102E] text-white">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Need Help Finding a Part?</h2>
                    <p className="text-lg mb-8 opacity-90">
                        Contact us and our team will help you find exactly what you need
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-white text-[#C8102E] font-semibold rounded hover:bg-gray-100 transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </Section>
        </div>
    );
}
