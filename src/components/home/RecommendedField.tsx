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

const RecommendedField = () => {
  const swiperRef = useRef<any>(null);

  const fields = [
    { id: 1, name: "Cyber Hub", location: "Sohna Road, Gurugram...", distance: "3.5 km", image: "/assets/stadium1.png", alt: "Stadium field" },
    { id: 2, name: "Cyber Hub", location: "Sohna Road, Gurugram...", distance: "3.5 km", image: "/assets/turf.png", alt: "Outdoor sports field" },
    { id: 3, name: "Cyber Hub", location: "Sohna Road, Gurugram...", distance: "3.5 km", image: "/assets/turf2.png", alt: "Basketball court" },
    { id: 4, name: "Cyber Hub", location: "Sohna Road, Gurugram...", distance: "3.5 km", image: "/assets/stadium1.png", alt: "Football field" },
    { id: 5, name: "Cyber Hub", location: "Sohna Road, Gurugram...", distance: "3.5 km", image: "/assets/turf.png", alt: "Tennis court" },
  ];

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
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
              borderColor: "#013F5E",
            }}
          >
            <LiaLongArrowAltRightSolid size={18} color="#013F5E" />
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
            {fields.map((field) => (
              <SwiperSlide key={field.id}>
                <div className="relative rounded-2xl border border-gray-200 p-1 overflow-hidden transition-shadow duration-300 bg-white">
                  {/* Field Image */}
                  <div className="relative h-96 w-full">
                    <Image
                      src={field.image}
                      alt={field.alt}
                      fill
                      className="object-cover rounded-2xl"
                    />

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-black/60 p-4 text-white">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {field.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-200">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                          className="mr-1"
                        >
                          <path d="M6 0C3.515 0 1.5 2.015 1.5 4.5c0 3.375 4.5 7.5 4.5 7.5s4.5-4.125 4.5-7.5C10.5 2.015 8.485 0 6 0zm0 6.75c-1.243 0-2.25-1.007-2.25-2.25S4.757 2.25 6 2.25s2.25 1.007 2.25 2.25S7.243 6.75 6 6.75z" />
                        </svg>
                        {field.location}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="bg-white p-4 flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-700">
                      Distance: {field.distance}
                    </div>
                    <button
                      className="px-6 py-2 text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
                      style={{ background: "#013F5E" }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
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
