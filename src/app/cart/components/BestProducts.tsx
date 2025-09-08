"use client";

import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProductCard } from "@/components/ProductCard";
import { getLocalizedText, getLocalizedValues } from "@/hooks/general";

const BestSellingProductSwiper = ({
  product,
  fetchCartItems,
}: {
  product?: any[];
  fetchCartItems: any;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  const products = product || [];
  return (
    <div className="mt-20 w-screen lg:w-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2
            className="text-black text-2xl md:text-5xl font-bold mb-2"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            {getLocalizedText("Best Selling Products", "أفضل المنتجات مبيعاً")}
          </h2>
          <p className="text-gray-600 text-lg">
            {getLocalizedText("Exclusive showcase of Products", "عرض حصري للمنتجات")}
          </p>
        </div>

        <div className="hidden lg:flex gap-2">
          <button
            className="flex items-center gap-2 px-6 py-2 rounded-lg border-1 border-dashed"
            style={{ borderColor: "#6D0E82", color: "#6D0E82" }}
          >
            {getLocalizedText("Playpro Shop", "متجر بلاي برو")}
            <FiArrowRight size={21} />
          </button>
          <button
            onClick={handleNext}
            className="w-[45px] h-[35px] flex items-center justify-center transition-colors bg-white shadow-sm rounded-lg"
            style={{
              borderWidth: "1px",
              borderStyle: "dashed",
              borderColor: "#6D0E82",
              color: "#6D0E82",
            }}
          >
            <FiArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Swiper Container */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={4}
        slidesPerGroup={1}
        speed={800}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !w-2 !h-2 !bg-gray-300 !opacity-100",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-gray-800",
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="!pb-12"
      >
        {products.map((item, idx) => {
          item = getLocalizedValues(item);
          return <SwiperSlide key={idx} className="h-auto">
            <ProductCard product={item} index={idx} fetchCartItems={fetchCartItems} />
          </SwiperSlide>
        })}
      </Swiper>
    </div>
  );
};

export default BestSellingProductSwiper;
