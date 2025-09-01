"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaTelegramPlane,
  FaInstagram,
  FaFigma,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#6D0E8233] relative text-black mt-20">
      {/* Top Banner */}
      <div className="bg-gray-200 z-20 w-[90%] lg:w-[80%] absolute -top-12 left-1/2 transform -translate-x-1/2 rounded-lg shadow-md py-4">
        <div className="max-w-6xl mx-auto px-3 md:px-6 md:py-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold text-black text-center md:text-left">
            PlayPro simplifies sports for everyone
          </h2>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <span className="text-sm md:text-base font-medium text-black">
              Let&apos;s do it! →
            </span>
            <button className="bg-[#6D0E82] text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition">
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {/* Logo */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/footerLogo.png"
                alt="PlayPro Logo"
                width={200}
                height={200}
                className="object-contain w-50"
              />
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Use Cases</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/history"
                  className="text-black hover:text-[#6D0E82] transition-colors"
                >
                  Ground Booking
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/products"
                  className="text-black hover:text-[#6D0E82] transition-colors"
                >
                  Products
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href="/play-match"
                  className="text-black hover:text-[#6D0E82] transition-colors"
                >
                  Play Match
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-black hover:text-[#6D0E82] transition-colors"
                >
                  Demo
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-black hover:text-[#6D0E82] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-black hover:text-[#6D0E82] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Let's do it + Subscribe */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-6">Let&apos;s do it!</h3>

            {/* Social Icons */}
            <div className="flex gap-4 mb-8">
              {[FaFacebookF, FaTwitter, FaGithub, FaTelegramPlane, FaInstagram, FaFigma].map(
                (Icon, idx) => (
                  <Link
                    href="#"
                    key={idx}
                    className="w-10 h-10 border border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition"
                  >
                    <Icon className="text-black text-lg" />
                  </Link>
                )
              )}
            </div>

            {/* Subscribe */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Subscribe</h4>
              <p className="text-sm leading-relaxed text-black">
                Subscribe to stay tuned for new web design and latest updates.
                Let&apos;s do it!
              </p>

              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email Address"
                  className="flex-1 px-4 py-3 border border-black rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-[#6D0E82] transition"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#6D0E82] text-white rounded-lg font-medium hover:opacity-90 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-black pb-20 md:pb-0 lg:flex justify-between items-center">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-2 md:gap-6 text-black text-sm">
          <Link href="/privacy-policy" className="hover:text-[#6D0E82]">
            Privacy Policy
          </Link>
          <Link href="/terms-and-condition" className="hover:text-[#6D0E82]">
            Terms of Use
          </Link>
          <Link href="/refund-policy" className="hover:text-[#6D0E82]">
            Sales and Refunds
          </Link>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-4 text-black text-center text-sm">
          © {new Date().getFullYear()} All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
