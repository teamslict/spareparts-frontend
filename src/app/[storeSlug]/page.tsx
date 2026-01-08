import { CategorySidebar } from '@/components/home/CategorySidebar';
import { HeroSlider } from '@/components/home/HeroSlider';
import { BenefitsBar } from '@/components/home/BenefitsBar';
import { ProductsSection } from '@/components/home/ProductsSection';
import { BrandCategories } from '@/components/home/BrandCategories';
import { CategorySection } from '@/components/home/CategorySection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { PromoBanners } from '@/components/home/PromoBanners';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

// Demo products
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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">

      {/* Hero Section */}
      <section className="pt-6 pb-6">
        <Container>
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Categories Sidebar */}
            <div className="hidden lg:block lg:w-72 flex-shrink-0">
              <CategorySidebar />
            </div>

            {/* Hero Slider */}
            <div className="flex-1 min-w-0">
              <HeroSlider />
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Bar */}
      <Section variant="narrow" className="border-y border-gray-200 bg-white">
        <BenefitsBar />
      </Section>

      {/* Visual Category Grid */}
      <Section>
        <CategoryGrid />
      </Section>

      {/* Products Section */}
      <Section className="bg-white">
        <ProductsSection />
      </Section>

      {/* Brand Categories */}
      <Section className="bg-white">
        <BrandCategories />
      </Section>

      {/* Category Sections */}
      <Section className="bg-white">
        <CategorySection
          title="Engine Parts"
          highlightWord="Parts"
          products={engineParts}
        />
      </Section>

      <Section>
        <CategorySection
          title="Filter Parts"
          highlightWord="Parts"
          products={filterParts}
        />
      </Section>

      {/* Promo Banners */}
      <Section variant="narrow">
        <PromoBanners />
      </Section>
    </div>
  );
}
