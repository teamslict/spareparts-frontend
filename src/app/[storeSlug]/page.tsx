import { CategorySidebar } from '@/components/home/CategorySidebar';
import { HeroSlider } from '@/components/home/HeroSlider';
import { BenefitsBar } from '@/components/home/BenefitsBar';
import { ProductsSection } from '@/components/home/ProductsSection';
import { BrandCategories } from '@/components/home/BrandCategories';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedCategorySections } from '@/components/home/FeaturedCategorySections';
import { PromoBanners } from '@/components/home/PromoBanners';

export default function HomePage({ params }: { params?: { storeSlug: string } }) {
  return (
    <div className="flex flex-col pb-8 bg-slate-50 min-h-screen text-slate-900">
      {/* Hero Section with Categories Sidebar */}
      <section className="pt-6 pb-4">
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
      <div className="py-4">
        <BenefitsBar />
      </div>

      {/* Visual Category Grid */}
      <div className="py-6">
        <CategoryGrid />
      </div>

      {/* Products Section */}
      <div className="py-6">
        <ProductsSection />
      </div>

      {/* Brand Categories */}
      <div className="py-6">
        <BrandCategories />
      </div>

      {/* Dynamic Featured Categories */}
      <FeaturedCategorySections />

      {/* Promo Banners */}
      <div className="py-6">
        <PromoBanners />
      </div>
    </div>
  );
}
