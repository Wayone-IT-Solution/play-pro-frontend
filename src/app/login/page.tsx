"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { Post } from "@/utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import emitter from "@/utils/eventEmitter";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/");
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ handle login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.warn("Please agree to the Terms & Conditions");
      return;
    }

    try {
      setLoading(true);
      const res: any = await Post("/api/user/login", formData);
      if (res.success) {
        emitter.emit("login", res.data);
        router.replace("/"); // redirect after login
      } else {
        toast.warn(res.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      toast.warn("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full p-4 sm:p-6 md:p-10 relative overflow-hidden lg:px-24 mt-20">
      {/* Left Section */}
      <div className="w-full md:w-1/2 mb-20 relative rounded-2xl overflow-hidden flex-shrink-0 h-64 md:h-auto">
        <Image
          src="/assets/stadium.png"
          alt="Stadium"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/60" />

        <button
          onClick={() => router.push("/")}
          className="absolute top-5 right-5 bg-white/20 text-white border-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center gap-1 sm:gap-2"
        >
          Back To Website →
        </button>

        <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 text-white">
          <h1 className="text-xl sm:text-3xl font-semibold leading-tight mb-3 sm:mb-5">
            PlayPro simplifies sports
            <br className="hidden sm:block" />
            for everyone
          </h1>
          <div className="flex gap-2">
            <div className="w-6 sm:w-8 h-1 bg-white rounded-sm" />
            <div className="w-6 sm:w-8 h-1 bg-white/30 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-10 relative">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <h2 className="text-gray-800 text-2xl sm:text-3xl font-semibold">
              Login to your account
            </h2>
          </div>
          <div className="flex flex-wrap mt-2 mb-4 sm:mb-6 gap-2 sm:gap-3 items-center">
            <p className="text-gray-600 text-sm sm:text-lg font-semibold">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-purple-600 hover:underline">
                Signup
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3 sm:mb-4 relative">
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
                className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg text-sm bg-gray-200 focus:outline-none focus:border-purple-600 transition-colors pr-20 sm:pr-28"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3 sm:mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-800 text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg text-sm bg-gray-200 focus:outline-none focus:border-purple-600 transition-colors pr-10 sm:pr-12"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-none border-none cursor-pointer text-gray-600 hover:text-gray-800 text-sm sm:text-base p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FaEye />
                  </button>
                </div>
                <button
                  type="button"
                  className="whitespace-nowrap bg-[#6D54B5] text-white border-none px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors"
                >
                  Get OTP
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div
                className={`w-4 h-4 sm:w-5 sm:h-5 border-2 rounded cursor-pointer flex-shrink-0 mt-0.5 transition-all ${
                  formData.agreeToTerms
                    ? " bg-[#6D54B5]  border-[#6D54B5] text-white"
                    : "border-gray-600"
                }`}
                onClick={() =>
                  setFormData((prev: any) => ({
                    ...prev,
                    agreeToTerms: !prev.agreeToTerms,
                  }))
                }
              >
                {formData.agreeToTerms && (
                  <span className="block text-white text-xs leading-4 text-center">
                    ✓
                  </span>
                )}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Agree to the{" "}
                <Link href="/terms" className="text-[#6D54B5] hover:underline">
                  Terms & Conditions
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-[#6D54B5] to-[#6D54B5] text-white border-none py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold cursor-pointer hover:-translate-y-0.5 transition-transform disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 sm:mt-6">
            <Image
              src="/assets/ball.png"
              alt="Sports Illustration"
              width={120}
              height={120}
              className="object-contain w-fit mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
