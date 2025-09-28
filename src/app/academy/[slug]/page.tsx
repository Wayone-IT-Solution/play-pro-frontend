import { Fetch } from "@/utils/Server";
import Testimonials from "@/components/home/Testimonial";
import AcademyBookingClient from "../components/AcademyBooking";

export default async function GroundBookingPage(ctx: any) {
  const { slug } = await ctx.params;
  const academyResponse = await Fetch(`/api/academy/public/${slug}`);
  const academyData = academyResponse?.data ?? {};

  const testimonialResponse = await Fetch("/api/testimonial/public");
  const testimonials = testimonialResponse?.data?.result ?? [];
  return (
    <div className="space-y-6">
      <AcademyBookingClient academyData={academyData} />
      <div className="mb-6">
        <Testimonials testimonials={testimonials} />
      </div>
    </div>
  );
}
