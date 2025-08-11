"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

interface FormData {
  email: string;
  password: string;
  agreeToTerms: boolean;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const handleGetOTP = () => {
    console.log("Get OTP clicked for:", formData.email);
    // Handle OTP logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCheckbox = () => {
    setFormData((prev) => ({
      ...prev,
      agreeToTerms: !prev.agreeToTerms,
    }));
  };

  return (
    <div className="flex h-full p-10 relative overflow-hidden">
      {/* Blue border at top */}
      {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-400 z-10" /> */}

      {/* Left Section - Stadium Image */}
      <div className="w-1/2 relative rounded-2xl overflow-hidden flex-shrink-0">
        <Image
          src="/assets/stadium.png"
          alt="Stadium"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/60" />

        {/* Back button */}
        <button className="absolute top-5 right-5 bg-white/20 text-white border-none px-4 py-2 rounded-full text-sm cursor-pointer backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center gap-2">
          Back To Website →
        </button>

        {/* Text overlay */}
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-3xl font-semibold leading-tight mb-5">
            PlayPro simplifies sports
            <br />
            for everyone
          </h1>
          <div className="flex gap-2">
            <div className="w-8 h-1 bg-white rounded-sm" />
            <div className="w-8 h-1 bg-white/30 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-1/2 flex items-center justify-center p-10 relative">
        <div className="w-full max-w-md">
          {/* Form Header */}
          <div className="mb-10">
            <h2 className="text-gray-800 text-3xl font-semibold mb-2">
              Login to your account
            </h2>
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-purple-600 hover:underline">
                Signup
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-6 relative">
              <label
                htmlFor="email"
                className="block text-gray-800 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-600 transition-colors pr-28"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {/* <button
                type="button"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-purple-600 text-white border-none px-4 py-2 rounded-md text-xs font-medium cursor-pointer hover:bg-purple-700 transition-colors"
                onClick={handleGetOTP}
              >
                Get OTP
              </button> */}
            </div>

            {/* Password Field */}
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-gray-800 text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="flex gap-3">
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-600 transition-colors pr-12"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-none border-none cursor-pointer text-gray-600 hover:text-gray-800 text-base p-1"
                    onClick={togglePasswordVisibility}
                  >
                    <FaEye />
                  </button>
                </div>
                <button
                  type="button"
                  className="whitespace-nowrap bg-[#6D54B5] text-white border-none px-4 py-2 rounded-md text-xs font-medium cursor-pointer hover:bg-purple-700 transition-colors"
                  onClick={handleGetOTP}
                >
                  Get OTP
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 mb-6">
              <div
                className={`w-5 h-5 border-2 rounded cursor-pointer flex-shrink-0 mt-0.5 transition-all ${
                  formData.agreeToTerms
                    ? " bg-[#6D54B5]  border-[#6D54B5] text-white"
                    : "border-gray-600"
                }`}
                onClick={toggleCheckbox}
              >
                {formData.agreeToTerms && (
                  <span className="block text-white text-xs leading-4 text-center">
                    ✓
                  </span>
                )}
              </div>
              <div className="text-gray-600 text-sm leading-relaxed">
                Agree to the{" "}
                <Link href="/terms" className=" text-[#6D54B5] hover:underline">
                  Terms & Conditions
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#6D54B5] to-[#6D54B5] text-white border-none py-4 rounded-lg text-base font-semibold cursor-pointer hover:-translate-y-0.5 transition-transform"
            >
              Login
            </button>
          </form>

          {/* Sports Illustration */}
          <div className="">
            <Image
              src="/assets/ball.png"
              alt="Sports Illustration"
              width={150}
              height={150}
              className="object-contain w-fit mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
