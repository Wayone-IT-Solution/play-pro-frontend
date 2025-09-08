"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getLocalizedText } from "@/hooks/general";

const PlayProBanner = ({ banners }: { banners?: any }) => {
  return (
    <div className="relative w-full bg-white font-[Poppins] overflow-hidden">
      {/* Left Player Image */}
      <div className="absolute left-0 top-[66%] -translate-y-1/2 w-[300px] sm:w-[380px] lg:w-[460px] h-auto">
        <Image
          src="/assets/profile1.png"
          alt={getLocalizedText("Football Player Left", "لاعب كرة قدم يسار")}
          width={460}
          height={460}
          priority
        />
      </div>

      {/* Right Player Image */}
      <div className="absolute right-0 top-[66%] -translate-y-1/2 w-[300px] sm:w-[380px] lg:w-[460px] h-auto">
        <Image
          src="/assets/profile22.png"
          alt={getLocalizedText("Football Player Right", "لاعب كرة قدم يمين")}
          width={460}
          height={460}
          priority
        />
      </div>

      {/* Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pb-16 pt-10">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug mb-10 text-[#2F0D46]">
          {getLocalizedText("PlayPro simplifies", "يبسط PlayPro")}{" "}
          <span className="text-[#2F0D46]">{getLocalizedText("sp", "ال")}</span>
          <span className="text-gray-300">
            {getLocalizedText("ort", "رياض")}
          </span>
          <span className="text-[#2F0D46]">{getLocalizedText("s", "ة")}</span>
          <br />
          {getLocalizedText("for", "لـ")}{" "}
          <span className="text-[#2F0D46]">
            {getLocalizedText("everyon", "الجميع")}
          </span>
          <span className="text-gray-300">{getLocalizedText("e", "")}</span>
        </h1>

        {/* Middle Card */}
        <div className="inline-block bg-white p-2 rounded-[48px] border-2 border-dashed border-gray-200 shadow-2xl">
          <div className="inline-block bg-white rounded-[44px] shadow-md border-2 border-dashed border-[#6D0E82] px-16 py-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/assets/newLogo.png"
                alt={getLocalizedText("PlayPro Logo", "شعار PlayPro")}
                width={120}
                height={120}
                priority
              />
            </div>

            {/* Button */}
            <Link
              href="/grounds"
              className="inline-block bg-[#6D0E82] text-white px-8 py-3 rounded-full font-medium text-sm sm:text-base hover:opacity-90 transition"
            >
              {getLocalizedText("Check PlayPro fields", "تحقق من ملاعب PlayPro")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayProBanner;
