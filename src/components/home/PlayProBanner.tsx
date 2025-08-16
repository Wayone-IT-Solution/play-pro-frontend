import React from "react";
import Image from "next/image";

const PlayProBanner = ({ banners }: { banners?: any }) => {
  // console.log(banners);
  return (
    <div className="relative w-full lg:h-[140vh] overflow-hidden">
      {/* Background image full width */}
      <Image
        src={banners[0]?.image}
        alt="Blue background with football player"
        // fill
        unoptimized
        width={100}
        height={100}
        className="object-contain h-full mt-72 md:mt-0 w-full lg:object-cover"
        priority
      />

      {/* Right side booking card */}
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 md:left-auto md:right-12 md:translate-x-0 md:top-auto md:bottom-28 border border-[#013F5E] bg-white h-fit rounded-2xl md:rounded-[40px] p-4 md:p-6 w-[90%] md:w-72 shadow-xl z-20">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 text-center mb-4">
          Book Field
        </h3>

        {/* Form */}
        <div className="space-y-4">
          {/* Zip Code Field */}
          <div className="flex md:block gap-4 lg:space-y-2">
            <div className="w-1/2 md:w-full lg:space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Enter Zip Code
              </label>
              <input
                type="text"
                placeholder="e.g. 452001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2 md:w-full lg:space-y-2">
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
            </div>
          </div>

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
