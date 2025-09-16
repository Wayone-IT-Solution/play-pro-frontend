"use client";
import Link from "next/link";
import Image from "next/image";
import { Fetch } from "@/utils/axios";
import { LogOut } from "lucide-react";
import emitter from "@/utils/eventEmitter";
import { getLocalizedText } from "@/hooks/general";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState, useCallback, useRef } from "react";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ firstName: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      localStorage.removeItem("accessToken");
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
    emitter.emit("logout");
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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm px-4 sm:px-6 py-3 sm:py-4 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center w-full">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/newLogo.png"
              alt="Play Pro Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="flex justify-center items-center w-full mx-auto">
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-[#6D0E82] font-inter text-[13px] font-bold hover:text-gray-900">
                {getLocalizedText("Home", "الرئيسية")}
              </Link>
              <Link href="/about-us" className="text-[#6D0E82] font-inter text-[13px] font-bold hover:text-gray-900">
                {getLocalizedText("About Us", "معلومات عنا")}
              </Link>
              <Link href="/grounds" className="text-[#6D0E82] font-inter text-[13px] font-bold hover:text-gray-900">
                {getLocalizedText("Search Fields", "البحث عن الملاعب")}
              </Link>
              <Link href="/product" className="text-[#6D0E82] font-inter text-[13px] font-bold hover:text-gray-900">
                {getLocalizedText("Play Pro Shop", "متجر بلاي برو")}
              </Link>
              <Link href="/contact-us" className="text-[#6D0E82] font-inter text-[13px] font-bold hover:text-gray-900">
                {getLocalizedText("Contact Us", "اتصل بنا")}
              </Link>
              <Link href="/blogs" className="text-[#6D0E82] font-inter text-[13px] font-bold hover:text-gray-900">
                {getLocalizedText("News", "الأخبار")}
              </Link>
              <Link href="/gallery" className="text-[#6D0E82] font-inter text-[13px] font-bold hover:text-gray-900">
                {getLocalizedText("Gallery", "المعرض")}
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section (Desktop) */}
        <div className="flex items-center whitespace-nowrap gap-2">
          {loading ? (
            <div
              className="px-6 py-2 rounded-lg text-white font-inter text-sm font-bold animate-pulse"
              style={{ backgroundColor: "#6D0E82" }}
            >
              {getLocalizedText("Loading...", "جاري التحميل...")}
            </div>
          ) : isLoggedIn ? (
            <Link
              href="/update-profile"
              className="hidden lg:flex items-center gap-2 text-white px-4 py-2 rounded-lg text-xs font-inter font-medium hover:opacity-90"
              style={{ backgroundColor: "#6D0E82" }}
            >
              <FaUserCircle className="text-base" />
              <span className="max-w-20 truncate">{formData?.firstName || getLocalizedText("User", "المستخدم")}</span>
            </Link>
          ) : (
            <Link href="/login">
              <button
                className="px-4 py-2 rounded-lg cursor-pointer text-white font-inter text-xs font-medium hover:opacity-90"
                style={{ backgroundColor: "#6D0E82" }}
                onClick={handleLogin}
              >
                {getLocalizedText("Login", "تسجيل الدخول")}
              </button>
            </Link>
          )}

          <Link href="/cart" passHref className="hidden lg:block">
            <button
              className="px-4 py-2 rounded-lg cursor-pointer text-white font-inter text-xs font-medium hover:opacity-90"
              style={{ backgroundColor: "#6D0E82" }}
            >
              {getLocalizedText("My Cart", "سلة التسوق")}
            </button>
          </Link>

          <Link href="/sign-up" passHref className="hidden lg:block">
            <button
              className="px-4 py-2 rounded-lg cursor-pointer text-white font-inter text-xs font-medium hover:opacity-90"
              style={{ backgroundColor: "#6D0E82" }}
            >
              {getLocalizedText("Register Your Field", "سجل ملعبك")}
            </button>
          </Link>

          {isLoggedIn && (
            <button
              type="button"
              aria-label="Logout"
              onClick={handleLogout}
              className="p-2 rounded-full cursor-pointer hover:bg-red-100 hidden lg:block transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-500" />
            </button>
          )}

          <LanguageSwitcher />

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden ml-2 p-2 rounded-md text-[#6D0E82] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6D0E82]"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md border-t border-gray-200 px-4 py-4">
          <Link
            href="/"
            className="block py-2 text-[#6D0E82] font-inter font-bold hover:bg-gray-100 rounded"
            onClick={closeMobileMenu}
          >
            {getLocalizedText("Home", "الرئيسية")}
          </Link>
          <Link
            href="/about-us"
            className="block py-2 text-[#6D0E82] font-inter font-bold hover:bg-gray-100 rounded"
            onClick={closeMobileMenu}
          >
            {getLocalizedText("About Us", "معلومات عنا")}
          </Link>
          <Link
            href="/grounds"
            className="block py-2 text-[#6D0E82] font-inter font-bold hover:bg-gray-100 rounded"
            onClick={closeMobileMenu}
          >
            {getLocalizedText("Search Fields", "البحث عن الملاعب")}
          </Link>
          <Link
            href="/product"
            className="block py-2 text-[#6D0E82] font-inter font-bold hover:bg-gray-100 rounded"
            onClick={closeMobileMenu}
          >
            {getLocalizedText("Play Pro Shop", "متجر بلاي برو")}
          </Link>
          <Link
            href="/contact-us"
            className="block py-2 text-[#6D0E82] font-inter font-bold hover:bg-gray-100 rounded"
            onClick={closeMobileMenu}
          >
            {getLocalizedText("Contact Us", "اتصل بنا")}
          </Link>

          <div className="border-t border-gray-300 mt-2 pt-2">
            {loading ? (
              <div className="py-2 text-center text-sm font-inter font-bold text-[#6D0E82] animate-pulse">
                {getLocalizedText("Loading...", "جاري التحميل...")}
              </div>
            ) : isLoggedIn ? (
              <>
                <Link
                  href="/update-profile"
                  className="flex items-center gap-2 py-2 text-[#6D0E82] font-inter font-bold hover:bg-gray-100 rounded"
                  onClick={closeMobileMenu}
                >
                  <FaUserCircle />
                  <span>{formData.firstName || getLocalizedText("User", "المستخدم")}</span>
                </Link>
              </>
            ) : (
              <Link href="/login" onClick={closeMobileMenu}>
                <span className="block py-2 text-[#6D0E82] font-inter font-bold hover:bg-gray-100 rounded">
                  {getLocalizedText("Login", "تسجيل الدخول")}
                </span>
              </Link>
            )}

            <Link href="/cart" onClick={closeMobileMenu}>
              <span className="block py-2 text-[#6D0E82] font-inter font-bold hover:bg-gray-100 rounded">
                {getLocalizedText("My Cart", "سلة التسوق")}
              </span>
            </Link>

            <Link href="/sign-up" onClick={closeMobileMenu}>
              <span className="block py-2 text-[#6D0E82] font-inter font-bold hover:bg-gray-100 rounded">
                {getLocalizedText("Register Your Field", "سجل ملعبك")}
              </span>
            </Link>

            {isLoggedIn && (
              <button
                className="block w-full text-left pb-2 text-[#6D0E82] font-inter font-bold hover:bg-gray-100 rounded mt-2"
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                {getLocalizedText("Logout", "تسجيل الخروج")}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
