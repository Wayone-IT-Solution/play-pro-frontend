"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { Post, Put } from "@/utils/axios";
import emitter from "@/utils/eventEmitter";
import { useRouter } from "next/navigation";
import { getLocalizedText } from "@/hooks/general";
import React, { useEffect, useState } from "react";
import { clearCart, getCart } from "@/utils/cartUtils";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) router.replace("/");
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateCart = async (data: any[]) => {
    try {
      const promises = data.map((item) =>
        Put("/api/cart", { productId: item._id, quantity: item.quantity || 1 }, 5000, true)
      );
      await Promise.all(promises);
    } catch (error) {
      console.log("Error updating cart:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.warn(getLocalizedText(
        "Please agree to the Terms & Conditions",
        "يرجى الموافقة على الشروط والأحكام"
      ));
      return;
    }

    try {
      setLoading(true);
      const res: any = await Post("/api/user/login", formData);
      if (res.success) {
        const data = getCart();
        if (data?.length > 0) {
          await updateCart(data);
          emitter.emit("login", res.data);
          clearCart();
          return router.replace("/cart");
        }
        emitter.emit("login", res.data);
        router.replace("/");
      } else {
        toast.warn(res.message || getLocalizedText("Invalid email or password", "البريد الإلكتروني أو كلمة المرور غير صحيحة"));
      }
    } catch (error) {
      console.log("❌ Login error:", error);
      toast.warn(getLocalizedText("Invalid email or password", "البريد الإلكتروني أو كلمة المرور غير صحيحة"));
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
          alt={getLocalizedText("Stadium", "الملعب")}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/60" />

        <button
          onClick={() => router.push("/")}
          className="absolute top-5 right-5 bg-white/20 text-white border-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center gap-1 sm:gap-2"
        >
          {getLocalizedText("Back To Website →", "العودة إلى الموقع →")}
        </button>

        <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 text-white">
          <h1 className="text-xl sm:text-3xl font-semibold leading-tight mb-3 sm:mb-5">
            {getLocalizedText(
              "PlayPro simplifies sports for everyone",
              "PlayPro تُبسّط الرياضة للجميع"
            )}
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
              {getLocalizedText("Login to your account", "تسجيل الدخول إلى حسابك")}
            </h2>
          </div>
          <div className="flex flex-wrap mt-2 mb-4 sm:mb-6 gap-2 sm:gap-3 items-center">
            <p className="text-gray-600 text-sm sm:text-lg font-semibold">
              {getLocalizedText(
                "Don't have an account?",
                "ليس لديك حساب؟"
              )}{" "}
              <Link href="/sign-up" className="text-purple-600 hover:underline">
                {getLocalizedText("Signup", "إنشاء حساب")}
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
                {getLocalizedText("Email", "البريد الإلكتروني")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg text-sm bg-gray-200 focus:outline-none focus:border-purple-600 transition-colors pr-20 sm:pr-28"
                placeholder={getLocalizedText("example@gmail.com", "example@gmail.com")}
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
                {getLocalizedText("Password", "كلمة المرور")}
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg text-sm bg-gray-200 focus:outline-none focus:border-purple-600 transition-colors pr-10 sm:pr-12"
                    placeholder={getLocalizedText("••••••••", "••••••••")}
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
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div
                className={`w-4 h-4 sm:w-5 sm:h-5 border-2 rounded cursor-pointer flex-shrink-0 mt-0.5 transition-all ${formData.agreeToTerms
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
              className="w-full bg-[#6D0E82] text-white border-none py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold cursor-pointer hover:-translate-y-0.5 transition-transform disabled:opacity-50"
            >
              {loading
                ? getLocalizedText("Logging in...", "جار تسجيل الدخول...")
                : getLocalizedText("Login", "تسجيل الدخول")}
            </button>
          </form>

          <div className="mt-4 sm:mt-6">
            <Image
              src="/assets/ball.png"
              alt={getLocalizedText("Sports Illustration", "رسوم توضيحية للرياضة")}
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
