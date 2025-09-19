"use client";
import React from "react";
import AcademyCard, { Academy } from "./components/AcademyCard";
import { FiFilter } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";

const sampleAcademy: Academy = {
  id: "1",
  name: "Football Academy",
  description: "Nike shoes provide best comfort and confidence.",
  coach: "Anshu Jangra",
  timing: "09:00 am to 05:00 Pm",
  rating: 4.5,
  logo: "/assets/acadmy.png",
  primaryColor: "#8B5CF6",
  secondaryColor: "#7A237A",
};

const HomePage: React.FC = () => {
  const handleRegister = () => {
    console.log("Register clicked for academy:", sampleAcademy.name);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-12">
      <div className="container mx-auto px-12">
        {/* Header + Filter Row (as in image) */}
        <header className="flex items-center justify-between mt-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-1">
              <span className="text-[#932AAA]">Play</span>
              <span className="text-gray-500">Pro</span>
              <span className="text-black ml-1">Acadmy</span>
            </h1>
            <p className="text-black mt-1">Aliquam lacinia diam quis lacus euismod</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Filter Indicator */}
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-50">
                {/* Placeholder for status/counter icon */}
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                  <circle cx="9" cy="9" r="8" stroke="#8B5CF6" strokeWidth="2" />
                  {/* Optional: add a line/icon as in your design */}
                </svg>
              </span>
              <span className="text-gray-800 text-sm">0 Filter Active</span>
            </div>
            <button
              className="flex items-center gap-2 bg-[#932AAA] text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:opacity-90 transition"
            >
              <IoFilterOutline size={18} />
              Filter
            </button>
          </div>
        </header>

        {/* Left-Aligned Card */}
        <div className="flex justify-start">
          <div className="max-w-xs w-full">
            <AcademyCard academy={sampleAcademy} onRegister={handleRegister} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
