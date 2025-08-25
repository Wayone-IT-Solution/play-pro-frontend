import React from "react";
import Image from "next/image";
import Testimonials from "@/components/home/Testimonial";
import { Fetch } from "@/utils/Server";
import GroundImageSwiper from "../GroundImageSwiper";
import PayModal from "../components/PayModal";

export default async function Page({ params }: { params: any }) {
  const { slug } = await params;
  const groundResponse = await Fetch(`/api/ground/public/${slug}`);
  const groundData = groundResponse?.data ?? {};
  console.log(groundData);
  const testimonialResponse = await Fetch("/api/testimonial/public");
  const testimonials = testimonialResponse?.data?.result ?? [];

  return (
    <div>
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-20 md:pt-10 mt-24">
          <div className="flex flex-col lg:flex-row w-full gap-8">
            {/* Left side - Image */}
            <div className="w-full lg:w-2/5">
              <GroundImageSwiper
                images={groundData.images}
                name={groundData.name}
              />
            </div>

            {/* Right side - Content */}
            <div className="flex-1 lg:pl-4 w-full lg:w-3/5">
              {/* Header */}
              <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h1
                    className="text-4xl font-bold"
                    style={{
                      fontFamily: "Inter",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                    }}
                  >
                    {groundData.name}
                  </h1>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#000000" }}
                    >
                      {/* Placeholder rating until backend provides it */}
                      4.5 Rating
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  {/* Distance placeholder */}
                  <button
                    className="px-4 py-2 rounded-full border text-sm font-medium"
                    style={{
                      borderColor: "#013F5E",
                      color: "#013F5E",
                    }}
                  >
                    Distance: -- km
                  </button>
                  <button
                    className="px-4 py-2 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: "#013F5E" }}
                  >
                    See On Map
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 12 12"
                  fill="#000000"
                  className="flex-shrink-0"
                >
                  <path d="M6 0C3.515 0 1.5 2.015 1.5 4.5c0 3.375 4.5 7.5 4.5 7.5s4.5-4.125 4.5-7.5C10.5 2.015 8.485 0 6 0zm0 6.75c-1.243 0-2.25-1.007-2.25-2.25S4.757 2.25 6 2.25s2.25 1.007 2.25 2.25S7.243 6.75 6 6.75z" />
                </svg>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#000000" }}
                >
                  {groundData.address}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{
                  color: "#000000",
                  lineHeight: "1.5",
                }}
              >
                {groundData.description}
              </p>

              {/* Facilities */}
              <div className="flex flex-wrap gap-3 mb-6">
                {groundData.facilities?.map((facility: string, i: number) => (
                  <button
                    key={i}
                    className="px-4 py-2 rounded-full border text-sm font-medium"
                    style={{
                      borderColor: "#013F5E",
                      color: "#013F5E",
                    }}
                  >
                    {facility}
                  </button>
                ))}
              </div>

              {/* Pricing */}
              <div className="mb-6 border-t-2 border-gray-300 border-dashed w-full pt-4">
                <div className="flex flex-wrap justify-between items-center">
                  <h3
                    className="text-3xl font-semibold mb-4"
                    style={{
                      fontFamily: "Poppins",
                    }}
                  >
                    SAR{groundData.pricePerHour}/hr
                  </h3>

                  {/* Example: static time selection until API provides slots */}
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      className="px-4 py-2 rounded-full border text-sm font-medium"
                      style={{
                        borderColor: "#013F5E",
                        color: "#013F5E",
                      }}
                    >
                      08/11/2025
                    </button>
                    <button
                      className="px-4 py-2 rounded-full border text-sm font-medium"
                      style={{
                        borderColor: "#013F5E",
                        color: "#013F5E",
                      }}
                    >
                      11:30am
                    </button>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#013F5E" }}
                    >
                      To
                    </span>
                    <button
                      className="px-4 py-2 rounded-full border text-sm font-medium"
                      style={{
                        borderColor: "#013F5E",
                        color: "#013F5E",
                      }}
                    >
                      01:30pm
                    </button>
                  </div>
                </div>

                {/* Duration & Total - static until calculation logic is added */}
                <div
                  className="border-2 border-dashed rounded-4xl p-4 mb-6"
                  style={{ borderColor: "#013F5E" }}
                >
                  <div className="flex justify-between gap-4 items-center">
                    <span
                      className="text-sm whitespace-nowrap font-medium"
                      style={{ color: "#013F5E" }}
                    >
                      2 Hours
                    </span>
                    <span className="border-t-2 border-[#013F5E] border-dashed w-full"></span>
                    <span
                      className="text-sm whitespace-nowrap font-medium"
                      style={{ color: "#013F5E" }}
                    >
                      SAR{groundData.pricePerHour * 2}
                    </span>
                  </div>
                </div>
                <PayModal ground={groundData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative mb-16">
        <Image
          src="/assets/vector2.png"
          alt="Testimonials Background"
          fill
          className="object-cover z-0"
        />
        <div className="z-20">
          <Testimonials testimonials={testimonials} />
        </div>
      </div>
    </div>
  );
}
