"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaHome,
  FaMapMarkerAlt,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Modal from "../modals/Modal";
import LogoutModal from "../modals/LogoutModal";
import emitter from "@/utils/eventEmitter";

const Sidebar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // ✅ initial fetch
  useEffect(() => {
    const fetchUserData = () => {
      setIsLoggedIn(true);
    };

    // ✅ listen for login/logout events
    emitter.on("login", fetchUserData);
    emitter.on("logout", () => {
      setIsLoggedIn(false);
    });

    return () => {
      emitter.off("login", fetchUserData);
      emitter.off("logout", () => {
        setIsLoggedIn(false);
      });
    };
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setOpenModal(false);
    setIsLoggedIn(false);
    emitter.emit("logout");
    router.replace("/login");
  };

  return (
    <div
      className="
        fixed z-50 flex flex-col items-center justify-center 
        bg-white rounded-full shadow-2xl
        top-1/2 -translate-y-1/2 
        left-2 p-2 gap-3
        sm:left-3 sm:px-3 sm:py-4 sm:gap-4 
        md:left-4 md:px-3 md:py-6 md:gap-6
      "
    >
      <Link href="/">
        <FaHome className="text-[#013F5E] text-lg sm:text-xl cursor-pointer" />
      </Link>
      <Modal isVisible={openModal} onClose={handleCloseModal}>
        <LogoutModal
          handleDelete={handleLogout}
          handleDeleteModal={handleCloseModal}
        />
      </Modal>
      <Link href="/grounds">
        <FaSearch className="text-[#013F5E] text-lg sm:text-xl cursor-pointer" />
      </Link>
      <Link href="/grounds">
        <FaMapMarkerAlt className="text-[#013F5E] text-lg sm:text-xl cursor-pointer" />
      </Link>
      <Link href="/grounds">
        <FaCalendarAlt className="text-[#013F5E] text-lg sm:text-xl cursor-pointer" />
      </Link>

      {!isLoggedIn ? (
        <Link href="/login">
          <FaUser className="text-[#013F5E] text-lg sm:text-xl cursor-pointer" />
        </Link>
      ) : (
        <button onClick={() => setOpenModal(true)}>
          <FaSignOutAlt className="text-red-600 text-lg sm:text-xl cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
