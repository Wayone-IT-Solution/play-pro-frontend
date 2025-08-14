"use client";
import React from "react";
import Image from "next/image";
import Testimonials from "@/components/home/Testimonial";

const CyberHubDetail = () => {
  return (
    <div>
      <div className="bg-white px-4 md:px-8 lg:px-20 md:pt-10 mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Image */}
            <div className="flex-shrink-0 w-full lg:w-2/5">
              <div className="relative w-full h-full rounded-[48px] border-6 border-[#013F5E] overflow-hidden">
                <Image
                  src="/assets/ground.png"
                  alt="Cyber Hub Football Field"
                  width={500}
                  height={500}
                  className="object-cover w-full aspect-square lg:aspect-auto"
                />
              </div>
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
                    Cyber Hub
                  </h1>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#000000" }}
                    >
                      4.5 Rating
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    className="px-4 py-2 rounded-full border text-sm font-medium"
                    style={{
                      borderColor: "#013F5E",
                      color: "#013F5E",
                    }}
                  >
                    Distance: 3.5 km
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
                  Sohna Road, Gurugram...Sohna Road, Gurugram...
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
                A standard football (soccer) field, also known as a pitch, is a
                rectangular area defined by touchlines (longer sides) and goal
                lines (shorter sides). The length of the field can range from 90
                to 120 meters (100 to 130 yards), while the width can range from
                45 to 90 meters (50 to 100 yards). For international matches,
                FIFA recommends a length of 100–110 meters (110-120 yards) and a
                width of 64-75 meters (70-80 yards). A standard size often used
                is 105 meters
              </p>

              {/* Filter Options */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  className="px-4 py-2 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: "#013F5E" }}
                >
                  Turf
                </button>
                <button
                  className="px-4 py-2 rounded-full border text-sm font-medium"
                  style={{
                    borderColor: "#013F5E",
                    color: "#013F5E",
                  }}
                >
                  Grass
                </button>
                <button
                  className="px-4 py-2 rounded-full border text-sm font-medium"
                  style={{
                    borderColor: "#013F5E",
                    color: "#013F5E",
                  }}
                >
                  Indoor
                </button>
              </div>

              <div className="mb-6">
                <button
                  className="px-4 py-2 rounded-full border text-sm font-medium"
                  style={{
                    borderColor: "#013F5E",
                    color: "#013F5E",
                  }}
                >
                  130 yards
                </button>
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
                    Dhs 300/hr
                  </h3>

                  {/* Time Selection */}
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

                {/* Duration and Total */}
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
                      Dhs 600
                    </span>
                  </div>
                </div>

                {/* Pay Now Button */}
                <button
                  className="w-full py-4 rounded-full text-white font-medium text-lg"
                  style={{ backgroundColor: "#013F5E" }}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mb-16">
        <Image
          src="/assets/vector2.png"
          alt="Testimonials Background"
          fill
          className="object-cover z-0"
        />
        <div className="z-20">
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

export default CyberHubDetail;
