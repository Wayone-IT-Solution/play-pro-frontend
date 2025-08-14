import CenterImagePage from "@/components/home/CenterImage";
import FieldsContainer from "@/components/home/FieldsContainer";
import FindMatch from "@/components/home/FindMatch";
import NextAvailableSlot from "@/components/home/NextAvailableSlot";
import PlayProBanner from "@/components/home/PlayProBanner";
import ProductsForYou from "@/components/home/ProductsForYou";
import RecommendedField from "@/components/home/RecommendedField";
import Testimonials from "@/components/home/Testimonial";
import { Get as ApiGet } from "@/utils/Server";

export default async function Page() {
  // const bannerResponse = await Get("api/banner");
  // const banners = bannerResponse?.data?.result ?? [];

  return (
    <div>
      <PlayProBanner />
      <FieldsContainer />
      <NextAvailableSlot />
      <FindMatch />
      <CenterImagePage />
      <RecommendedField />
      <CenterImagePage />
      <ProductsForYou />
      <Testimonials />
    </div>
  );
}
function Get(arg0: string) {
  throw new Error("Function not implemented.");
}
