import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Fetch } from "@/utils/Server";

export default async function Page() {
  const nextSLotResponse = await Fetch("/api/ground/public");
  console.log(nextSLotResponse);
  const nextSlots = nextSLotResponse?.data?.result ?? [];

  const fields = nextSlots;
  return (
    <div className="bg-white min-h-screen relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mt-8 sm:mt-16 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl xl:text-5xl font-inter font-bold text-gray-900 mb-2 leading-none">
            Next Available Slot
          </h1>
          <p className="text-gray-500 text-base sm:text-lg lg:text-2xl font-normal">
            Exclusive showcase of Fields
          </p>
        </div>

        {/* Grid Rows */}
        <div className="space-y-8 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field: any) => (
              <div key={field._id}>
                <Link
                  href={`/grounds/${field._id}`}
                  passHref
                  className="relative rounded-2xl border border-gray-200 p-1 overflow-hidden transition-shadow duration-300 bg-white h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[3/4]">
                    {field.images && field.images.length > 0 ? (
                      <Image
                        src={field.images[0]}
                        alt="Ground "
                        fill
                        unoptimized
                        className="object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-2xl text-gray-500 text-sm">
                        No Image
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-black/60 p-3 text-white">
                      <h3 className="text-base sm:text-lg font-semibold mb-1">
                        {field.name}
                      </h3>
                      <div className="flex items-center text-xs sm:text-sm text-gray-200">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                          className="mr-1 shrink-0"
                        >
                          <path d="M6 0C3.515 0 1.5 2.015 1.5 4.5c0 3.375 4.5 7.5 4.5 7.5s4.5-4.125 4.5-7.5C10.5 2.015 8.485 0 6 0zm0 6.75c-1.243 0-2.25-1.007-2.25-2.25S4.757 2.25 6 2.25s2.25 1.007 2.25 2.25S7.243 6.75 6 6.75z" />
                        </svg>
                        {field.address}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="bg-white p-3 sm:p-4 flex justify-between items-center">
                    <div className="text-xs sm:text-sm font-medium text-gray-700">
                      ₹{field.pricePerHour} / hour
                    </div>
                    <button
                      className="px-4 py-1.5 sm:px-6 sm:py-2 text-white font-medium rounded-lg text-xs sm:text-sm hover:opacity-90 transition-opacity"
                      style={{ background: "#013F5E" }}
                    >
                      Book Now
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
