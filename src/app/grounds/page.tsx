"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Ground = () => {
  const fields = [
    {
      id: 1,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/stadium.png",
      alt: "Stadium field",
    },
    {
      id: 2,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf.png",
      alt: "Outdoor sports field",
    },
    {
      id: 3,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf2.png",
      alt: "Indoor sports court",
    },
    {
      id: 4,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/stadium.png",
      alt: "Stadium field",
    },
    {
      id: 5,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf.png",
      alt: "Outdoor sports field",
    },
    {
      id: 6,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf2.png",
      alt: "Indoor sports court",
    },
    {
      id: 7,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/stadium.png",
      alt: "Stadium field",
    },
    {
      id: 8,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf.png",
      alt: "Outdoor sports field",
    },
    {
      id: 9,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf2.png",
      alt: "Indoor sports court",
    },
    {
      id: 10,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/stadium.png",
      alt: "Stadium field",
    },
    {
      id: 11,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf.png",
      alt: "Outdoor sports field",
    },
    {
      id: 12,
      name: "Cyber Hub",
      slug: "/grounds/cyber-hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf2.png",
      alt: "Indoor sports court",
    },
  ];

  return (
    <div className="bg-white min-h-screen relative mt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mt-8 sm:mt-16 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-inter font-bold text-gray-900 mb-2 leading-none">
            Next Available Slot
          </h1>
          <p className="text-gray-500 text-base sm:text-lg font-normal">
            Exclusive showcase of Fields
          </p>
        </div>

        {/* Grid Rows */}
        <div className="space-y-8 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field) => (
              <Link key={field.id} href={field.slug} passHref>
                <div className="relative rounded-2xl border border-gray-200 p-1 overflow-hidden transition-shadow duration-300 bg-white">
                  {/* Field Image */}
                  <div className="relative h-60 sm:h-72 md:h-80 lg:h-96 w-full">
                    <Image
                      src={field.image}
                      alt={field.alt}
                      fill
                      className="object-cover rounded-2xl"
                    />

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-black/60 p-3 sm:p-4 text-white">
                      <h3 className="text-base sm:text-lg font-semibold mb-1">
                        {field.name}
                      </h3>
                      <div className="flex items-center text-xs sm:text-sm text-gray-200">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                          className="mr-1"
                        >
                          <path d="M6 0C3.515 0 1.5 2.015 1.5 4.5c0 3.375 4.5 7.5 4.5 7.5s4.5-4.125 4.5-7.5C10.5 2.015 8.485 0 6 0zm0 6.75c-1.243 0-2.25-1.007-2.25-2.25S4.757 2.25 6 2.25s2.25 1.007 2.25 2.25S7.243 6.75 6 6.75z" />
                        </svg>
                        {field.location}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="bg-white p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="text-sm font-medium text-gray-700">
                      Distance: {field.distance}
                    </div>
                    <button
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
                      style={{ background: "#013F5E" }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ground;
