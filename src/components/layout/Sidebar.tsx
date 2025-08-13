import React from "react";
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
    <div className="fixed top-1/2 -translate-y-1/2 left-4 flex flex-col items-center gap-5 bg-white rounded-full p-4 shadow-2xl z-20">
      <FaHome className="text-[#013F5E] text-xl cursor-pointer" />
      <FaSearch className="text-[#013F5E] text-xl cursor-pointer" />
      <FaUsers className="text-[#013F5E] text-xl cursor-pointer" />
      <FaMapMarkerAlt className="text-[#013F5E] text-xl cursor-pointer" />
      <FaCalendarAlt className="text-[#013F5E] text-xl cursor-pointer" />
      <FaUser className="text-[#013F5E] text-xl cursor-pointer" />
    </div>
  );
};

export default Sidebar;
