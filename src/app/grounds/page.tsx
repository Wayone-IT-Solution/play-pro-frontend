import React from "react";
import { Fetch } from "@/utils/Server";
import Grounds from "./components/Grounds";
import Testimonial from "@/components/home/Testimonial";

export default async function Page() {
  const testimonialResponse = await Fetch("/api/testimonial/public");
  const nextSLotResponse = await Fetch("/api/ground/public?page=1&limit=100000");

  const nextSlots = nextSLotResponse?.data?.result ?? [];
  const testimonials = testimonialResponse?.data?.result ?? [];

  const fields = nextSlots;

  return (
    <div className="bg-white relative">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mt-14 md:mt-16 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl xl:text-5xl font-inter font-bold mb-2 leading-none">
            <span className="text-[#932AAA]">Play</span>
            <span className="text-gray-900">Pro</span> Fields
          </h1>
          <p className="text-gray-500 text-base sm:text-lg lg:text-xl font-normal">
            Discover and book world-class sports fields tailored for every professional and enthusiast.
          </p>
        </div>

        {/* Grid Rows */}
        <div className="space-y-8 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Grounds fields={fields} />
          </div>
        </div>
        <Testimonial testimonials={testimonials} />
      </div>
    </div>
  );
}
