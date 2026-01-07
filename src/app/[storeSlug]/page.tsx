import { CategorySidebar } from '@/components/home/CategorySidebar';
import { HeroSlider } from '@/components/home/HeroSlider';
import { BenefitsBar } from '@/components/home/BenefitsBar';
import { ProductsSection } from '@/components/home/ProductsSection';
import { BrandCategories } from '@/components/home/BrandCategories';
import { CategorySection } from '@/components/home/CategorySection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { PromoBanners } from '@/components/home/PromoBanners';

// Demo products with empty images to use fallback SVGs
const engineParts = [
  { id: 'e1', name: 'CHERY QQ ENGINE VALVE INLET', sku: 'CHE-100', price: null, image: '', stockStatus: 'IN_STOCK' as const, rating: 5, slug: 'chery-qq-engine-valve-inlet' },
  { id: 'e2', name: 'CHERY QQ ENGINE VALVE EXHAUST', sku: 'CHE-101', price: null, image: '', stockStatus: 'IN_STOCK' as const, rating: 5, slug: 'chery-qq-engine-valve-exhaust' },
  { id: 'e3', name: 'CHERY QQ ENGINE COVER METAL', sku: 'CHE-102', price: null, image: '', stockStatus: 'IN_STOCK' as const, rating: 5, slug: 'chery-qq-engine-cover-metal' },
  { id: 'e4', name: 'ENGINE GASKET SET COMPLETE', sku: 'CHE-103', price: null, image: '', stockStatus: 'IN_STOCK' as const, rating: 5, slug: 'engine-gasket-set' },
];

const filterParts = [
  { id: 'f1', name: 'Toyota AC-102LX (Cabin Filter - EX Type)', sku: 'TOY-200', price: null, image: '', stockStatus: 'IN_STOCK' as const, rating: 5, slug: 'toyota-cabin-filter' },
  { id: 'f2', name: 'CHERY QQ AIR FILTER', sku: 'CHE-201', price: null, image: '', stockStatus: 'IN_STOCK' as const, rating: 5, slug: 'chery-qq-air-filter' },
  { id: 'f3', name: 'CHERY QQ DRI BOTTLE (AC FILTER)', sku: 'CHE-202', price: null, image: '', stockStatus: 'IN_STOCK' as const, rating: 5, slug: 'chery-qq-dri-bottle' },
  { id: 'f4', name: 'OIL FILTER UNIVERSAL', sku: 'UNI-203', price: null, image: '', stockStatus: 'IN_STOCK' as const, rating: 5, slug: 'oil-filter-universal' },
];

export default function HomePage({ params }: { params?: { storeSlug: string } }) {
  return (
    <div className="flex flex-col gap-10 pb-12 bg-gray-50/50">
      {/* Hero Section with Categories Sidebar */}
      <section className="bg-white pt-6 pb-2 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Categories Sidebar - Hidden on mobile, visible on lg */}
            <div className="hidden lg:block lg:w-72 flex-shrink-0">
              <CategorySidebar />
            </div>

            {/* Hero Slider - Takes remaining width */}
            <div className="flex-1 min-w-0">
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <BenefitsBar />

      {/* Visual Category Grid */}
      <CategoryGrid />

      {/* Products Section */}
      <ProductsSection />

      {/* Brand Categories */}
      <BrandCategories />

      {/* Vertical Stack for Category Sections */}
      <div className="flex flex-col gap-8">
        {/* Engine Parts */}
        <CategorySection
          title="Engine Parts"
          highlightWord="Parts"
          products={engineParts}
        />

        {/* Filter Parts */}
        <CategorySection
          title="Filter Parts"
          highlightWord="Parts"
          products={filterParts}
        />
      </div>

      {/* Promo Banners */}
      <div>
        <PromoBanners />
      </div>

      {/* Explicit Footer Spacer */}
      <div className="h-24 w-full" aria-hidden="true" />
    </div>
  );
}
