"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaSnapchatGhost,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";

import { getLocalizedText } from "@/hooks/general";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  const socialIcons = [
    { Icon: FaInstagram, link: "https://www.instagram.com/playprodammam/" },
    { Icon: FaTwitter, link: "https://x.com/PlayproDammam" },
    { Icon: FaSnapchatGhost, link: "https://www.snapchat.com/@playprodammam" },
    { Icon: FaTiktok, link: "https://www.tiktok.com/@playprodammam?lang=en" },
    {
      Icon: FaFacebookF,
      link: "https://www.facebook.com/profile.php?id=61578259051409",
    },
  ];

  return (
    <footer className="bg-[#6D0E8233] relative text-black mt-20">
      {/* Top Banner */}
      <div className="bg-gray-200 z-20 w-[90%] lg:w-[80%] absolute -top-12 left-1/2 transform -translate-x-1/2 rounded-lg shadow-md py-4">
        <div className="max-w-7xl mx-auto px-3 md:px-6 md:py-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold text-black text-center md:text-left">
            {getLocalizedText(
              "PlayPro simplifies sports for everyone",
              "بلاي برو تبسط الرياضة للجميع"
            )}
          </h2>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <span className="text-sm md:text-base font-medium text-black">
              {getLocalizedText("Let's do it! →", "لنبدأ! →")}
            </span>
            <button className="bg-[#6D0E82] text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition">
              {getLocalizedText("Get started", "ابدأ الآن")}
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {/* Logo */}
          <div className="space-y-6">
            <Image
              src="/assets/footerLogo.png"
              alt={getLocalizedText("PlayPro Logo", "شعار بلاي برو")}
              width={200}
              height={200}
              className="object-contain w-50"
            />
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {getLocalizedText("Use Cases", "حالات الاستخدام")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/history"
                  className="text-black hover:text-[#6D0E82] transition-colors"
                >
                  {getLocalizedText("Ground Booking", "حجز الملاعب")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {getLocalizedText("Company", "الشركة")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-black hover:text-[#6D0E82] transition-colors"
                >
                  {getLocalizedText("About Us", "من نحن")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-black hover:text-[#6D0E82] transition-colors"
                >
                  {getLocalizedText("Contact Us", "تواصل معنا")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-black hover:text-[#6D0E82] transition-colors"
                >
                  {getLocalizedText("Blogs", "المدونات")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Let's do it + Subscribe */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-6">
              {getLocalizedText("Let's do it!", "لنبدأ!")}
            </h3>

            {/* Social Icons */}
            <div className="flex gap-4 mb-8">
              {socialIcons.map(({ Icon, link }: any, idx) => (
                <Link
                  href={link}
                  key={idx}
                  target="blank"
                  className="w-10 h-10 border border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition"
                >
                  <Icon className="text-lg" />
                </Link>
              ))}
            </div>

            {/* Subscribe */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">
                {getLocalizedText("Subscribe", "اشترك")}
              </h4>
              <p className="text-sm leading-relaxed text-black">
                {getLocalizedText(
                  "Subscribe to stay tuned for new web design and latest updates. Let's do it!",
                  "اشترك لتبقى على اطلاع على أحدث تصميمات الويب والتحديثات الجديدة. لنبدأ!"
                )}
              </p>

              <form onSubmit={handleSubscribe} className="flex w-fit gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={getLocalizedText(
                    "Enter your email Address",
                    "أدخل بريدك الإلكتروني"
                  )}
                  className="flex-1 px-4 py-3 border border-black w-fit rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-[#6D0E82] transition"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#6D0E82] text-white rounded-lg font-medium hover:opacity-90 transition"
                >
                  {getLocalizedText("Subscribe", "اشترك")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-black lg:flex justify-between items-center">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-2 md:gap-6 text-black text-sm">
          {/* <Link href="/privacy-policy" className="hover:text-[#6D0E82]">
            {getLocalizedText("Privacy Policy", "سياسة الخصوصية")}
          </Link>
          <Link href="/terms-and-condition" className="hover:text-[#6D0E82]">
            {getLocalizedText("Terms of Use", "شروط الاستخدام")}
          </Link>
          <Link href="/refund-policy" className="hover:text-[#6D0E82]">
            {getLocalizedText("Sales and Refunds", "المبيعات والاستردادات")}
          </Link> */}
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-4 md:py-4 text-black text-center text-sm">
          © {new Date().getFullYear()}{" "}
          {getLocalizedText("All Rights Reserved", "جميع الحقوق محفوظة")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
