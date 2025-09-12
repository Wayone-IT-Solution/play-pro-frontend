"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";

// Replace with actual i18n if needed
const getLocalizedText = (en: string, ar: string) => {
  const locale: any = "en"; // or dynamically set based on user
  return locale === "ar" ? ar : en;
};

const getLocalizedValues = (item: any) => {
  const locale = "en"; // change this as needed
  return {
    id: item._id,
    name: item.name?.[locale] || "",
    description: item.description?.[locale] || "",
    logo: item.logo,
    website: item.website,
  };
};

const Sponsor = ({ sponsor }: { sponsor?: any[] }) => {
  const swiperRef = useRef<any>(null);
  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  if (!Array.isArray(sponsor) || sponsor.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto w-screen lg:w-auto py-10 sm:py-16 sm:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2
          className="text-2xl sm:text-4xl font-bold text-center sm:text-left"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {getLocalizedText("Sponsors", "الرعاة")}
        </h2>

        {/* Arrows */}
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handlePrev}
            className="w-9 h-8 sm:w-[45px] sm:h-[35px] flex items-center justify-center transition-colors bg-white shadow-sm rounded-lg"
            style={{
              borderWidth: "1px",
              borderStyle: "dashed",
              borderColor: "#6D0E82",
            }}
          >
            <LiaLongArrowAltLeftSolid size={18} color="#6D0E82" />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-8 sm:w-[45px] sm:h-[35px] flex items-center justify-center transition-colors bg-white shadow-sm rounded-lg"
            style={{
              borderWidth: "1px",
              borderStyle: "dashed",
              borderColor: "#6D0E82",
            }}
          >
            <LiaLongArrowAltRightSolid size={18} color="#6D0E82" />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        slidesPerGroup={1}
        speed={800}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 5, spaceBetween: 32 },
        }}
      >
        {sponsor.map((t) => {
          const localized = getLocalizedValues(t);
          return (
            <SwiperSlide key={localized.id}>
              <div className="relative mt-10 px-2 sm:px-0">
                <div
                  className="rounded-2xl p-4 sm:p-5 shadow-sm relative bg-white border border-gray-200 flex flex-col items-center justify-center"
                  style={{ aspectRatio: "1.4/1" }}
                >
                  {/* Profile Image */}
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 bg-white shadow-md">
                    <Image
                      width={64}
                      height={64}
                      alt={localized.name}
                      src={localized.logo}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  {/* Sponsor Name */}
                  <p className="mt-4 text-center font-semibold text-gray-800 text-sm">
                    {localized.name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Sponsor;
