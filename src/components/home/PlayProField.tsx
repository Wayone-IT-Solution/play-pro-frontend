import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Fetch } from "@/utils/Server";

export default async function PlayProFields() {
  const nextSLotResponse = await Fetch("/api/ground/public");
  console.log(nextSLotResponse);
  const nextSlots = nextSLotResponse?.data?.result ?? [];

  const fields = nextSlots;

  const mockFields = [
    {
      _id: "1",
      name: "Cyber Hub",
      address: "Sohna Road, Gurugram",
      images: ["/assets/stadium.png"],
      distance: "3.5 km",
    },
    {
      _id: "2",
      name: "Cyber Hub",
      address: "Sohna Road, Gurugram",
      images: ["/assets/stadium.png"],
      distance: "3.5 km",
    },
    {
      _id: "3",
      name: "Cyber Hub",
      address: "Sohna Road, Gurugram",
      images: ["/assets/stadium.png"],
      distance: "3.5 km",
    },
    {
      _id: "4",
      name: "Cyber Hub",
      address: "Sohna Road, Gurugram",
      images: ["/assets/stadium.png"],
      distance: "3.5 km",
    },
    {
      _id: "5",
      name: "Cyber Hub",
      address: "Sohna Road, Gurugram",
      images: ["/assets/stadium.png"],
      distance: "3.5 km",
    },
    {
      _id: "6",
      name: "Cyber Hub",
      address: "Sohna Road, Gurugram",
      images: ["/assets/stadium.png"],
      distance: "3.5 km",
    },
  ];

  const displayFields = fields.length > 0 ? fields : mockFields;

  return (
    <div className="bg-white min-h-screen relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-inter font-bold text-black mb-3">
            PlayPro Fields
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-inter">
            Aliquam lacinia diam quis lacus euismod
          </p>
        </div>

        {/* Grid Layout */}
        <div className="space-y-8">
          {/* Two rows (3 cards each) */}
          {[0, 3].map((startIndex) => (
            <div
              key={startIndex}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayFields.slice(startIndex, startIndex + 3).map((field: any, index: any) => (
                <div key={field._id || index} className="group">
                  <Link href={`/grounds/${field._id}`} passHref className="block">
                    {/* Card Container */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      {/* Image */}
                      <div className="relative w-full h-[220px] sm:h-[360px]">
                        {field.images && field.images.length > 0 ? (
                          <Image
                            src={field.images[0]}
                            alt={field.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
                            No Image
                          </div>
                        )}

                        {/* 🔥 Unified Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-black/60 p-3 text-white">
                          <h3 className="text-white text-lg font-semibold font-inter mb-1">
                            {field.name}
                          </h3>
                          <div className="flex items-center text-white text-sm font-inter">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="currentColor"
                              className="mr-1"
                            >
                              <path d="M6 0C3.515 0 1.5 2.015 1.5 4.5c0 3.375 4.5 7.5 4.5 7.5s4.5-4.125 4.5-7.5C10.5 2.015 8.485 0 6 0zm0 6.75c-1.243 0-2.25-1.007-2.25-2.25S4.757 2.25 6 2.25s2.25 1.007 2.25 2.25S7.243 6.75 6 6.75z" />
                            </svg>
                            {field.address}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section */}
                      <div className="p-4 flex justify-between items-center">
                        <div className="text-sm font-medium text-gray-700 font-inter">
                          Distance: {field.distance || "3.5 km"}
                        </div>
                        <button
                          className="px-4 py-2 text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity font-inter"
                          style={{ backgroundColor: "#6D0E82" }}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8 sm:mt-12">
          <button
            className="px-8 py-3 text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity font-inter"
            style={{ backgroundColor: "#6D0E82" }}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}
