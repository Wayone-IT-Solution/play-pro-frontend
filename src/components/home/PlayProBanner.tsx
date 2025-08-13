import React from "react";
import Image from "next/image";

const PlayProBanner = () => {
  return (
    <div className="relative w-full h-[140vh] overflow-hidden">
      {/* Background image full width */}
      <Image
        src="/assets/banner.png"
        alt="Blue background with football player"
        fill
        className="object-cover"
        priority
      />

      {/* Right side booking card */}
      <div className="absolute bottom-28 right-12 border border-[#013F5E] bg-white rounded-[40px] p-6 w-72 shadow-xl z-20">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 text-center mb-4">
          Book Field
        </h3>

        {/* Form */}
        <div className="space-y-4">
          {/* Zip Code Field */}
          <label className="block text-sm font-medium text-gray-700">
            Enter Zip Code
          </label>
          <input
            type="text"
            placeholder="e.g. 452001"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Field Type Select */}
          <label className="block text-sm font-medium text-gray-700">
            Select Field Type
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Choose type</option>
            <option>Football</option>
            <option>Basketball</option>
            <option>Tennis</option>
            <option>Cricket</option>
          </select>

          {/* Button */}
          <button
            className="w-full text-white font-bold py-2.5 px-4 rounded-lg text-base cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              background: "#013F5E",
              boxShadow:
                "0px 3px 8.1px 2px #FFFFFFB2 inset, 0px 4px 4px 0px #00000040",
            }}
          >
            Search Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayProBanner;
