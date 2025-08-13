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
  };

  const handleGetOTP = () => {
    console.log("Get OTP clicked for:", formData.email);
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
      {/* Left Section */}
      <div className="w-1/2 relative rounded-2xl overflow-hidden flex-shrink-0">
        <Image
          src="/assets/stadium.png"
          alt="Stadium"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/60" />

        <button className="absolute top-5 right-5 bg-white/20 text-white border-none px-4 py-2 rounded-full text-sm cursor-pointer backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center gap-2">
          Back To Website →
        </button>

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

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center p-10 relative">
        <div className="w-full max-w-md">
          {/* Form Header */}
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-gray-800 text-3xl font-semibold mb-2">
              Login to your account
            </h2>
          </div>
          <div className="flex mt-2 mb-6 w-fit relative gap-3 items-center">
            <p className="text-gray-600 text-lg font-semibold">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-purple-600 hover:underline">
                Signup
              </Link>
            </p>
            {/* <Image
              src="/assets/ball.png"
              alt="Sports Illustration"
              width={80}
              height={80}
              className="object-contain absolute -right-24"
            /> */}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4 relative">
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
                className="w-full px-4 py-4 rounded-lg text-sm bg-gray-200 focus:outline-none focus:border-purple-600 transition-colors pr-28"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
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
                    className="w-full px-4 py-4 rounded-lg text-sm bg-gray-200 focus:outline-none focus:border-purple-600 transition-colors pr-12"
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

            {/* Terms */}
            <div className="flex items-start gap-3 mb-4">
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#6D54B5] to-[#6D54B5] text-white border-none py-4 rounded-lg text-base font-semibold cursor-pointer hover:-translate-y-0.5 transition-transform"
            >
              Login
            </button>
          </form>
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
