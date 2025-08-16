import React from "react";
import Image from "next/image";
import { Fetch } from "@/utils/Server";
import PlayProBanner from "@/components/home/PlayProBanner";

export default async function Page() {
  const bannerResponse = await Fetch("/api/banner/public");
  const banners = bannerResponse?.data?.result ?? [];
  return (
    <div>
      <PlayProBanner banners={banners} />
      <div className="flex justify-center items-center bg-white p-6 md:p-20">
        <div className="flex flex-col md:flex-row w-full justify-between gap-10 md:gap-20">
          {/* Left Text div */}
          <div className="flex flex-col w-full md:w-2/5 justify-start">
            <p className="text-[#A21B3C] tracking-widest mb-2 text-sm md:text-base">
              A BIT
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B0B0B] mb-4">
              ABOUT US
            </h2>
            <p className="text-[#4A4A4A] text-base md:text-lg mb-8 font-light">
              From they fine john he give of rich he. They age and draw mrs
              like. Improving end distru sts may instantly was household
              applauded incommode. Why kept very ever home mrs. Considered
              sympathize ten uncommonly occasional assistance sufficient not.
            </p>
            <button
              style={{
                background: "#013F5E",
                boxShadow:
                  "0px 2.38px 4.05px 0px #44444406, 0px 10.49px 8.39px 0px #4444440A, 0px 25.74px 16.73px 0px #4444440D, 0px 49.58px 32.8px 0px #4444440F, 0px 83.42px 60.3px 0px #44444413, 0px 128.7px 102.96px 0px #4444441A",
              }}
              className="text-white w-fit px-6 py-3 md:py-4 rounded-3xl text-base md:text-lg"
            >
              EXPLORE MORE
            </button>
          </div>

          {/* Right Image div */}
          <div className="relative w-full md:w-3/5 flex flex-col gap-4">
            {/* Top Large Image */}
            <div className="relative rounded-[12.87px] overflow-hidden h-[200px] md:h-[280px]">
              <Image
                src="/assets/sky.png"
                alt="Top Stadium"
                fill
                className="object-cover"
              />
            </div>

            {/* Middle Large Image */}
            {/* <div className="relative mb-10 rounded-[12.87px] h-[260px] md:h-[320px]">
              <Image
                src="/assets/sky2.png"
                alt="Middle Stadium"
                fill
                className="object-cover"
              />

              {/* Bottom Image with 10+ Tag */}
            {/* <div className="absolute z-10 -bottom-[80px] md:-bottom-[116px] -left-6 md:-left-16 rounded-[12.87px] overflow-hidden">
                <Image
                  src="/assets/sky3.png"
                  alt="Soccer"
                  width={300}
                  height={300}
                  className="object-cover w-48 md:w-72"
                />
              </div> */}

            {/* 10+ Places Tag */}
            {/* <div className="absolute z-10 -bottom-14 md:-bottom-20 left-40 md:left-[230px] p-4 md:p-6 bg-[#013F5E] rounded-2xl flex flex-col justify-center items-center text-white font-bold text-xl md:text-3xl">
                <span className="text-3xl md:text-5xl">10+</span>
                <span className="text-xl md:text-3xl font-medium">Places</span>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
