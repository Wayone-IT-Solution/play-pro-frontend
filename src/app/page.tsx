import { Fetch } from "@/utils/Server";
import CenterImagePage from "@/components/home/CenterImage";
import FieldsContainer from "@/components/home/FieldsContainer";
import FindMatch from "@/components/home/FindMatch";
import NextAvailableSlot from "@/components/home/NextAvailableSlot";
import PlayProBanner from "@/components/home/PlayProBanner";
import RecommendedField from "@/components/home/RecommendedField";
import Testimonials from "@/components/home/Testimonial";
import SlotSelection from "@/components/home/SlotSelection";

export default async function Page() {
  const bannerResponse = await Fetch("/api/banner/public");
  const testimonialResponse = await Fetch("/api/testimonial/public");
  const nextSLotResponse = await Fetch("/api/ground/public");
  const banners = bannerResponse?.data?.result ?? [];
  const testimonials = testimonialResponse?.data?.result ?? [];
  const nextSlots = nextSLotResponse?.data?.result ?? [];

  return (
    <div>
      <PlayProBanner banners={banners} />
      <FieldsContainer />
      <NextAvailableSlot nextSlots={nextSlots} />
      <FindMatch />
      <CenterImagePage />
      <RecommendedField nextSlots={nextSlots} />
      <CenterImagePage />
      {/* <ProductsForYou /> */}
      
      <Testimonials testimonials={testimonials} />
    </div>
  );
}
function Get(arg0: string) {
  throw new Error("Function not implemented.");
}
