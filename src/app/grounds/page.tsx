import React from "react";
import { Fetch } from "@/utils/Server";
import Grounds from "./components/Grounds";
import Heading from "./components/Heading";
import Testimonial from "@/components/home/Testimonial";
import AuthGuard2 from "@/components/layout/AuthGuard2";

export default async function Page() {
  const testimonialResponse = await Fetch("/api/testimonial/public");
  const nextSLotResponse = await Fetch("/api/ground/public?page=1&limit=100000");

  const nextSlots = nextSLotResponse?.data?.result ?? [];
  const testimonials = testimonialResponse?.data?.result ?? [];

  const fields = nextSlots;

  return (
    <div className="bg-white relative">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
        {/* Grid Rows */}
        <AuthGuard2>
          <Heading />
          <div className="space-y-8 sm:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Grounds fields={fields} />
            </div>
          </div>
          <Testimonial testimonials={testimonials} />
        </AuthGuard2>
      </div>
    </div>
  );
}
