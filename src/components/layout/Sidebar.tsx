"use client";

import React from "react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaHome,
  FaMapMarkerAlt,
  FaSearch,
  FaUser,
  FaUsers,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div
      className="
        fixed z-50 flex items-center justify-center gap-10 md:gap-5 bg-white rounded-full p-4 shadow-2xl
        sm:flex-col sm:top-1/2 sm:-translate-y-1/2 sm:left-4
        bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0
      "
    >
      <Link href="/">
        <FaHome className="text-[#013F5E] text-xl cursor-pointer" />
      </Link>
      <Link href="/grounds">
        <FaSearch className="text-[#013F5E] text-xl cursor-pointer" />
      </Link>
      <Link href="/update-profile">
        <FaUsers className="text-[#013F5E] text-xl cursor-pointer" />
      </Link>
      <Link href="/grounds">
        <FaMapMarkerAlt className="text-[#013F5E] text-xl cursor-pointer" />
      </Link>
      <Link href="/grounds">
        <FaCalendarAlt className="text-[#013F5E] text-xl cursor-pointer" />
      </Link>
      <Link href="/login">
        <FaUser className="text-[#013F5E] text-xl cursor-pointer" />
      </Link>
    </div>
  );
};

export default Sidebar;
