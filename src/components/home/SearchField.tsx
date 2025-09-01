"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FieldSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedFieldType, setSelectedFieldType] = useState("");

  const handleSubmit = () => {
    console.log({
      searchTerm,
      selectedCity,
      selectedFieldType
    });
    // Add your search logic here
  };

  return (
    <div className="w-full flex justify-center items-center mt-20">
      <div className="flex items-center gap-4 px-4 py-2 bg-[#E6E7FC] rounded-full w-full max-w-4xl shadow-sm">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search For Fields"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none bg-white rounded-full px-6 py-3 text-gray-600 font-medium placeholder:font-normal placeholder:text-gray-400 border-none focus:ring-2 focus:ring-purple-200 transition-all"
          />
        </div>

        {/* City Dropdown */}
        <div className="relative">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-white rounded-full px-5 py-3 pr-10 text-gray-600 font-medium border-none outline-none min-w-[140px] appearance-none cursor-pointer focus:ring-2 focus:ring-purple-200 transition-all"
          >
            <option value="" disabled>
              Select City
            </option>
            <option value="delhi">Delhi</option>
            <option value="gurugram">Gurugram</option>
            <option value="noida">Noida</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
            <option value="pune">Pune</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Field Type Dropdown */}
        <div className="relative">
          <select
            value={selectedFieldType}
            onChange={(e) => setSelectedFieldType(e.target.value)}
            className="bg-white rounded-full px-5 py-3 pr-10 text-gray-600 font-medium border-none outline-none min-w-[130px] appearance-none cursor-pointer focus:ring-2 focus:ring-purple-200 transition-all"
          >
            <option value="" disabled>
              Field Type
            </option>
            <option value="football">Football</option>
            <option value="cricket">Cricket</option>
            <option value="tennis">Tennis</option>
            <option value="basketball">Basketball</option>
            <option value="badminton">Badminton</option>
            <option value="swimming">Swimming Pool</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Find Button */}
        <button
          onClick={handleSubmit}
          className="rounded-full px-8 py-3 font-semibold text-white text-base bg-[#6D0E82] hover:bg-[#5A0B6F] transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Find
        </button>
      </div>
    </div>
  );
}