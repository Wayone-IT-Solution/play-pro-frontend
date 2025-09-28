"use client"
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { getLocalizedText, getLocalizedValues } from "@/hooks/general";
import Link from "next/link";

interface AcademyCardProps { academy: any }

const AcademyCard: React.FC<AcademyCardProps> = ({ academy }) => {
  // const renderStars = (rating: number) => {
  //   return Array.from({ length: 5 }, (_, index) => (
  //     <FaStar
  //       key={index}
  //       size={16}
  //       className={`${index < rating ? "text-yellow-400" : "text-gray-300"
  //         }`}
  //     />
  //   ));
  // };
  const coach = getLocalizedValues(academy?.coaches?.[0]);
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full">
      {/* Academy Logo */}
      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
        {academy.imageUrl ? (
          <Image
            layout="fill"
            alt={academy.name}
            src={academy.imageUrl}
            objectFit="contain"
            className="p-4" // Add padding to the image itself
          />
        ) : (
          <span className="text-6xl text-gray-400">⚽</span>
        )}
      </div>

      <div className="p-4 pb-0">
        {/* Academy Name and Rating */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold line-clamp-1 text-gray-800 text-lg">
            {academy.name}
          </h3>
          <div className="flex items-center gap-1">
            <div className="flex items-center space-x-1">
              <span className="pr-1 font-medium text-gray-700">
                {academy.rating || 4.5}
              </span>
              <FaStar size={16} className="text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
          {academy.description}
        </p>

        {/* Coach Information */}
        {coach?.name &&
          <p className="text-gray-800 line-clamp-2 font-medium text-xs mb-1">
            {coach.name} - {academy?.sports?.join(", ")} coach
          </p>
        }

        {/* Timing */}
        <p className="text-gray-600 text-xs mt-2 mb-4">
          {getLocalizedText("Slot time", "وقت الحجز")} - {academy.startTime} - {academy.endTime}
        </p>

      </div>
      <div>
        <Link
          href={`/academy/${academy._id}`}
          passHref
          legacyBehavior
        >
          <a
            className="w-full py-3 cursor-pointer rounded-b-2xl text-white font-semibold text-sm transition-colors text-center block"
            style={{ backgroundColor: "#014999" }}
          >
            {getLocalizedText("Register Now", "سجّل الآن")}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AcademyCard;