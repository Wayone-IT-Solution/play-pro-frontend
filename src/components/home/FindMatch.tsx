"use client";

import React, { useState } from "react";
import Image from "next/image";
// import footballImg from "@/public/assets/football.png"; // Replace with your path
// import bgVector from "@/public/assets/vector.png"; // Replace with your path

export default function JoinNearbyGame() {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");

  return (
    <div className="relative min-h-screen bg-[#E6ECEF] py-20 overflow-hidden">
      {/* Background Vector */}
      <Image
        src="/assets/vector.png"
        alt="Background Shape"
        fill
        className="object-cover"
        priority
      />

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-20">
        {/* Heading */}
        <div className="mb-8 -mt-10">
          <h1
            className="font-inter font-bold text-black"
            style={{
              fontSize: "49px",
              lineHeight: "100%",
            }}
          >
            Join Nearby Game
          </h1>
          <p
            className="mt-1 font-inter text-black"
            style={{
              fontSize: "29px",
              fontWeight: 400,
              lineHeight: "100%",
            }}
          >
            Skill-based Matchmaking
          </p>
        </div>

        {/* Form Container */}
        <div
          className="bg-white rounded-[91px] px-12 py-10 shadow-sm mx-auto"
          style={{
            maxWidth: "1380px",
            boxShadow: "0px 4px 4px #00000005",
          }}
        >
          {/* First Row */}
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Game Type */}
            <div className="max-w-[400px] w-full">
              <label className="block text-black mb-3 font-medium text-lg">
                Select Game Type
              </label>
              <input
                type="text"
                placeholder="Example: 5v5, 7v7, 11v11"
                className="w-full h-[64px] rounded-[68px] px-6 text-gray-600 border border-[#bebebe] focus:outline-none"
                style={{
                  boxShadow:
                    "0px 1px 6.5px 0px #00000040 inset, 0px 4px 4px 0px #00000005",
                }}
              />
            </div>

            {/* Date & Time */}
            <div className="max-w-[400px] w-full">
              <label className="block text-black mb-3 font-medium text-lg">
                Select Date & Time
              </label>
              <input
                type="datetime-local"
                className="w-full h-[64px] rounded-[68px] px-6 text-gray-600 border border-[#bebebe] focus:outline-none"
                style={{
                  boxShadow:
                    "0px 1px 6.5px 0px #00000040 inset, 0px 4px 4px 0px #00000005",
                }}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
            {/* Skill Level */}
            <div>
              <label className="block text-black mb-5 font-medium text-lg">
                Select Skill Level
              </label>
              <div className="flex flex-wrap gap-4">
                {["Beginner", "Intermediate", "Pro"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedSkill(level)}
                    className={`px-6 py-3 rounded-full font-medium transition ${
                      selectedSkill === level
                        ? "bg-[#013F5E] text-white"
                        : "text-[#013F5E] bg-transparent"
                    }`}
                    style={{
                      border: "1px dashed #013F5E",
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Court Type */}
            <div>
              <label className="block text-black mb-5 font-medium text-lg">
                Select Court Type
              </label>
              <div className="flex flex-wrap gap-4">
                {["Turf", "Grass", "Indoor"].map((court) => (
                  <button
                    key={court}
                    onClick={() => setSelectedCourt(court)}
                    className={`px-6 py-3 rounded-full font-medium transition ${
                      selectedCourt === court
                        ? "bg-[#013F5E] text-white"
                        : "text-[#013F5E] bg-transparent"
                    }`}
                    style={{
                      border: "1px dashed #013F5E",
                    }}
                  >
                    {court}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="text-center mt-10">
            <button
              className="text-white font-bold py-3 px-10 rounded-lg text-lg"
              style={{
                backgroundColor: "#013F5E",
                borderRadius: "11.15px",
                boxShadow:
                  "0px 3px 8.1px 2px #FFFFFFB2 inset, 0px 4px 4px 0px #00000040",
              }}
            >
              Find Match
            </button>
          </div>
        </div>
      </div>

      {/* Football Image */}
      <div className="absolute bottom-0 right-0 z-20">
        <Image
          src="/assets/boot.png"
          alt="Football"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
    </div>
  );
}
