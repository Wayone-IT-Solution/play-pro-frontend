"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { LiaLongArrowAltRightSolid } from "react-icons/lia"; // ✅ Import icon

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductsForYou = () => {
  const swiperRef = useRef<any>(null);

  const products = [
    {
      id: 1,
      brand: "Nike",
      name: "Shoes",
      rating: "4.5",
      description: "Nike shoes provide best comfort and confidence",
      price: "300 دولار",
      image: "/assets/shoes.png",
    },
    {
      id: 2,
      brand: "Nike",
      name: "Shoes",
      rating: "4.5",
      description: "Nike shoes provide best comfort and confidence",
      price: "300 دولار",
      image: "/assets/shoes2.png",
    },
    {
      id: 3,
      brand: "Nike",
      name: "Shoes",
      rating: "4.5",
      description: "Nike shoes provide best comfort and confidence",
      price: "300 دولار",
      image: "/assets/shirts.png",
    },
    {
      id: 4,
      brand: "Nike",
      name: "Shoes",
      rating: "4.5",
      description: "Nike shoes provide best comfort and confidence",
      price: "300 دولار",
      image: "/assets/shoes2.png",
    },
  ];

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="w-screen md:max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Products For You
          </h2>
          <p className="text-gray-600 text-lg">Exclusive showcase of Fields</p>
        </div>

        {/* Right Arrow - styled same as Testimonials */}
        <button
          onClick={handleNext}
          className="w-[45px] h-[35px] flex items-center justify-center transition-colors bg-white shadow-sm rounded-lg"
          style={{
            borderWidth: "1px",
            borderStyle: "dashed",
            borderColor: "#013F5E",
          }}
        >
          <LiaLongArrowAltRightSolid size={18} color="#013F5E" />
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // ✅ Store swiper instance
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
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 24,
          },
        }}
        className="!pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              {/* Product Image */}
              <div className="relative h-80 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />

                {/* Nike Tag */}
                <div
                  className="absolute top-3 right-3 bg-white text-gray-800 px-2 py-1 rounded-full shadow-sm"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  {product.brand}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-xs text-gray-200 mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center text-sm">
                    ⭐ {product.rating} Rating
                  </div>
                </div>
              </div>

              {/* Price & Button */}
              <div className="bg-white p-4 flex justify-between items-center rounded-b-2xl">
                <div className="text-sm font-medium text-gray-700">
                  {product.price}
                </div>
                <button
                  className="px-6 py-2 text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
                  style={{ background: "#013F5E" }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styles */}
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

export default ProductsForYou;
