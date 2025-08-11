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
    // Handle subscription logic here
    setEmail("");
  };

  return (
    <footer className="bg-[#013F5E] relative text-white mt-20">
      {/* Top banner */}
      <div className="bg-[#E5E5E5] w-[80%] absolute top-[-3.25rem] left-1/2 transform -translate-x-1/2 text-[#013F5E] py-4">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            PlayPro simplifies sports for everyone
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Let's do it! —</span>
            <button className="bg-[#013F5E] text-white px-6 py-2 rounded-full font-medium hover:bg-[#024a73] transition-colors">
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 pb-16 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Logo and tagline */}
          <div className="space-y-6">
            <div className="flex items-center mt-10 space-x-3">
              <Image
                src="/assets/footer.png"
                alt="PlayPro Logo"
                width={200}
                height={200}
                className="object-contain w-40"
              />
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Use Cases</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/ground-booking"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Ground Booking
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/play-match"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Play Match
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/teams"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Teams
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Let's do it! */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-6">Let's do it!</h3>

            {/* Social Icons */}
            <div className="flex gap-4 mb-8">
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <FaFacebookF className="text-white text-lg" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <FaTwitter className="text-white text-lg" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <FaGithub className="text-white text-lg" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <FaTelegramPlane className="text-white text-lg" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <FaInstagram className="text-white text-lg" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <FaFigma className="text-white text-lg" />
              </Link>
            </div>

            {/* Subscribe Section */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Subscribe</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Subscribe to stay tuned for new web design and latest updates.
                Let's do it!
              </p>

              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email Address"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-[#013F5E] rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white flex justify-between items-center">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms of Use
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Sales and Refunds
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Legal
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Site Map
          </Link>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-4 text-gray-400 text-center text-sm">
          © 2021 All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
