import { Fetch } from "@/utils/Server";
import SearchField from "@/components/home/SearchField";
import NearByField from "@/components/home/NearByField";
import Testimonials from "@/components/home/Testimonial";
import PlayProBanner from "@/components/home/PlayProBanner";
import HighRankingField from "@/components/home/HighRanking";
import StadiumBrowser from "@/components/home/StadiumBrowser";
import ProductsForYou from "@/components/home/ProductsForYou";
import RecommendedField from "@/components/home/RecommendedField";
import NextAvailableSlot from "@/components/home/NextAvailableSlot";

export default async function Page() {
  // Run requests in parallel for performance
  const [
    bannerResponse,
    testimonialResponse,
    nextSlotResponse,
    cricketResponse,
    footballResponse,
    productResponse,
  ] = await Promise.all([
    Fetch("/api/banner/public"),
    Fetch("/api/testimonial/public"),
    Fetch("/api/ground/public"),
    Fetch("/api/ground/public?type=Cricket"),
    Fetch("/api/ground/public?type=Football"),
    Fetch("/api/product/public"),
  ]);

  // Destructure responses safely
  const banners = bannerResponse?.data?.result ?? [];
  const crickets = cricketResponse?.data?.result ?? [];
  const products = productResponse?.data?.result ?? [];
  const football = footballResponse?.data?.result ?? [];
  const nextSlots = nextSlotResponse?.data?.result ?? [];
  const testimonials = testimonialResponse?.data?.result ?? [];

  return (
    <div>
      <SearchField />
      <PlayProBanner banners={banners} />

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
      <Testimonials testimonials={testimonials} />
    </div>
  );
}
