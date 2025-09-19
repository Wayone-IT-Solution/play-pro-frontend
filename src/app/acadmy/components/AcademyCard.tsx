"use client"
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export interface Academy {
  id: string;
  name: string;
  description: string;
  coach: string;
  timing: string;
  rating: number;
  logo: string;
  primaryColor: string; 
  secondaryColor: string; 
}

interface AcademyCardProps {
  academy: Academy;
  onRegister?: () => void;
}

const AcademyCard: React.FC<AcademyCardProps> = ({ academy, onRegister }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        size={16}
        className={`${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs">
      {/* Academy Logo */}
      <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
        {academy.logo ? (
          <Image
            src={academy.logo}
            alt={academy.name}
            layout="fill"
            objectFit="contain"
            className="p-4" // Add padding to the image itself
          />
        ) : (
          <span className="text-6xl text-gray-400">⚽</span>
        )}
      </div>

      <div className="p-4">
        {/* Academy Name and Rating */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-800 text-base">
            {academy.name}
          </h3>
          <div className="flex items-center gap-1">
            {renderStars(academy.rating)}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {academy.description}
        </p>

        {/* Coach Information */}
        <p className="text-gray-700 font-medium text-xs mb-1">
          {academy.coach} - Football coach
        </p>

        {/* Timing */}
        <p className="text-gray-600 text-xs mb-4">
          Slot time - {academy.timing}
        </p>

        {/* Register Button */}
        <button
          onClick={onRegister}
          className="w-full py-3 rounded-md text-white font-semibold text-sm transition-colors"
          style={{ backgroundColor: '#932AAA' }} 
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default AcademyCard;