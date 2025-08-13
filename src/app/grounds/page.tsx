"use client";
import React from "react";
import Image from "next/image";

const Ground = () => {
  const fields = [
    {
      id: 1,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/stadium.png",
      alt: "Stadium field",
    },
    {
      id: 2,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf.png",
      alt: "Outdoor sports field",
    },
    {
      id: 3,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf2.png",
      alt: "Indoor sports court",
    },
    {
      id: 4,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/stadium.png",
      alt: "Stadium field",
    },
    {
      id: 5,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf.png",
      alt: "Outdoor sports field",
    },
    {
      id: 6,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf2.png",
      alt: "Indoor sports court",
    },
    {
      id: 7,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/stadium.png",
      alt: "Stadium field",
    },
    {
      id: 8,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf.png",
      alt: "Outdoor sports field",
    },
    {
      id: 9,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf2.png",
      alt: "Indoor sports court",
    },
    {
      id: 10,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/stadium.png",
      alt: "Stadium field",
    },
    {
      id: 11,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf.png",
      alt: "Outdoor sports field",
    },
    {
      id: 12,
      name: "Cyber Hub",
      location: "8 Sohna Road, Gurugram...",
      distance: "3.5 km",
      image: "/assets/turf2.png",
      alt: "Indoor sports court",
    },
  ];

  return (
    <div className="bg-white min-h-screen relative">
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mt-16 mb-8">
          <h1 className="text-3xl font-inter font-bold text-gray-900 mb-2 leading-none">
            Next Available Slot
          </h1>
          <p className="text-gray-500 text-lg font-normal">
            Exclusive showcase of Fields
          </p>
        </div>

        {/* Grid Rows */}
        <div className="space-y-8 px-16">
          <div className="grid grid-cols-3 gap-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="relative rounded-2xl border border-gray-200 p-1 overflow-hidden transition-shadow duration-300 bg-white"
              >
                {/* Field Image */}
                <div className="relative h-96 w-full">
                  <Image
                    src={field.image}
                    alt={field.alt}
                    fill
                    className="object-cover rounded-2xl"
                  />

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-black/60 p-4 text-white">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {field.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-200">
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
                <div className="bg-white p-4 flex justify-between items-center">
                  <div className="text-sm font-medium text-gray-700">
                    Distance: {field.distance}
                  </div>
                  <button
                    className="px-6 py-2 text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
                    style={{ background: "#013F5E" }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ground;
