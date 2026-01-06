import { ProductCard, ProductCardProps } from '@/components/product/ProductCard';
import { ProductSidebar } from '@/components/product/ProductSidebar';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// Demo products for the listing page
const allProducts: ProductCardProps[] = [
    { id: '1', name: 'CHERY QQ RADIATER WATER TANK CAP', sku: 'CHE-078', price: null, image: '/images/products/radiator-cap.png', category: 'RADIATOR CAP', stockStatus: 'IN_STOCK', slug: 'chery-qq-radiater-water-tank-cap' },
    { id: '2', name: 'CHERY QQ FRONT BRAKE HOSE', sku: 'CHE-079', price: null, image: '/images/products/brake-hose.png', category: 'BRAKE PARTS', stockStatus: 'IN_STOCK', slug: 'chery-qq-front-brake-hose' },
    { id: '3', name: 'CHERY QQ OIL SEAL (20X35X5.5)', sku: 'CHE-080', price: null, image: '/images/products/oil-seal.png', category: 'SEALS', stockStatus: 'IN_STOCK', slug: 'chery-qq-oil-seal' },
    { id: '4', name: 'CRANK SENSOR 35MM WIRESQUARE SHOCKET/LH', sku: 'CHE-081', price: null, image: '/images/products/crank-sensor.png', category: 'SENSORS', stockStatus: 'IN_STOCK', slug: 'crank-sensor-35mm' },
    { id: '5', name: 'CRANK OIL SEAL 0.8 (58X74X10)', sku: 'CHE-082', price: null, image: '/images/products/crank-oil-seal.png', category: 'SEALS', stockStatus: 'IN_STOCK', slug: 'crank-oil-seal-08' },
    { id: '6', name: 'CHERY QQ ENGINE VALVE INLET', sku: 'CHE-100', price: null, image: '/images/products/engine-valve.png', category: 'ENGINE', stockStatus: 'IN_STOCK', rating: 5, slug: 'chery-qq-engine-valve-inlet' },
    { id: '7', name: 'CHERY QQ AIR FILTER', sku: 'CHE-201', price: null, image: '/images/products/air-filter.png', category: 'FILTERS', stockStatus: 'IN_STOCK', rating: 5, slug: 'chery-qq-air-filter' },
    { id: '8', name: 'OIL FILTER UNIVERSAL', sku: 'UNI-203', price: null, image: '/images/products/oil-filter.png', category: 'FILTERS', stockStatus: 'IN_STOCK', rating: 5, slug: 'oil-filter-universal' },
];

export default function ProductsPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b py-3">
                <div className="container-custom">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-[#C8102E]">HOME</Link>
                        <ChevronRight size={14} className="text-gray-400" />
                        <span className="text-gray-800 font-medium">ALL PRODUCTS</span>
                    </nav>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <ProductSidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">All Products</h1>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500">{allProducts.length} products</span>
                                <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                                    <option>Sort by: Latest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Name: A-Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {allProducts.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 mt-8">
                            <button className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100">
                                &lt;
                            </button>
                            <button className="w-10 h-10 bg-[#C8102E] text-white rounded">1</button>
                            <button className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100">2</button>
                            <button className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100">3</button>
                            <button className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100">
                                &gt;
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
