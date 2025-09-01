"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function JoinNearbyGame() {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");

  return (
    <div className="relative bg-[#E6ECEF] py-4 md:py-8 lg:py-20 overflow-hidden">
      {/* Background Vector */}
      <Image
        src="/assets/vector.png"
        alt="Background Shape"
        fill
        className="object-cover"
        priority
      />

      {/* Content */}
      <div className="relative z-10 px-3 md:px-6 lg:px-20">
        {/* Heading */}
        <div className="mb-4 md:mb-6 lg:mb-8 mt-2 md:mt-0 lg:-mt-10 text-center md:text-left">
          <h1 className="font-inter font-bold text-black text-2xl md:text-4xl lg:text-5xl leading-tight">
            Join Nearby Game
          </h1>
          <p className="mt-1 font-inter text-black text-lg md:text-xl lg:text-3xl font-normal">
            Skill-based Matchmaking
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl md:rounded-[50px] lg:rounded-[91px] px-4 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10 shadow-sm mx-auto max-w-6xl">
          {/* First Row */}
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 lg:gap-12">
            {/* Game Type */}
            <div className="w-full">
              <label className="block text-black mb-2 md:mb-3 font-medium text-sm md:text-base lg:text-lg">
                Select Game Type
              </label>
              <input
                type="text"
                placeholder="Example: 5v5, 7v7, 11v11"
                className="w-full h-12 md:h-14 lg:h-16 rounded-full px-4 md:px-6 text-gray-600 border border-gray-300 focus:outline-none focus:border-gray-400 text-sm md:text-base"
                style={{
                  boxShadow:
                    "0px 1px 6.5px 0px rgba(0,0,0,0.25) inset, 0px 4px 4px 0px rgba(0,0,0,0.02)",
                }}
              />
            </div>

            {/* Date & Time */}
            <div className="w-full">
              <label className="block text-black mb-2 md:mb-3 font-medium text-sm md:text-base lg:text-lg">
                Select Date & Time
              </label>
              <input
                type="datetime-local"
                className="w-full h-12 md:h-14 lg:h-16 rounded-full px-4 md:px-6 text-gray-600 border border-gray-300 focus:outline-none focus:border-gray-400 text-sm md:text-base"
                style={{
                  boxShadow:
                    "0px 1px 6.5px 0px rgba(0,0,0,0.25) inset, 0px 4px 4px 0px rgba(0,0,0,0.02)",
                }}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="mt-6 md:mt-8 lg:mt-10 space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 lg:gap-12">
            {/* Skill Level */}
            <div>
              <label className="block text-black mb-3 md:mb-4 lg:mb-5 font-medium text-sm md:text-base lg:text-lg">
                Select Skill Level
              </label>
              <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4">
                {["Beginner", "Intermediate", "Pro"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedSkill(level)}
                    className={`px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full font-medium transition duration-200 text-xs md:text-sm lg:text-base ${
                      selectedSkill === level
                        ? "bg-[#6D0E82] text-white border-[#6D0E82]"
                        : "text-[#6D0E82] bg-transparent border-[#6D0E82]"
                    }`}
                    style={{
                      border: "1px dashed #6D0E82",
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Court Type */}
            <div>
              <label className="block text-black mb-3 md:mb-4 lg:mb-5 font-medium text-sm md:text-base lg:text-lg">
                Select Court Type
              </label>
              <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4">
                {["Turf", "Grass", "Indoor"].map((court) => (
                  <button
                    key={court}
                    onClick={() => setSelectedCourt(court)}
                    className={`px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full font-medium transition duration-200 text-xs md:text-sm lg:text-base ${
                      selectedCourt === court
                        ? "bg-[#6D0E82] text-white border-[#6D0E82]"
                        : "text-[#6D0E82] bg-transparent border-[#6D0E82]"
                    }`}
                    style={{
                      border: "1px dashed #6D0E82",
                    }}
                  >
                    {court}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="text-center mt-6 md:mt-8 lg:mt-10">
            <button
              className="text-white font-bold py-2.5 md:py-3 px-6 md:px-8 lg:px-10 rounded-lg text-sm md:text-base lg:text-lg transition duration-200 hover:opacity-90"
              style={{
                backgroundColor: "#6D0E82",
                borderRadius: "11.15px",
                boxShadow:
                  "0px 3px 8.1px 2px rgba(255,255,255,0.7) inset, 0px 4px 4px 0px rgba(0,0,0,0.25)",
              }}
            >
              Find Match
            </button>
          </div>
        </div>
      </div>

      {/* Football Image - Hidden on very small screens, visible on larger */}
      <div className="absolute bottom-0 right-0 z-20 hidden sm:block">
        <div className="w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36">
          <Image
            src="/assets/boot.png"
            alt="Football"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
