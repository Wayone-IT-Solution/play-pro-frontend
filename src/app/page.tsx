import { Fetch } from "@/utils/Server";
import BannerSwiper from "@/components/common/Banner";
import SearchField from "@/components/home/SearchField";
import AuthGuard2 from "@/components/layout/AuthGuard2";
import NearByField from "@/components/home/NearByField";
import BlogSwiper from "@/components/common/BlogSwiper";
import Testimonials from "@/components/home/Testimonial";
import PlayProBanner from "@/components/home/PlayProBanner";
import HighRankingField from "@/components/home/HighRanking";
import StadiumBrowser from "@/components/home/StadiumBrowser";
import ProductsForYou from "@/components/home/ProductsForYou";
import RecommendedField from "@/components/home/RecommendedField";
import NextAvailableSlot from "@/components/home/NextAvailableSlot";
import Sponsor from "@/components/home/Sponsor";

export default async function Page() {
  const [
    bannerResponse,
    testimonialResponse,
    nextSlotResponse,
    cricketResponse,
    footballResponse,
    productResponse,
    blogResponse,
    sponsorResponse,
  ] = await Promise.all([
    Fetch("/api/banner/public"),
    Fetch("/api/testimonial/public"),
    Fetch("/api/ground/public"),
    Fetch("/api/ground/public?search=Cricket&searchkey=type.en"),
    Fetch("/api/ground/public?search=Football&searchkey=type.en"),
    Fetch("/api/product/public"),
    Fetch("/api/blog/public"),
    Fetch("/api/sponsor/public"),
  ]);
  // Destructure responses safely
  const blogs = blogResponse?.data?.result ?? [];
  const banners = bannerResponse?.data?.result ?? [];
  const crickets = cricketResponse?.data?.result ?? [];
  const products = productResponse?.data?.result ?? [];
  const football = footballResponse?.data?.result ?? [];
  const nextSlots = nextSlotResponse?.data?.result ?? [];
  const testimonials = testimonialResponse?.data?.result ?? [];
  const sponsors = sponsorResponse?.data?.result ?? [];
  console.log(nextSlots, football)
  return (
    <div className="w-screen lg:w-auto">
      <SearchField />
      <PlayProBanner />
      <AuthGuard2>
        <NearByField nextSlots={nextSlots} />
        <StadiumBrowser />
        {football?.length > 0 &&
          <NextAvailableSlot football={football} />
        }
        {crickets?.length > 0 &&
          <RecommendedField crickets={crickets} />
        }
        <HighRankingField nextSlots={nextSlots} />
        <ProductsForYou products={products} />
        <div className="mt-10 w-screen lg:w-auto max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <BannerSwiper banners={banners} />
        </div>
        <Testimonials testimonials={testimonials} />
        <Sponsor sponsor={sponsors} />
        <div className="mt-10 w-screen lg:w-auto max-w-7xl mx-auto px-4">
          <BlogSwiper blogs={blogs} />
        </div>
      </AuthGuard2>
    </div>
  );
}
