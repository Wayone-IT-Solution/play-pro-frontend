"use client";

import React from "react";
import Image from "next/image";
import { getLocalizedText } from "@/hooks/general";
import AuthGuard2 from "@/components/layout/AuthGuard2";
import PlayProBanner from "@/components/home/PlayProBanner";

export default async function Page() {
  return (
    <AuthGuard2>
      <div className="mt-16 lg:mt-24">
        <PlayProBanner />
      </div>

      <div className="flex justify-center items-center bg-white p-6 md:p-20">
        <div className="flex flex-col md:flex-row w-full justify-between gap-10 md:gap-20">
          {/* Left Text div */}
          <div className="flex flex-col w-full md:w-2/5 justify-start">
            <p className="text-[#A21B3C] tracking-widest mb-2 text-sm md:text-base">
              {getLocalizedText("A BIT", "لمحة")}
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B0B0B] mb-4">
              {getLocalizedText("ABOUT US", "معلومات عنا")}
            </h2>
            <p className="text-[#4A4A4A] text-base md:text-lg mb-8 font-light">
              {getLocalizedText(
                "From they fine john he give of rich he. They age and draw mrs like. Improving end distru sts may instantly was household applauded incommode. Why kept very ever home mrs. Considered sympathize ten uncommonly occasional assistance sufficient not.",
                "من خلال جون الجيد أعطى من الغنى. هم يزدادون سناً ويرسمون السيدة كما يحلو لهم. تحسين النهاية قد تلقى الثناء فوراً. لماذا بقيت السيدة في المنزل؟ اعتُبر التعاطف مساعدة غير اعتيادية كافية."
              )}
            </p>
            <button
              style={{
                background: "#6D0E82",
                boxShadow:
                  "0px 2.38px 4.05px 0px #44444406, 0px 10.49px 8.39px 0px #4444440A, 0px 25.74px 16.73px 0px #4444440D, 0px 49.58px 32.8px 0px #4444440F, 0px 83.42px 60.3px 0px #44444413, 0px 128.7px 102.96px 0px #4444441A",
              }}
              className="text-white w-fit px-6 py-3 md:py-4 rounded-3xl text-base md:text-lg"
            >
              {getLocalizedText("EXPLORE MORE", "استكشف المزيد")}
            </button>
          </div>

          {/* Right Image div */}
          <div className="relative w-full md:w-3/5 flex flex-col gap-4">
            {/* Top Large Image */}
            <div className="relative rounded-[12.87px] overflow-hidden h-[200px] md:h-[280px]">
              <Image
                src="/assets/sky.png"
                alt={getLocalizedText("Top Stadium", "الملعب العلوي")}
                fill
                className="object-cover"
              />
            </div>

            {/* You can uncomment and localize other images/tags similarly */}
          </div>
        </div>
      </div>
    </AuthGuard2>
  );
}
