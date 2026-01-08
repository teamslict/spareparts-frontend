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
    <div className="flex flex-col gap-10 pb-12 bg-slate-50 min-h-screen text-slate-900">
      {/* Hero Section with Categories Sidebar */}
      <section className="pt-6 pb-2">
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

      {/* Dynamic Featured Categories - Replaces hardcoded sections */}
      <FeaturedCategorySections />

      {/* Promo Banners */}
      <div>
        <PromoBanners />
      </div>

      {/* Explicit Footer Spacer */}
      <div className="h-24 w-full" aria-hidden="true" />
    </div>
  );
}
