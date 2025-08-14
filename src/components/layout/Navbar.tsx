// components/Navbar.tsx
import Image from "next/image";
import Link from "next/link";
import { FaBell, FaMicrophone, FaRegBell } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-[#f6f6f6] fixed w-full top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm">
      {/* Left Group Placeholder */}
      <div className="hidden sm:block"></div>

      {/* Center Group */}
      <div className="flex flex-nowrap items-center justify-between bg-white rounded-full shadow-md px-3 sm:px-4 py-2 gap-3 sm:gap-4 w-full sm:w-auto">
        {/* Logo */}
        <Image
          src="/assets/icons/logo.jpeg"
          alt="Play Pro Logo"
          width={40}
          height={40}
          className="object-contain"
        />

        {/* Search Box */}
        <div className="hidden md:flex items-center border border-blue-300 rounded-full px-3 py-1 sm:px-4 sm:py-2 w-full sm:w-[350px] shadow-inner">
          <FaMicrophone className="text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search For Fields"
            className="flex-1 outline-none text-gray-500 placeholder-gray-400 text-sm bg-transparent"
          />
        </div>

        {/* Bell Icon */}
        <div className="flex gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 transition">
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-white shadow-sm"
            >
              <FaRegBell className="text-orange-400" />
            </button>
          </div>

          {/* Login Button */}
          <Link
            href="/login"
            className="text-white px-4 sm:px-6 py-2 rounded-full text-center text-sm sm:text-base"
            style={{
              background: "#013F5E",
              boxShadow:
                "0px 2.81px 7.58px 1.87px #FFFFFFB2 inset, 0px 3.74px 3.74px 0px #00000040",
            }}
          >
            Login
          </Link>
        </div>
      </div>

      {/* Language Selector */}
      <div className="hidden sm:flex place-content-end gap-2 bg-white rounded-full px-3 py-1 shadow-md">
        <span className="text-gray-600 text-sm">En</span>
        <img
          src="/us-flag.png"
          alt="English"
          className="h-5 w-5 rounded-full"
        />
      </div>
    </nav>
  );
}
