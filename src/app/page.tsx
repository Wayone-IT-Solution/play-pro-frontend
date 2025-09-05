import { Fetch } from "@/utils/Server";
import CenterImagePage from "@/components/home/CenterImage";
import FieldsContainer from "@/components/home/FieldsContainer";
import FindMatch from "@/components/home/FindMatch";
import NextAvailableSlot from "@/components/home/NextAvailableSlot";
import PlayProBanner from "@/components/home/PlayProBanner";
import RecommendedField from "@/components/home/RecommendedField";
import Testimonials from "@/components/home/Testimonial";
import SlotSelection from "@/components/home/SlotSelection";
import StadiumBrowser from "@/components/home/StadiumBrowser";
import PlayProFields from "@/components/home/PlayProField";
import ProductsForYou from "@/components/home/ProductsForYou";

import SearchField from "@/components/home/SearchField";
import HighRankingField from "@/components/home/HighRanking";
import NearByField from "@/components/home/NearByField";

export default async function Page() {
  const bannerResponse = await Fetch("/api/banner/public");
  const testimonialResponse = await Fetch("/api/testimonial/public");
  const nextSLotResponse = await Fetch("/api/ground/public");
  const banners = bannerResponse?.data?.result ?? [];
  const testimonials = testimonialResponse?.data?.result ?? [];
  const nextSlots = nextSLotResponse?.data?.result ?? [];
  const productResponse = await Fetch("/api/product/public");
  const products = productResponse?.data?.result ?? [];

  return (
    <div>
      <SearchField />
      <PlayProBanner banners={banners} />
      {/* <FieldsContainer /> */}
      {/* <PlayProFields /> */}
      <NearByField nextSlots={nextSlots} />
      <StadiumBrowser />
      <NextAvailableSlot nextSlots={nextSlots} />
      {/* <FindMatch /> */}
      {/* <CenterImagePage /> */}
      <RecommendedField nextSlots={nextSlots} />
      <HighRankingField nextSlots={nextSlots} />
      {/* <CenterImagePage /> */}
      <ProductsForYou products={products} />

      <Testimonials testimonials={testimonials} />
    </div>
  );
}
