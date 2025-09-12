"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getLocalizedValues } from "@/hooks/general";

interface Banner {
  _id: number;
  slug: string;
  title: string;
  order: number;
  image: string;
  status: string;
  position: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  deletedAt: string | null;
  systemGenerated: boolean;
}

interface BannerSwiperProps {
  banners: Banner[];
}

export default function BannerSwiper({ banners }: BannerSwiperProps) {
  return (
    <div className="relative w-full">
      <Swiper
        loop={true}
        speed={1000}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {banners?.length > 0 && banners.map((banner) => {
          banner = getLocalizedValues(banner);
          return <SwiperSlide key={banner?._id}>
            <div className="relative w-full min-h-screen">
              <Link passHref href={`${banner?.slug}`}>
                <Image
                  alt={banner?.title}
                  src={`${banner?.image}`}
                  width={100}
                  height={100}
                  priority
                  unoptimized
                  className="object-fill w-full h-96"
                />
              </Link>
            </div>
          </SwiperSlide>
        })}
      </Swiper>
    </div>
  );
}
