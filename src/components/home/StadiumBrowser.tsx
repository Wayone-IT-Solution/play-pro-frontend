"use client";

import { Fetch } from "@/utils/axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const StadiumBrowser = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res: any = await Fetch(
          "/api/ground/count",
          {},
          5000,
          true,
          false
        );

        if (res && res.data) {
          const mappedCounts: { [key: string]: number } = {};
          res.data.forEach((item: any) => {
            const type = item.type?.toLowerCase();
            if (type) {
              mappedCounts[type] = item.count;
            }
          });
          setCounts(mappedCounts);
        }
      } catch (err) {
        console.error("Error fetching ground counts:", err);
      }
    };

    fetchCounts();
  }, []);

  const sports = [
    {
      name: "Football",
      stadiumCount: `${counts["football"] || 0} Stadium`,
      icon: "/assets/football1.png",
      alt: "Football icon",
    },
    {
      name: "Cricket",
      stadiumCount: `${counts["cricket"] || 0} Stadium`,
      icon: "/assets/cricket.png",
      alt: "Cricket icon",
    },
    {
      name: "Hockey",
      stadiumCount: `${counts["hockey"] || 0} Stadium`,
      icon: "/assets/field-hockey.png",
      alt: "Hockey icon",
    },
    {
      name: "Badminton",
      stadiumCount: `${counts["badminton"] || 0} Stadium`,
      icon: "/assets/badminton.png",
      alt: "Badminton icon",
    },
    {
      name: "Tennis",
      stadiumCount: `${counts["tennis"] || 0} Stadium`,
      icon: "/assets/tennis.png",
      alt: "Tennis icon",
    },
    {
      name: "Volleyball",
      stadiumCount: `${counts["volleyball"] || 0} Stadium`,
      icon: "/assets/volleyball.png",
      alt: "Volleyball icon",
    },
  ];

  return (
    <div
      className="py-20 px-5 border-b-1"
      style={{ backgroundColor: "#0F0B2E1A" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-black text-center mb-12 font-inter">
          Browse Stadiums By Sport
        </h1>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                  {sport.name}
                </h3>
                <p className="text-gray-600 font-inter">{sport.stadiumCount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StadiumBrowser;
