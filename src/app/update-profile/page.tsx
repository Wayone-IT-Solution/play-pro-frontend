"use client";

import Image from "next/image";
import { Fetch, Put } from "@/utils/axios";
import { FiChevronDown } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { getLocalizedText } from "@/hooks/general";

// Example language; in a real app, get this from context or store
const lang: "en" | "ar" = "en";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    role: "",
    lastName: "",
    firstName: "",
    email: "example@gmail.com",
    phoneNumber: "0000000000",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res: any = await Fetch("/api/user", {}, 5000, true, false);
        if (res.success) {
          setFormData({
            firstName: res.data.firstName || "",
            lastName: res.data.lastName || "",
            role: res.data.role || "",
            email: res.data.email || "",
            phoneNumber: res.data.phoneNumber || "",
          });
        } else {
          console.log("❌ API returned error:", res.message);
        }
      } catch (err) {
        localStorage.removeItem("accessToken");
        console.log("❌ Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const res: any = await Put("/api/user", formData);
      if (res?.success) window.location.reload();
    } catch (err) {
      console.log("❌ Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center px-4 sm:px-8 lg:px-24 pt-10 mb-10 mt-24 w-full">
      <div className="absolute inset-0">
        <Image
          src="/assets/vector2.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="bg-white rounded-4xl relative z-10 shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-10 w-full max-w-4xl">
        {/* Form Fields */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {getLocalizedText("First Name", "الاسم الأول")}
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={getLocalizedText("Enter first name", "أدخل الاسم الأول")}
                className="w-full px-4 py-3.5 bg-gray-100 border-0 rounded-lg text-sm placeholder-gray-400"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {getLocalizedText("Last Name", "اسم العائلة")}
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder={getLocalizedText("Enter last name", "أدخل اسم العائلة")}
                className="w-full px-4 py-3.5 bg-gray-100 border-0 rounded-lg text-sm placeholder-gray-400"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              {getLocalizedText("Select your Role", "اختر الدور")}
            </label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-400 pr-10"
              >
                <option value="" disabled>
                  {getLocalizedText("eg. Owner, Player", "مثال: مالك، لاعب")}
                </option>
                <option value="owner">{getLocalizedText("Owner", "مالك")}</option>
                <option value="player">{getLocalizedText("Player", "لاعب")}</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {getLocalizedText("Email", "البريد الإلكتروني")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {getLocalizedText("Phone Number", "رقم الهاتف")}
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          disabled={loading}
          className="w-full sm:w-[600px] mx-auto flex items-center justify-center bg-[#6D54B5] hover:bg-[#5b4498] text-white py-3 sm:py-4 rounded-xl text-sm font-medium mt-8 disabled:opacity-60"
        >
          {loading
            ? getLocalizedText("Saving...", "جار الحفظ...")
            : getLocalizedText("Save Changes", "حفظ التغييرات")}
        </button>
      </div>
    </div>
  );
}
