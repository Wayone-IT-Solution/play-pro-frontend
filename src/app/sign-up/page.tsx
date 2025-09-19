"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/utils/axios";
import { FaEye } from "react-icons/fa";
import React, { useState } from "react";
import { getLocalizedText } from "@/hooks/general";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked }: any = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      setStatus({
        type: "error",
        message: getLocalizedText(
          "Please agree to the Terms & Conditions.",
          "يرجى الموافقة على الشروط والأحكام."
        ),
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response: any = await Post("/api/user", formData);
      if (response.success) {
        setStatus({
          type: "success",
          message: getLocalizedText(
            "Account created successfully!",
            "تم إنشاء الحساب بنجاح!"
          ),
        });
        setFormData({
          firstName: "",
          lastName: "",
          role: "",
          email: "",
          password: "",
          agreeToTerms: false,
        });
      } else {
        setStatus({
          type: "error",
          message: response.message || getLocalizedText(
            "Signup failed. Try again.",
            "فشل التسجيل. حاول مرة أخرى."
          ),
        });
      }
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full p-4 md:p-10 relative overflow-hidden lg:p-24 lg:pt-10 mt-20">
      {/* Left Section */}
      <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden flex-shrink-0 h-64 md:h-auto">
        <Image
          src="/assets/stadium.png"
          alt={getLocalizedText("Stadium", "الملعب")}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/60" />

        <button className="absolute top-4 right-4 bg-white/20 text-white px-3 py-1.5 rounded-full text-xs md:text-sm backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center gap-2">
          {getLocalizedText("Back To Website →", "العودة إلى الموقع →")}
        </button>

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-xl md:text-3xl font-semibold leading-tight mb-3">
            {getLocalizedText(
              "PlayPro simplifies sports for everyone",
              "PlayPro تُبسّط الرياضة للجميع"
            )}
          </h1>
          <div className="flex gap-2">
            <div className="w-6 md:w-8 h-1 bg-white rounded-sm" />
            <div className="w-6 md:w-8 h-1 bg-white/30 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-md">
          <h2 className="text-gray-800 text-2xl md:text-3xl font-semibold mb-2">
            {getLocalizedText("Create an account", "إنشاء حساب")}
          </h2>

          <div className="flex flex-wrap mt-2 mb-6 relative gap-3 items-center">
            <p className="text-gray-600 text-base md:text-lg font-semibold">
              {getLocalizedText("Already have an account?", "هل لديك حساب بالفعل؟")}{" "}
              <Link href="/login" className="text-purple-600 hover:underline">
                {getLocalizedText("Log in", "تسجيل الدخول")}
              </Link>
            </p>
            <Image
              src="/assets/ball.png"
              alt={getLocalizedText("Sports Illustration", "رسوم توضيحية للرياضة")}
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          {status && (
            <div
              className={`mb-4 p-3 rounded-lg text-center ${status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-800 text-sm font-medium mb-2">
                  {getLocalizedText("First name", "الاسم الأول")}
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder={getLocalizedText("Enter first name", "أدخل الاسم الأول")}
                  className="w-full px-4 py-3 rounded-lg text-sm bg-gray-200 focus:outline-none focus:border-purple-600"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-800 text-sm font-medium mb-2">
                  {getLocalizedText("Last name", "اسم العائلة")}
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder={getLocalizedText("Enter last name", "أدخل اسم العائلة")}
                  className="w-full px-4 py-3 rounded-lg text-sm bg-gray-200 focus:outline-none focus:border-purple-600"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Role Select */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-medium mb-2">
                {getLocalizedText("Select your Role", "اختر دورك")}
              </label>
              <select
                name="role"
                className="w-full px-4 py-3 rounded-lg text-sm bg-gray-200 focus:outline-none focus:border-purple-600"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  {getLocalizedText("eg: Owner, Player", "مثال: مالك، لاعب")}
                </option>
                <option value="ground_owner">{getLocalizedText("Owner", "مالك")}</option>
                <option value="player">{getLocalizedText("Player", "لاعب")}</option>
              </select>
            </div>

            {/* Email */}
            <div className="mb-4 relative">
              <label className="block text-gray-800 text-sm font-medium mb-2">
                {getLocalizedText("Email", "البريد الإلكتروني")}
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg text-sm bg-gray-200 focus:outline-none focus:border-purple-600 pr-28"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-gray-800 text-sm font-medium mb-2">
                {getLocalizedText("Password", "كلمة المرور")}
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-3 rounded-lg text-sm bg-gray-200 focus:outline-none focus:border-purple-600 pr-12"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 text-base p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FaEye />
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 mb-4">
              <div
                className={`w-5 h-5 border-2 rounded cursor-pointer flex-shrink-0 mt-0.5 transition-all ${formData.agreeToTerms
                  ? "bg-[#6D54B5] border-[#6D54B5] text-white"
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
                  <span className="block text-white text-xs leading-4 text-center">✓</span>
                )}
              </div>
              <div className="text-gray-600 text-sm">
                {getLocalizedText("Agree to the", "الموافقة على")}{" "}
                <Link href="/terms" className="text-[#6D54B5] hover:underline">
                  {getLocalizedText("Terms & Conditions", "الشروط والأحكام")}
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6D0E82] text-white py-3 rounded-lg text-base font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-70"
            >
              {loading
                ? getLocalizedText("Creating...", "جاري الإنشاء...")
                : getLocalizedText("Create account", "إنشاء الحساب")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
