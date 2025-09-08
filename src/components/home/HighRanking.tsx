"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { getLocalizedText } from "@/hooks/general";
import { getLocalizedValues } from "@/hooks/general";

const HighRankingField = ({ nextSlots }: { nextSlots?: any }) => {
  const fields = nextSlots ?? [];
  const swiperRef = useRef<any>(null);

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div
      className="bg-white mt-10 w-screen lg:w-auto"
      style={{ borderRadius: 24 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 pt-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
              {getLocalizedText("High Ranking Fields", "أعلى الملاعب تصنيفاً")}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              {getLocalizedText(
                "Discover and book the most popular and highly rated fields around you.",
                "اكتشف واحجز أكثر الملاعب شعبية وتصنيفاً بالقرب منك."
              )}
            </p>
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
              320: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 1.5, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3.5, spaceBetween: 20 },
            }}
            className="!pb-12"
          >
            {fields.map((field: any) => {
              field = getLocalizedValues(field);
              return (
                <SwiperSlide key={field._id}>
                  <Link
                    href={`/grounds/${field._id}`}
                    passHref
                    className="relative rounded-2xl border border-gray-200 p-1 overflow-hidden transition-shadow duration-300 bg-white h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] sm:aspect-[3/4]">
                      {field.images?.length ? (
                        <Image
                          src={field.images[0]}
                          alt={field.name}
                          fill
                          unoptimized
                          className="object-cover rounded-2xl"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-2xl text-gray-500 text-sm">
                          {getLocalizedText("No Image", "لا توجد صورة")}
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-black/60 p-3 text-white">
                        <h3 className="text-base sm:text-lg font-semibold mb-1">
                          {field.name}
                        </h3>
                        <div className="flex items-center text-xs sm:text-sm text-gray-200">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="currentColor"
                            className="mr-1 shrink-0"
                          >
                            <path d="M6 0C3.515 0 1.5 2.015 1.5 4.5c0 3.375 4.5 7.5 4.5 7.5s4.5-4.125 4.5-7.5C10.5 2.015 8.485 0 6 0zm0 6.75c-1.243 0-2.25-1.007-2.25-2.25S4.757 2.25 6 2.25s2.25 1.007 2.25 2.25S7.243 6.75 6 6.75z" />
                          </svg>
                          {field.address}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="bg-white p-3 sm:p-4 flex justify-between items-center">
                      <div className="text-xs sm:text-sm font-medium text-gray-700">
                        SAR {field.pricePerHour} /{" "}
                        {getLocalizedText("hour", "ساعة")}
                      </div>
                      <button
                        className="px-4 py-1.5 sm:px-6 sm:py-2 text-white font-medium rounded-lg text-xs sm:text-sm hover:opacity-90 transition-opacity"
                        style={{ background: "#6D0E82" }}
                      >
                        {getLocalizedText("Book Now", "احجز الآن")}
                      </button>
                    </div>
                  </Link>
                </SwiperSlide>
              );
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
    </div>
  );
};

export default HighRankingField;
