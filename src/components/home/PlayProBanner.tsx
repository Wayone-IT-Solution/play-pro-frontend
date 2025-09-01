import React from "react";
import Image from "next/image";
import Link from "next/link";

const PlayProBanner = ({ banners }: { banners?: any }) => {
  return (
    <div className="relative w-full bg-white font-[Poppins] overflow-hidden">
      {/* Left Player Image */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] sm:w-[380px] lg:w-[460px] h-auto">
        <Image
          src="/assets/player1.png"
          alt="Football Player Left"
          width={460}
          height={460}
          priority
        />
      </div>

      {/* Right Player Image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] sm:w-[380px] lg:w-[460px] h-auto">
        <Image
          src="/assets/player2.png"
          alt="Football Player Right"
          width={460}
          height={460}
          priority
        />
      </div>

      {/* Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 py-16 sm:py-24">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug mb-28 text-[#2F0D46]">
          PlayPro simplifies <span className="text-[#2F0D46]">sp</span>
          <span className="text-gray-300">ort</span>
          <span className="text-[#2F0D46]">s</span>
          <br />
          for <span className="text-[#2F0D46]">everyon</span>
          <span className="text-gray-300">e</span>
        </h1>

        {/* Middle Card */}
        <div className="inline-block bg-white p-2 rounded-[48px] border-2 border-dashed border-gray-200 shadow-2xl">
          <div className="inline-block bg-white rounded-[44px] shadow-md border-2 border-dashed border-[#6D0E82] px-16 py-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/assets/newLogo.png"
                alt="PlayPro Logo"
                width={120}
                height={120}
                priority
              />
            </div>

            {/* Button */}
            <Link
              href="/grounds"
              className="inline-block bg-[#6D0E82] text-white px-8 py-3 rounded-full font-medium text-sm sm:text-base hover:opacity-90 transition"
            >
              Check Play pro fields
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayProBanner;
