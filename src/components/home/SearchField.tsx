"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Fetch } from "@/utils/axios";
import Link from "next/link";

export default function FieldSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedFieldType, setSelectedFieldType] = useState("");

  const [addressOptions, setAddressOptions] = useState<string[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const [filteredGrounds, setFilteredGrounds] = useState<any[]>([]);

  // Fetch filter options (cities + field types)
  useEffect(() => {
    async function fetchFilters() {
      try {
        const res: any = await Fetch("/api/ground/filter");
        if (res?.success) {
          setAddressOptions(res?.data?.addresses || []);
          setTypeOptions(res?.data?.types || []);
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    }
    fetchFilters();
  }, []);

  // Fetch grounds based on filters
  const fetchFilteredGrounds = async () => {
    try {
      const query: any = {
        ...(searchTerm && { name: searchTerm.trim() }),
        ...(selectedCity && { address: selectedCity.trim() }),
        ...(selectedFieldType && { type: selectedFieldType.trim() }),
      };
      const res: any = await Fetch("/api/ground/filterGround", query);

      if (res?.success) {
        setFilteredGrounds(res.data || []);
      } else {
        setFilteredGrounds([]);
      }
    } catch (error) {
      console.error("Error fetching filtered grounds:", error);
      setFilteredGrounds([]);
    }
  };

  const handleSubmit = () => {
    fetchFilteredGrounds();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mt-24">
      {/* Search bar */}
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
            <option value="">Select City</option>
            {addressOptions.map((address) => (
              <option key={address} value={address}>
                {address.charAt(0).toUpperCase() + address.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Field Type Dropdown */}
        <div className="relative">
          <select
            value={selectedFieldType}
            onChange={(e) => setSelectedFieldType(e.target.value)}
            className="bg-white rounded-full px-5 py-3 pr-10 text-gray-600 font-medium border-none outline-none min-w-[130px] appearance-none cursor-pointer focus:ring-2 focus:ring-purple-200 transition-all"
          >
            <option value="">Field Type</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Find Button */}
        <button
          onClick={handleSubmit}
          className="rounded-full px-8 py-3 font-semibold text-white text-base bg-[#6D0E82] hover:bg-[#5A0B6F] transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Find
        </button>
      </div>

      {/* Filtered Grounds List */}
      <div className="mt-8 w-full max-w-4xl">
        {filteredGrounds.length > 0 ? (
          <ul className="bg-white shadow-md rounded-xl p-4 space-y-2">
            {filteredGrounds.map((ground) => (
              <li key={ground._id}>
                <Link
                  href={`/grounds/${ground._id}`}
                  className="block px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                >
                  {ground.name || "Unnamed Ground"}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No grounds found</p>
        )}
      </div>
    </div>
  );
}
