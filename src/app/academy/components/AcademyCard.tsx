"use client"
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { getLocalizedText, getLocalizedValues } from "@/hooks/general";
import Link from "next/link";

interface AcademyCardProps { academy: any }

const AcademyCard: React.FC<AcademyCardProps> = ({ academy }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        size={16}
        className={`${index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
      />
    ));
  };
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

      <div className="p-4 mb-2">
        {/* Academy Name and Rating */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold line-clamp-1 text-gray-800 text-lg">
            {academy.name}
          </h3>
          <div className="flex items-center gap-1">
            {renderStars(academy.rating || 4)}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {academy.description}
        </p>

        {/* Coach Information */}
        {coach?.name &&
          <p className="text-gray-700 line-clamp-2 font-medium text-sm mb-1">
            {coach.name} - {academy?.sports?.join(", ")} coach
          </p>
        }

        {/* Timing */}
        <p className="text-gray-600 text-sm mb-4">
          {getLocalizedText("Slot time", "وقت الحجز")} - {academy.startTime} - {academy.endTime}
        </p>

        {/* Register Button */}
        <Link href={"/academy/" + academy._id}
          className="w-full py-3 cursor-pointer rounded-md text-white font-semibold text-sm transition-colors"
          style={{ backgroundColor: '#014999' }}
        >
          <button className="w-full">
            {getLocalizedText("Register Now", "سجّل الآن")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AcademyCard;