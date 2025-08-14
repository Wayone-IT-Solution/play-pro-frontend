"use client";

import React from "react";
import Image from "next/image";

const FieldsContainer: React.FC = () => {
  return (
    <div className="bg-white w-full px-4 sm:px-8 py-8 sm:py-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1
          className="font-inter font-bold text-2xl sm:text-4xl lg:text-[49px] leading-snug sm:leading-tight text-black"
          style={{ fontStyle: "bold" }}
        >
          We've got Best Fields for everyone
        </h1>

        {/* Subheading */}
        <p
          className="mt-3 sm:mt-4 font-inter font-normal text-base sm:text-xl lg:text-[29px] leading-snug text-gray-600"
          style={{ fontStyle: "normal" }}
        >
          Aliquam lacinia diam quis lacus euismod
        </p>

        {/* Image Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[
            "/assets/football.png",
            "/assets/football2.png",
            "/assets/football3.png",
            "/assets/football4.png",
          ].map((src, idx) => (
            <div key={idx} className="w-full relative">
              <Image
                src={src}
                alt={`Field ${idx + 1}`}
                width={400}
                height={400}
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldsContainer;
