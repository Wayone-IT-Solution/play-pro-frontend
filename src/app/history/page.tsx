"use client";
import React from "react";
import Image from "next/image";

const bookings = [
  {
    id: 1,
    image: "/assets/ground.png",
    title: "Cyber Hub",
    rating: 4.5,
    location: "Sohna Road, Gurugram...Sohna Road, Gurugram...",
    turfType: "Turf",
    date: "08/11/2025",
    startTime: "11:30am",
    endTime: "01:30pm",
    distance: "3.5 km",
    price: "Dhs 600",
  },
  {
    id: 2,
    image: "/assets/ground.png",
    title: "Cyber Hub",
    rating: 4.5,
    location: "Sohna Road, Gurugram...Sohna Road, Gurugram...",
    turfType: "Turf",
    date: "08/11/2025",
    startTime: "11:30am",
    endTime: "01:30pm",
    distance: "3.5 km",
    price: "Dhs 600",
  },
  {
    id: 3,
    image: "/assets/ground.png",
    title: "Cyber Hub",
    rating: 4.5,
    location: "Sohna Road, Gurugram...Sohna Road, Gurugram...",
    turfType: "Turf",
    date: "08/11/2025",
    startTime: "11:30am",
    endTime: "01:30pm",
    distance: "3.5 km",
    price: "Dhs 600",
  },
];

const BookingHistory = () => {
  return (
    <div className="relative min-h-screen mb-20 flex flex-col justify-between">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/vector2.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex justify-center items-start px-4 sm:px-8 lg:px-20 pt-10 pb-10 mt-24 relative w-full">
        <div className="space-y-6 w-full">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white rounded-[24px] border-2 border-amber-100 w-full"
              style={{
                padding: "16px",
                boxShadow: "0px 0px 4px 0px #00000040",
              }}
            >
              {/* Left Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">
                <div
                  className="relative rounded-[16px] overflow-hidden w-full sm:w-[182px] sm:h-[182px]"
                  style={{
                    height: "auto",
                    minHeight: "182px",
                  }}
                >
                  <Image
                    src={booking.image}
                    alt={booking.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center w-full">
                  {/* Title & Rating */}
                  <div className="flex items-center flex-wrap gap-2">
                    <h2
                      className="font-bold"
                      style={{
                        fontFamily: "Inter",
                        fontSize: "20px",
                        color: "#000000",
                      }}
                    >
                      {booking.title}
                    </h2>
                    <span className="text-yellow-500">⭐</span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#000000" }}
                    >
                      {booking.rating} Rating
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
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
                      className="text-lg font-semibold truncate"
                      style={{ color: "#000000" }}
                    >
                      {booking.location}
                    </span>
                  </div>

                  {/* Turf Type */}
                  <div className="mt-3">
                    <button
                      className="px-10 py-2.5 rounded-full text-white text-xs font-medium"
                      style={{ backgroundColor: "#013F5E" }}
                    >
                      {booking.turfType}
                    </button>
                  </div>

                  {/* Date & Time */}
                  <div className="flex flex-wrap items-center gap-5">
                    <button className="px-4 py-2.5 rounded-full text-[#013F5E] tex t-sm font-medium">
                      {booking.date}
                    </button>
                    <button
                      className="px-4 py-2.5 rounded-full border text-xs font-medium"
                      style={{
                        borderColor: "#013F5E",
                        color: "#013F5E",
                      }}
                    >
                      {booking.startTime}
                    </button>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "#013F5E" }}
                    >
                      To
                    </span>
                    <button
                      className="px-4 py-2.5 rounded-full border text-sm font-medium"
                      style={{
                        borderColor: "#013F5E",
                        color: "#013F5E",
                      }}
                    >
                      {booking.endTime}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-start lg:items-end justify-between w-full lg:w-auto mt-4 lg:mt-0 gap-4 lg:gap-10">
                <div className="flex flex-wrap lg:flex-nowrap gap-3 w-full lg:w-auto justify-start lg:justify-end">
                  <button
                    className="px-4 py-2 rounded-full border text-sm font-medium flex-shrink-0"
                    style={{
                      borderColor: "#013F5E",
                      color: "#013F5E",
                    }}
                  >
                    Distance: {booking.distance}
                  </button>
                  <button
                    className="px-4 py-2 rounded-full text-white text-sm font-medium flex-shrink-0"
                    style={{ backgroundColor: "#013F5E" }}
                  >
                    See On Map
                  </button>
                </div>
                <div
                  className="text-lg font-medium lg:mt-2"
                  style={{ color: "#000000" }}
                >
                  Paid: {booking.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
