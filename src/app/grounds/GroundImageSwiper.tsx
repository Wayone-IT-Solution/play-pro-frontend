"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface GroundImageSwiperProps {
  images: string[];
  name: string;
}

const GroundImageSwiper: React.FC<GroundImageSwiperProps> = ({
  images,
  name,
}) => {
  return (
    <div>
      <div className="relative w-full h-full rounded-[48px] border-6 border-[#013F5E] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000, // har 3 sec baad slide change hoga
            disableOnInteraction: false, // user interact kare to bhi autoplay continue rahe
          }}
          loop={true} // infinite loop
          speed={800} // smooth transition speed
          className="w-full h-full"
        >
          {images.length > 0 ? (
            images.map((src, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={src}
                  alt={`${name} - ${idx + 1}`}
                  width={500}
                  height={500}
                  className="object-cover lg:h-full w-full aspect-square lg:aspect-auto"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <Image
                src="/assets/ground.png"
                alt={name ?? "Ground"}
                width={500}
                height={500}
                className="object-cover lg:h-full w-full aspect-square lg:aspect-auto"
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default GroundImageSwiper;
