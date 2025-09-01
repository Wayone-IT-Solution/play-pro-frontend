"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import { Fetch } from "@/utils/axios";
import emitter from "@/utils/eventEmitter";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ firstName: "" });

  const abortControllerRef: any = useRef(null);
  const userDataRef: any = useRef(null);
  const lastFetchTimeRef = useRef(0);

  const CACHE_DURATION = 5 * 60 * 1000; // 5 min

  const fetchUserData = useCallback(async (forceRefresh = false) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsLoggedIn(false);
        setFormData({ firstName: "" });
        return;
      }

      const now = Date.now();

      if (
        !forceRefresh &&
        userDataRef.current &&
        now - lastFetchTimeRef.current < CACHE_DURATION
      ) {
        setFormData(userDataRef.current);
        setIsLoggedIn(true);
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setLoading(true);

      const res: any = await Fetch("/api/user", {}, 5000, true, false);

      if (res.success) {
        const userData = { firstName: res.data.firstName || "" };
        emitter.emit("isLoggedIn", res.data);

        userDataRef.current = userData;
        lastFetchTimeRef.current = now;

        setFormData(userData);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setFormData({ firstName: "" });
        userDataRef.current = null;
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setIsLoggedIn(false);
        setFormData({ firstName: "" });
        userDataRef.current = null;
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  const handleLogin = useCallback(() => {
    fetchUserData(true);
  }, [fetchUserData]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setFormData({ firstName: "" });
    userDataRef.current = null;
    lastFetchTimeRef.current = 0;
    localStorage.removeItem("accessToken");
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    emitter.on("login", handleLogin);
    emitter.on("logout", handleLogout);

    return () => {
      emitter.off("login", handleLogin);
      emitter.off("logout", handleLogout);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [handleLogin, handleLogout]);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("accessToken");

      if (token && isLoggedIn) {
        const now = Date.now();
        if (now - lastFetchTimeRef.current > CACHE_DURATION) {
          fetchUserData();
        }
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isLoggedIn, fetchUserData]);

  return (
    <nav className="bg-white shadow-sm px-4 sm:px-6 py-3 sm:py-4 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/newLogo.png"
              alt="Play Pro Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-[#6D0E82] hover:text-gray-900 font-inter text-sm font-bold"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className="text-[#6D0E82] hover:text-gray-900 font-inter text-sm font-bold"
            >
              About US
            </Link>
            <Link
              href="/grounds"
              className="text-[#6D0E82] hover:text-gray-900 font-inter text-sm font-bold"
            >
              Search Fields
            </Link>
            <Link
              href="/"
              className="text-[#6D0E82] hover:text-gray-900 font-inter text-sm font-bold"
            >
              Play Pro Shop
            </Link>
            <Link
              href="/contact-us"
              className="text-[#6D0E82] hover:text-gray-900 font-inter text-sm font-bold"
            >
              Contact US
            </Link>
          </div>
        </div>

        {/* Google Translate */}
        <div className="translate-container">
          <div id="google_translate_element"></div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 mr-10">
          {loading ? (
            <div
              className="px-6 py-2 rounded-lg text-white font-inter text-sm font-bold animate-pulse"
              style={{ backgroundColor: "#6D0E82" }}
            >
              Loading...
            </div>
          ) : isLoggedIn ? (
            <Link
              href="/update-profile"
              className="flex items-center gap-2 text-white px-4 sm:px-6 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity font-inter font-bold"
              style={{ backgroundColor: "#6D0E82" }}
            >
              <FaUserCircle className="text-lg" />
              <span className="max-w-20 truncate">
                {formData?.firstName || "User"}
              </span>
            </Link>
          ) : (
            <button
              className="px-6 py-2 rounded-lg text-white font-inter text-sm font-bold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#6D0E82" }}
            >
              Login
            </button>
          )}

          {/* List Field */}
          <Link href="/grounds" passHref>
            <button
              className="px-6 py-2 rounded-lg text-white font-inter text-sm font-bold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#6D0E82" }}
              type="button"
            >
              List Field
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
