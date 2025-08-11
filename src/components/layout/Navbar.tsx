// components/Navbar.tsx
import Image from "next/image";
import { FaBell, FaMicrophone, FaRegBell } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-[#f6f6f6] px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Left Group */}
      <div></div>
      <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 gap-4">
        {/* Logo */}
        <Image
          src="/assets/icons/logo.jpeg"
          alt="Play Pro Logo"
          width={48}
          height={48}
          className="object-contain"
        />

        {/* Search Box */}
        <div className="flex items-center border border-blue-300 rounded-full px-4 py-2 w-[350px] shadow-inner">
          <FaMicrophone className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search For Fields"
            className="flex-1 outline-none text-gray-500 placeholder-gray-400 text-sm bg-transparent"
          />
        </div>

        {/* Bell Icon */}
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 transition">
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-white shadow-sm"
          >
            <FaRegBell className="text-orange-400" />
          </button>
        </div>

        {/* Login Button */}
        <a
          href="/login"
          className="text-white px-6 py-2 rounded-full text-center"
          style={{
            background: "#013F5E",
            boxShadow:
              "0px 2.81px 7.58px 1.87px #FFFFFFB2 inset, 0px 3.74px 3.74px 0px #00000040",
          }}
        >
          Login
        </a>
      </div>

      {/* Language Selector */}
      <div className="flex place-content-end gap-2 bg-white rounded-full px-3 py-1 shadow-md">
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
