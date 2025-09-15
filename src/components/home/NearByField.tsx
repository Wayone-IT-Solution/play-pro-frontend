"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GroundCard from "../common/GroundCard";
import { getLocalizedText, getLocalizedValues } from "@/hooks/general";

const NearByField = ({ nextSlots, titleEn, titleAr, descShow = true }: { nextSlots?: any, titleEn?: string, titleAr?: string, descShow?: boolean }) => {
  const fields = nextSlots ?? [];
  const swiperRef = useRef<any>(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="bg-white w-screen lg:w-auto mt-5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 pt-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              {getLocalizedText(titleEn || "PlayPro Fields", titleAr || "ملاعب PlayPro")}
            </h2>
            {descShow && <p className="text-gray-600 text-base sm:text-lg">
              {getLocalizedText("Explore fields around you", "استكشف الملاعب من حولك")}
            </p>}
          </div>

          {/* Custom Navigation Button */}
          <button
            onClick={handleNext}
            className="w-[45px] h-[35px] flex items-center justify-center transition-colors bg-white shadow-sm rounded-lg self-start sm:self-auto"
            style={{
              borderWidth: "1px",
              borderStyle: "dashed",
              borderColor: "#6D0E82",
            }}
          >
            <LiaLongArrowAltRightSolid size={18} color="#6D0E82" />
          </button>
        </div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            speed={800}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
            }}
            className="!pb-12"
          >
            {fields.map((field: any) => {
              field = getLocalizedValues(field);
              return <SwiperSlide key={field._id}>
                <GroundCard field={field} />
              </SwiperSlide>
            })}
          </Swiper>
        </div>

        <style jsx global>{`
          .swiper-pagination {
            bottom: 0 !important;
          }
          .swiper-pagination-bullet {
            margin: 0 4px !important;
          }
          .swiper-slide {
            height: auto;
          }
        `}</style>
      </div>
    </div >
  );
};

export default NearByField;
