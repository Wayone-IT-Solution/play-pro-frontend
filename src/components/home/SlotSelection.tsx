"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function SportsBookingModal() {
  const [selectedSlot, setSelectedSlot] = useState("2 AM");

  const timeSlots = [
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
    "12 PM",
  ];

  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image
            src="/assets/slot.png"
            alt="Soccer ball and cleats on grass"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0  flex items-end">
            <div className="text-white p-6">
              <h2 className="text-xl font-semibold mb-2">
                PlayPro simplifies sports
              </h2>
              <p className="text-lg">for everyone</p>
              <div className="flex space-x-2 mt-4">
                <div className="w-6 h-1 bg-white rounded"></div>
                <div className="w-6 h-1 bg-white bg-opacity-50 rounded"></div>
                <div className="w-6 h-1 bg-white bg-opacity-50 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Booking Form */}
        <div
          className="md:w-1/2 p-6 relative"
          style={{ backgroundColor: "#F3F3F3" }}
        >
          {/* Close Button */}
          <button className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} className="text-gray-600" />
          </button>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Available Slot: 13-08-2025
            </h3>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedSlot === slot
                      ? "text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                  style={{
                    backgroundColor:
                      selectedSlot === slot ? "#6D54B5" : undefined,
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>

            {/* Bottom Section with Illustration and Button */}
            <div className="relative">
              {/* Illustration */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div
                  // className="w-32 h-32 rounded-full flex items-center justify-center"
                  // style={{ backgroundColor: "#E2DDF0" }}
                  >
                    <Image
                      src="/assets/ball.png"
                      alt="Sports illustration"
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Select Slot Button */}
              <button
                className="w-full py-4 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                style={{ backgroundColor: "#6D54B5" }}
              >
                Select Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
