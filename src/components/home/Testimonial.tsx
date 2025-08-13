"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Comma from "./Comma";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";

const Testimonials = () => {
  const swiperRef = useRef<any>(null);

  const testimonials = [
    {
      id: 1,
      name: "Anshu Jangra",
      rating: 4.5,
      review:
        "BGT Ventures General Trading LLC is a distinguished distributor of cutting-edge security surveillance. BGT Ventures General Trading LLC is a distinguished distributor of cutting-edge security surveillance",
      profileImage: "/assets/profile.png",
    },
    {
      id: 2,
      name: "Anshu Jangra",
      rating: 4.5,
      review:
        "BGT Ventures General Trading LLC is a distinguished distributor of cutting-edge security surveillance. BGT Ventures General Trading LLC is a distinguished distributor of cutting-edge security surveillance",
      profileImage: "/assets/profile.png", // Replace with your profile image
    },
    {
      id: 3,
      name: "Anshu Jangra",
      rating: 4.5,
      review:
        "BGT Ventures General Trading LLC is a distinguished distributor of cutting-edge security surveillance. BGT Ventures General Trading LLC is a distinguished distributor of cutting-edge security surveillance",
      profileImage: "/assets/profile.png", // Replace with your profile image
    },
    {
      id: 4,
      name: "Anshu Jangra",
      rating: 4.5,
      review:
        "BGT Ventures General Trading LLC is a distinguished distributor of cutting-edge security surveillance. BGT Ventures General Trading LLC is a distinguished distributor of cutting-edge security surveillance",
      profileImage: "/assets/profile.png", // Replace with your profile image
    },
  ];

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const renderStars = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating ?? 5);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <svg
            key={index}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            className="w-4 h-4 text-yellow-400 fill-current"
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
        <span className="ml-2 text-sm font-medium" style={{ color: "#013F5E" }}>
          {rating} Rating
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-4">
        {/* Header */}
        <div>
          <h2
            className="text-4xl font-bold mb-2"
            style={{
              fontFamily: "Poppins, sans-serif",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            What Players Say
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-3">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="w-[45px] h-[35px] flex items-center justify-center transition-colors bg-white shadow-sm rounded-lg"
            style={{
              borderWidth: "1px",
              borderStyle: "dashed",
              borderColor: "#013F5E",
            }}
          >
            <LiaLongArrowAltLeftSolid size={18} color="#013F5E" />
          </button>

          {/* Right Arrow */}
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
      </div>

      {/* Swiper Container */}
      <div className="relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={3}
          slidesPerGroup={1}
          speed={800}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial: any) => (
            <SwiperSlide key={testimonial.id}>
              <div className="relative mt-10">
                {/* Card */}
                <div
                  className="rounded-2xl p-5 shadow-sm relative bg-white border border-gray-200 flex flex-col"
                  style={{ aspectRatio: "1.4/1" }}
                >
                  {/* Quote Icon (inside card, top-left) */}
                  <div className="absolute -top-3 left-8">
                    <Comma />
                  </div>

                  {/* Profile Image (center, overlapping top border) */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 bg-white shadow-md">
                      <Image
                        src={testimonial.profileImage}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="mt-8 mb-3 bg-[#F4F4F4] p-3 rounded-2xl flex-1">
                    <p
                      className="leading-relaxed text-sm font-semibold"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "13px",
                        lineHeight: "1.4",
                        color: "#4a5568",
                      }}
                    >
                      {testimonial.review}
                    </p>
                  </div>

                  {/* Name and Rating */}
                  <div className="flex flex-row justify-between items-center gap-1 mt-auto">
                    <h4
                      className="font-semibold text-sm"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "#013F5E",
                      }}
                    >
                      {testimonial.name}
                    </h4>
                    {renderStars({ rating: testimonial.rating })}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .testimonials-swiper .swiper-slide {
          height: auto;
        }

        .testimonials-swiper {
          padding-bottom: 2rem;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
