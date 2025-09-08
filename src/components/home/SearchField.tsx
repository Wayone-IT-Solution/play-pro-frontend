"use client";

import Link from "next/link";
import Image from "next/image";
import { Fetch } from "@/utils/axios";
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

type Ground = {
  _id: string;
  name?: string;
};

export default function FieldSearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedFieldType, setSelectedFieldType] = useState<string>("");
  const [loadingFilters, setLoadingFilters] = useState<boolean>(true);

  const [addressOptions, setAddressOptions] = useState<string[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const [filteredGrounds, setFilteredGrounds] = useState<Ground[]>([]);
  const [loadingGrounds, setLoadingGrounds] = useState<boolean>(false);

  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [showGroundsList, setShowGroundsList] = useState<boolean>(false);

  const groundsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchFilters() {
      setLoadingFilters(true);
      try {
        const res: any = await Fetch(
          "/api/ground/filter",
          {},
          5000,
          true,
          false
        );
        if (res?.success) {
          setAddressOptions(res?.data?.addresses || []);
          setTypeOptions(res?.data?.types || []);
        }
      } catch {
        setAddressOptions([]);
        setTypeOptions([]);
      } finally {
        setLoadingFilters(false);
      }
    }
    fetchFilters();
  }, []);

  const fetchFilteredGrounds = async () => {
    setLoadingGrounds(true);
    try {
      const query: { name?: string; address?: string; type?: string } = {
        ...(searchTerm && { name: searchTerm.trim() }),
        ...(selectedCity && { address: selectedCity.trim() }),
        ...(selectedFieldType && { type: selectedFieldType.trim() }),
      };
      const res: any = await Fetch(
        "/api/ground/filterGround",
        query,
        5000,
        true,
        false
      );
      setFilteredGrounds(res?.success ? (res.data as Ground[]) || [] : []);
      setShowGroundsList(true);
    } catch {
      setFilteredGrounds([]);
      setShowGroundsList(false);
    } finally {
      setLoadingGrounds(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    fetchFilteredGrounds();
  };

  const titleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const Dropdown: React.FC<{
    value: string;
    options: string[];
    placeholder: string;
    setValue: (val: string) => void;
  }> = ({ value, setValue, options, placeholder }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative min-w-[160px]" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center w-full bg-white rounded-full px-5 py-3 pr-10 text-gray-600 font-medium border border-gray-200 outline-none cursor-pointer focus:ring-2 focus:ring-purple-200 transition-all"
        >
          {value ? titleCase(value) : placeholder}
          <ChevronDown className="ml-2 w-4 h-4 text-gray-400" />
        </button>

        {open && !loadingFilters && (
          <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-20 custom-scrollbar">
            {options.length > 0 ? (
              options.map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    className="w-full text-left px-5 py-2 hover:bg-purple-50"
                    onClick={() => {
                      setValue(opt);
                      setOpen(false);
                    }}
                  >
                    {titleCase(opt)}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-5 py-2 text-gray-400">No options</li>
            )}
          </ul>
        )}
      </div>
    );
  };

  // Close grounds list if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        groundsRef.current &&
        !groundsRef.current.contains(event.target as Node)
      ) {
        setShowGroundsList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative flex flex-col justify-center items-center mt-24">
      <form
        className="flex flex-wrap gap-4 px-4 py-3 bg-[#E6E7FC] md:rounded-full w-full max-w-4xl shadow-sm justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={searchTerm}
          placeholder="Search For Fields"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 outline-none bg-white rounded-full px-6 py-3 text-gray-600 font-medium placeholder:font-normal placeholder:text-gray-400 border border-gray-200 focus:ring-2 focus:ring-purple-200 transition-all min-w-[200px]"
        />
        <Dropdown
          value={selectedCity}
          options={addressOptions}
          placeholder="Select City"
          setValue={setSelectedCity}
        />
        <Dropdown
          options={typeOptions}
          placeholder="Field Type"
          value={selectedFieldType}
          setValue={setSelectedFieldType}
        />
        <button
          type="submit"
          disabled={loadingGrounds}
          className="rounded-full px-8 py-3 cursor-pointer font-semibold text-white text-base bg-[#932AAA] hover:bg-[#7b0d92] transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
        >
          {loadingGrounds ? "Searching..." : "Find"}
        </button>
      </form>

      {/* Grounds Result Block */}
      {showGroundsList && (
        <div
          ref={groundsRef}
          className="absolute z-50 bg-white top-12 mt-8 w-full shadow-2xl overflow-hidden rounded-2xl max-w-4xl"
        >
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <h3 className="font-semibold text-[#932AAA] mb-4 text-lg">
              Available Grounds
            </h3>

            {filteredGrounds.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100 rounded-xl border border-gray-200 custom-scrollbar">
                {filteredGrounds.map((ground: any) => (
                  <li key={ground?._id}>
                    <Link
                      href={`/grounds/${ground?._id}`}
                      className="flex items-center gap-4 px-3 py-2 hover:bg-[#932AAA]/10 transition-all duration-200"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          width={125}
                          height={125}
                          unoptimized
                          alt={ground?.name}
                          src={ground?.images?.[0]}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">
                          {ground?.name || "Unnamed Ground"}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {ground?.address}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                          <span>{ground?.type}</span>
                          <span className="font-semibold text-[#932AAA]">
                            SAR {ground?.pricePerHour}/hr
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              hasSearched &&
              !loadingGrounds && (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <svg
                    className="w-12 h-12 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="font-medium">No grounds found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try adjusting your filters and search again.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
