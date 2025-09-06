"use client";

import Image from "next/image";
import { Fetch } from "@/utils/axios";
import { useEffect, useState } from "react";

interface GroundCount {
  count: number;
  type_en: string;
  type_ar: string;
}

const StadiumBrowser = () => {
  const [counts, setCounts] = useState<GroundCount[]>([]);
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    // Get language from localStorage
    const storedLang = localStorage.getItem("lang");
    if (storedLang === "ar" || storedLang === "en") {
      setLang(storedLang);
    }

    const fetchCounts = async () => {
      try {
        const res: any = await Fetch("/api/ground/count", {}, 5000, true, false);

        if (res && res.data) {
          setCounts(res.data);
        }
      } catch (err) {
        console.log("Error fetching ground counts:", err);
      }
    };

    fetchCounts();
  }, []);

  const sports = [
    {
      key: "football",
      icon: "/assets/football1.png",
      alt: "Football icon",
    },
    {
      key: "cricket",
      icon: "/assets/cricket.png",
      alt: "Cricket icon",
    },
    {
      key: "hockey",
      icon: "/assets/field-hockey.png",
      alt: "Hockey icon",
    },
    {
      key: "badminton",
      icon: "/assets/badminton.png",
      alt: "Badminton icon",
    },
    {
      key: "tennis",
      icon: "/assets/tennis.png",
      alt: "Tennis icon",
    },
    {
      key: "volleyball",
      icon: "/assets/volleyball.png",
      alt: "Volleyball icon",
    },
  ];

  // Map counts for easier access
  const countMap: { [key: string]: number } = {};
  counts.forEach((item) => {
    const typeKey = lang === "ar" ? item.type_ar.toLowerCase() : item.type_en.toLowerCase();
    countMap[typeKey] = item.count;
  });

  return (
    <div className="py-20 px-5 border-b-1" style={{ backgroundColor: "#0F0B2E1A" }}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-black text-center mb-12 font-inter">
          {lang === "en" ? "Browse Stadiums By Sport" : "تصفح الملاعب حسب الرياضة"}
        </h1>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8 max-w-5xl mx-auto">
          {sports.map((sport, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 flex items-center gap-5 cursor-pointer hover:transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
            >
              {/* Sport Icon */}
              <div className="flex-shrink-0">
                <Image
                  src={sport.icon}
                  alt={sport.alt}
                  width={60}
                  height={60}
                  className="w-15 h-15"
                />
              </div>

              {/* Sport Info */}
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold text-black mb-1 font-inter">
                  {lang === "en"
                    ? sport.key.charAt(0).toUpperCase() + sport.key.slice(1)
                    : {
                      football: "كرة القدم",
                      cricket: "كريكيت",
                      hockey: "هوكي",
                      badminton: "بادمينتون",
                      tennis: "تنس",
                      volleyball: "كرة الطائرة",
                    }[sport.key]}
                </h3>
                <p className="text-gray-600 font-inter">
                  {countMap[sport.key] || 0} {lang === "en" ? "Stadium" : "ملعب"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StadiumBrowser;
