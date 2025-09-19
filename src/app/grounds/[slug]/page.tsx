import { Fetch } from "@/utils/Server";
import GroundBooking from "../components/GroundBooking";
import Testimonials from "@/components/home/Testimonial";

export default async function GroundBookingPage(ctx: any) {
  const { slug } = await ctx.params;

  const groundResponse = await Fetch(`/api/ground/public/${slug}`);
  const groundData = groundResponse?.data ?? {};

  const testimonialResponse = await Fetch("/api/testimonial/public");
  const testimonials = testimonialResponse?.data?.result ?? [];
  return (
    <div className="space-y-6">
      <GroundBooking groundData={groundData} />
      <div className="mb-6">
        <Testimonials testimonials={testimonials} />
      </div>
    </div>
  );
}
