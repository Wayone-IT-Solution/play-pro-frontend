"use client";

import React from "react";
import Image from "next/image";

const FieldsContainer: React.FC = () => {
  return (
    <div className="bg-white w-full px-8 py-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h1
          className="font-inter font-bold text-[49px] leading-[100%] tracking-[0%] text-black"
          style={{ fontStyle: "bold" }}
        >
          We've got Best Fields for everyone
        </h1>

        {/* Subheading */}
        <p
          className="mt-4 font-inter font-normal text-[29px] leading-[100%] tracking-[0%] text-gray-600"
          style={{ fontStyle: "normal" }}
        >
          Aliquam lacinia diam quis lacus euismod
        </p>

        {/* Image Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="w-full  relative">
            <Image
              src="/assets/football.png"
              alt="Field 1"
              width={400}
              height={400}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="w-full  relative">
            <Image
              src="/assets/football2.png"
              alt="Field 2"
              width={400}
              height={400}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="w-full relative">
            <Image
              src="/assets/football3.png"
              alt="Field 3"
              width={400}
              height={400}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="w-full relative">
            <Image
              src="/assets/football4.png"
              alt="Field 4"
              width={400}
              height={400}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldsContainer;
