"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

interface FormData {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked }: any = e.target;
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
          <div className="mb-10 flex items-center gap-2">
            <h2 className="text-gray-800 text-3xl font-semibold mb-2">
              Create an account
            </h2>
            {/* <Image
              src="/assets/ball.png"
              alt="Sports Illustration"
              width={40}
              height={40}
              className="object-contain"
            /> */}
          </div>

          <div className="flex mb-6 gap-3 items-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:underline">
                Log in
              </Link>
            </p>
            <Image
              src="/assets/ball.png"
              alt="Sports Illustration"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          <form onSubmit={handleSubmit}>
            {/* First and Last Name */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-gray-800 text-sm font-medium mb-2"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-600 transition-colors"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-gray-800 text-sm font-medium mb-2"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-600 transition-colors"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Role select */}
            <div className="mb-6">
              <label
                htmlFor="role"
                className="block text-gray-800 text-sm font-medium mb-2"
              >
                Select your Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-600 transition-colors"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  eg: Admin, Owner, Player
                </option>
                <option value="Admin">Admin</option>
                <option value="Owner">Owner</option>
                <option value="Player">Player</option>
              </select>
            </div>

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
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
