"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { LiaLongArrowAltRightSolid } from "react-icons/lia"; // import icon

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const RecommendedField = ({ nextSlots }: { nextSlots?: any }) => {
  const swiperRef = useRef<any>(null);
  const fields = nextSlots;

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="w-screen md:max-w-6xl mx-auto px-4">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Recommended fields
            </h2>
            <p className="text-gray-600 text-lg">
              Exclusive showcase of Fields
            </p>
          </div>

          {/* Custom Navigation Button */}
          <button
            onClick={handleNext}
            className="w-[45px] h-[35px] flex items-center justify-center transition-colors bg-white shadow-sm rounded-lg"
            style={{
              borderWidth: "1px",
              borderStyle: "dashed",
              borderColor: "#6D0E82",
            }}
          >
            <LiaLongArrowAltRightSolid size={18} color="#6D0E82" />
          </button>
        </div>

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={3}
            slidesPerGroup={1}
            speed={800}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !w-2 !h-2 !bg-gray-300 !opacity-100",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-gray-800",
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3.5, spaceBetween: 24 },
            }}
            className="!pb-12"
          >
            <Link href="/list-field" passHref>
              <button
                className="px-6 py-2 rounded-lg text-white font-inter text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#6D0E82" }}
                type="button"
              >
                List Field
              </button>
            </Link>
          </Swiper>
        </div>
      </div>

      {/* Custom Styles */}
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
  );
};

export default RecommendedField;
