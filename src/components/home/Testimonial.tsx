"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Comma from "./Comma";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";

const Testimonials = ({ testimonials }: { testimonials?: any }) => {
  const swiperRef = useRef<any>(null);
  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  const renderStars = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating ?? 5);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <svg
            key={index}
            className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-star)"
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        )}
        <span
          className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium"
          style={{ color: "#6D0E82" }}
        >
          {rating} Rating
        </span>
      </div>
    );
  };

  return (
    <div className="w-screen md:max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2
          className="text-2xl sm:text-4xl font-bold text-center sm:text-left"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
         Review & Testimonials
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
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 32 },
        }}
      >
        {testimonials.map((t: any) => (
          <SwiperSlide key={t.id}>
            <div className="relative mt-10 px-2 sm:px-0">
              <div
                className="rounded-2xl p-4 sm:p-5 shadow-sm relative bg-white border border-gray-200 flex flex-col"
                style={{ aspectRatio: "1.4/1" }}
              >
                {/* Quote icon */}
                <div className="absolute -top-3 left-4 sm:left-8">
                  <Comma />
                </div>

                {/* Profile Image */}
                <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gray-200 bg-white shadow-md">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Review */}
                <div className="mt-8 mb-3 bg-[#F4F4F4] p-3 rounded-2xl flex-1">
                  <p
                    className="text-sm font-semibold leading-relaxed"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#6D0E82",
                    }}
                  >
                    {t.feedback}
                  </p>
                </div>

                {/* Name & Rating */}
                <div className="flex justify-between items-center gap-1 mt-auto">
                  <h4
                    className="font-semibold text-xs sm:text-sm"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#6D0E82",
                    }}
                  >
                    {t.name}
                  </h4>
                  {renderStars({ rating: t.rating })}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
