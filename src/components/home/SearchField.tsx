"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Fetch } from "@/utils/axios";
import Link from "next/link";

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

  const groundsRef = useRef<HTMLDivElement>(null); // Ref for the dropdown

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
      setShowGroundsList(true); // Show the list after fetching
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
    setValue: (val: string) => void;
    options: string[];
    placeholder: string;
  }> = ({ value, setValue, options, placeholder }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
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
      <div className="relative overflow-hidden min-w-[160px]" ref={dropdownRef}>
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
        className="flex flex-wrap gap-4 px-4 py-3 bg-[#E6E7FC] rounded-full w-full max-w-4xl shadow-sm justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search For Fields"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 outline-none bg-white rounded-full px-6 py-3 text-gray-600 font-medium placeholder:font-normal placeholder:text-gray-400 border border-gray-200 focus:ring-2 focus:ring-purple-200 transition-all min-w-[200px]"
        />
        <Dropdown
          value={selectedCity}
          setValue={setSelectedCity}
          options={addressOptions}
          placeholder="Select City"
        />
        <Dropdown
          value={selectedFieldType}
          setValue={setSelectedFieldType}
          options={typeOptions}
          placeholder="Field Type"
        />
        <button
          type="submit"
          disabled={loadingGrounds}
          className="rounded-full px-8 py-3 font-semibold text-white text-base bg-[#932AAA] hover:bg-[#7b0d92] transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
        >
          {loadingGrounds ? "Searching..." : "Find"}
        </button>
      </form>

      {/* Grounds List */}
      {showGroundsList && filteredGrounds.length > 0 && (
        <div
          ref={groundsRef}
          className="absolute z-50 bg-white top-12 mt-8 w-full shadow-2xl overflow-hidden rounded-2xl max-w-4xl max-h-80"
        >
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-semibold text-[#932AAA] mb-4 text-lg">
              Available Grounds
            </h3>
            <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100 rounded-xl border border-gray-200 custom-scrollbar">
              {filteredGrounds.map((ground) => (
                <li key={ground._id}>
                  <Link
                    href={`/grounds/${ground._id}`}
                    className="flex items-center justify-between px-5 py-4 text-gray-700 hover:bg-[#932AAA]/10 hover:text-[#932AAA] transition-all duration-200"
                  >
                    <span className="font-medium">
                      {ground.name || "Unnamed Ground"}
                    </span>
                    <span className="text-xs bg-[#932AAA] text-white px-3 py-1 rounded-full shadow-sm">
                      View
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* No grounds found */}
      {hasSearched && !filteredGrounds.length && !loadingGrounds && (
        <p className="mt-8 text-gray-500 text-center bg-white rounded-xl shadow-md p-4 w-full max-w-4xl">
          No grounds found. Try adjusting your filters.
        </p>
      )}

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #932aaa;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
      `}</style>
    </div>
  );
}
