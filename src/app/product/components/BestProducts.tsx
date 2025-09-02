"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiArrowRight } from "react-icons/fi";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const fields = [
  {
    img: "/assets/product1.png",
    tag: "Nike",
    title: "Shoes",
    rating: 4.5,
    price: 300,
    currency: "AED",
    desc: "Nike shoes provide best comfort and confidence",
  },
  {
    img: "/assets/product2.png",
    tag: "Nike",
    title: "Shoes",
    rating: 4.5,
    price: 300,
    currency: "AED",
    desc: "Nike shoes provide best comfort and confidence",
  },
  {
    img: "/assets/product3.png",
    tag: "Nike",
    title: "Shoes",
    rating: 4.5,
    price: 300,
    currency: "AED",
    desc: "Nike shoes provide best comfort and confidence",
  },
  {
    img: "/assets/product4.png",
    tag: "Nike",
    title: "Shoes",
    rating: 4.5,
    price: 300,
    currency: "AED",
    desc: "Nike shoes provide best comfort and confidence",
  },
  {
    img: "/assets/product3.png",
    tag: "Nike",
    title: "Shoes",
    rating: 4.5,
    price: 300,
    currency: "AED",
    desc: "Nike shoes provide best comfort and confidence",
  },
];

const BestSellingProductSwiper = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // ✅ this now works
    }
  };

  return (
    <div className="w-screen md:max-w-7xl mx-auto mt-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2
            className="text-black font-bold mb-2"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "49px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            Best selling Product
          </h2>
          <p className="text-gray-600 text-lg">Exclusive showcase of Fields</p>
        </div>

        {/* Custom Navigation */}
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 px-6 py-2 rounded-lg border-1 border-dashed"
            style={{ borderColor: "#6D0E82", color: "#6D0E82" }}
          >
            Playpro Shop
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
          // ✅ assign the real instance
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={4}
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
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="!pb-12"
      >
        {fields.map((field, idx) => (
          <SwiperSlide key={idx} className="h-auto">
            <div
              className="bg-white rounded-xl shadow-sm p-3 flex flex-col items-start w-full border border-gray-200"
              style={{ minWidth: "220px" }}
            >
              <div className="w-full relative mb-3">
                <Image
                  src={field.img}
                  alt={field.title}
                  width={400}
                  height={300}
                  className="rounded-xl w-full h-[180px] object-cover"
                />
                <span
                  className="absolute top-2 right-2 bg-white rounded-full px-4 py-1 text-sm font-semibold"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {field.tag}
                </span>
              </div>
              <h2 className="font-bold text-lg">{field.title}</h2>
              <div className="flex items-center text-sm gap-2 mt-1 mb-2 text-gray-700">
                <span className="text-yellow-500 font-medium">★</span>
                <span>{field.rating} Rating</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{field.desc}</p>
              <div className="font-bold text-lg mb-2">
                {field.price} {field.currency}
              </div>
              <button
                className="w-full py-2 rounded-full mt-auto"
                style={{
                  background: "#6D0E82",
                  color: "#fff",
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Add To Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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

export default BestSellingProductSwiper;
