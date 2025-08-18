"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMicrophone, FaRegBell, FaUserCircle } from "react-icons/fa";
import { Fetch } from "@/utils/axios";
import emitter from "@/utils/eventEmitter";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
  });

  // Use ref to store abort controller for cleanup
  const abortControllerRef: any = useRef(null);

  // Cache user data to avoid unnecessary API calls
  const userDataRef: any = useRef(null);
  const lastFetchTimeRef = useRef(0);
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchUserData = useCallback(async (forceRefresh = false) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsLoggedIn(false);
        setFormData({ firstName: "" });
        return;
      }

      // Check cache validity
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

      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      setLoading(true);

      const res: any = await Fetch("/api/user", {}, 5000, true, false);

      if (res.success) {
        const userData = {
          firstName: res.data.firstName || "",
        };

        // Update cache
        userDataRef.current = userData;
        lastFetchTimeRef.current = now;

        setFormData(userData);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setFormData({ firstName: "" });
        userDataRef.current = null;
        console.error("❌ API returned error:", res.message);
      }
    } catch (err: any) {
      // Don't log abort errors
      if (err.name !== "AbortError") {
        console.error("❌ Error fetching user data:", err);
        setIsLoggedIn(false);
        setFormData({ firstName: "" });
        userDataRef.current = null;
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  // Handle login event
  const handleLogin = useCallback(() => {
    fetchUserData(true); // Force refresh on login
  }, [fetchUserData]);

  // Handle logout event
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setFormData({ firstName: "" });
    userDataRef.current = null;
    lastFetchTimeRef.current = 0;
    localStorage.removeItem("accessToken");
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Event emitter management
  useEffect(() => {
    // Add event listeners
    emitter.on("login", handleLogin);
    emitter.on("logout", handleLogout);

    // Cleanup function
    return () => {
      // Remove event listeners
      emitter.off("login", handleLogin);
      emitter.off("logout", handleLogout);

      // Cancel any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [handleLogin, handleLogout]);

  // Auto-refresh token validation (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("accessToken");
      if (token && isLoggedIn) {
        // Only refresh if cache is expired
        const now = Date.now();
        if (now - lastFetchTimeRef.current > CACHE_DURATION) {
          fetchUserData();
        }
      }
    }, 10 * 60 * 1000); // Check every 10 minutes

    return () => clearInterval(interval);
  }, [isLoggedIn, fetchUserData]);

  return (
    <nav className="bg-[#f6f6f6] fixed w-full top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm">
      {/* Left Group Placeholder */}
      <div className="hidden sm:block"></div>

      {/* Center Group */}
      <div className="flex flex-nowrap items-center justify-between bg-white rounded-full shadow-md px-3 sm:px-4 py-2 gap-3 sm:gap-4 w-full sm:w-auto">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/playproLogo.png"
            alt="Play Pro Logo"
            width={150}
            height={150}
            className="object-contain"
            priority
          />
        </Link>

        {/* Search Box */}
        <div className="hidden md:flex items-center border border-blue-300 rounded-full px-3 py-1 sm:px-4 sm:py-2 w-full sm:w-[650px] shadow-inner">
          <FaMicrophone className="text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search For Fields"
            className="flex-1 outline-none text-gray-500 placeholder-gray-400 text-sm bg-transparent"
          />
        </div>

        {/* Bell Icon + Button */}
        <div className="flex gap-3 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 transition">
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-white shadow-sm"
              aria-label="Notifications"
            >
              <FaRegBell className="text-orange-400" />
            </button>
          </div>

          {/* Conditional Button with Loading State */}
          {loading ? (
            <div
              className="flex items-center gap-2 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base animate-pulse"
              style={{
                background: "#013F5E",
                boxShadow:
                  "0px 2.81px 7.58px 1.87px #FFFFFFB2 inset, 0px 3.74px 3.74px 0px #00000040",
              }}
            >
              Loading...
            </div>
          ) : isLoggedIn ? (
            <Link
              href="/update-profile"
              className="flex items-center gap-2 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base hover:opacity-90 transition-opacity"
              style={{
                background: "#013F5E",
                boxShadow:
                  "0px 2.81px 7.58px 1.87px #FFFFFFB2 inset, 0px 3.74px 3.74px 0px #00000040",
              }}
            >
              <FaUserCircle className="text-lg" />
              <span className="max-w-20 truncate">
                {formData?.firstName || "User"}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-white px-4 sm:px-6 py-2 rounded-full text-center text-sm sm:text-base hover:opacity-90 transition-opacity"
              style={{
                background: "#013F5E",
                boxShadow:
                  "0px 2.81px 7.58px 1.87px #FFFFFFB2 inset, 0px 3.74px 3.74px 0px #00000040",
              }}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Language Selector */}
      <div className="hidden sm:flex place-content-end gap-2 bg-white rounded-full px-3 py-1 shadow-md">
        <span className="text-gray-600 text-sm">En</span>
        <Image
          src="/us-flag.png"
          alt="English"
          width={20}
          height={20}
          className="rounded-full"
        />
      </div>
    </nav>
  );
}
