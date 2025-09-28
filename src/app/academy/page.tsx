"use client";

import { Fetch } from "@/utils/axios";
import { IoFilterOutline } from "react-icons/io5";
import AcademyCard from "./components/AcademyCard";
import { getLocalizedText, getLocalizedValues } from "@/hooks/general";
import React, { useCallback, useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [academies, setAcademies] = useState([]);

  const fetchAcademy = useCallback(async () => {
    try {
      const response: any = await Fetch("/api/academy/public", { limit: 100 }, 5000, true, false);
      if (response?.success) setAcademies(response?.data?.result || [])
    } catch (error) {
      console.log("Error: ", error);
    }
  }, [])

  useEffect(() => {
    fetchAcademy();
  }, [fetchAcademy]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Header + Filter Row (as in image) */}
        <header className="flex items-center justify-between mt-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-1">
              <span className="text-[#932AAA]">Play</span>
              <span className="text-gray-500">Pro</span>
              <span className="text-black ml-1">Acadmy</span>
            </h1>
            <p className="text-black mt-1">
              {getLocalizedText("A leading academy offering professional coaching in football, basketball, and tennis, with programs for all age groups.", "انضم إلى أكاديمية بلاي برو الرياضية لتطوير مهاراتك تحت إشراف مدربين خبراء. نقدم منشآت عالمية المستوى، برامج منظمة، وتدريب شخصي للأطفال والمراهقين والكبار. ارتقِ بمستواك في كرة القدم وكرة السلة والتنس وغيرها.")}
            </p>
          </div>
          {/* <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-50">
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                  <circle cx="9" cy="9" r="8" stroke="#8B5CF6" strokeWidth="2" />
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
          </div> */}
        </header>

        {/* Left-Aligned Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {academies?.length > 0 && academies.map((item: any) => {
            item = getLocalizedValues(item);
            return <React.Fragment key={item._id}>
              <AcademyCard academy={item} />
            </React.Fragment>
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
