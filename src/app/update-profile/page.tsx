"use client";

import Image from "next/image";
import { Fetch, Put } from "@/utils/axios";
import { FiChevronDown } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { getLocalizedText } from "@/hooks/general";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function EditProfile() {
  const [formData, setFormData] = useState({
    role: "",
    lastName: "",
    firstName: "",
    email: "example@gmail.com",
    phoneNumber: "0000000000",
    dateOfBirth: "",
    gender: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res: any = await Fetch("/api/user", {}, 5000, true, false);
        if (res.success) {
          const address = res.data.address || {};
          setFormData({
            firstName: res.data.firstName || "",
            lastName: res.data.lastName || "",
            role: res.data.role || "",
            email: res.data.email || "",
            phoneNumber: res.data.phoneNumber || "",
            dateOfBirth: res.data.dateOfBirth?.slice(0, 10) || "", // ISO date
            gender: res.data.gender || "",
            street: address.street || "",
            city: address.city || "",
            state: address.state || "",
            postalCode: address.postalCode || "",
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

      // Construct payload with nested address object
      const payload = {
        ...formData,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        },
      };

      // Remove flattened address fields from root payload to avoid duplication
      // delete payload.street;
      // delete payload.city;
      // delete payload.state;
      // delete payload.postalCode;

      const res: any = await Put("/api/user", payload);
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
        <div className="space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <PhoneInput
                country={'sa'}
                value={formData.phoneNumber}
                onChange={phone => setFormData({ ...formData, phoneNumber: phone })}
                containerStyle={{
                  width: '100%',
                  height: '47px'  // standard height for inputs
                }}
                inputStyle={{
                  width: '100%',
                  height: '100%',
                  fontSize: '14px',
                  paddingLeft: '48px', // room for flag
                  borderRadius: '8px',
                  border: '0px solid #d1d5db', // gray-300
                  backgroundColor: '#f9fafb',  // gray-50
                  color: '#111827',            // gray-900
                }}
                buttonStyle={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  paddingLeft: '12px',
                  paddingRight: '8px',
                }}
              />
            </div>
          </div>

          {/* Date of Birth & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {getLocalizedText("Date of Birth", "تاريخ الميلاد")}
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {getLocalizedText("Gender", "الجنس")}
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-600"
              >
                <option value="" disabled>
                  {getLocalizedText("Select Gender", "اختر الجنس")}
                </option>
                <option value="male">{getLocalizedText("Male", "ذكر")}</option>
                <option value="female">{getLocalizedText("Female", "أنثى")}</option>
                <option value="other">{getLocalizedText("Other", "أخرى")}</option>
              </select>
            </div>
          </div>

          {/* Address Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              {getLocalizedText("Street Address", "الشارع")}
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              placeholder={getLocalizedText("Enter street address", "أدخل اسم الشارع")}
              className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {getLocalizedText("City", "المدينة")}
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder={getLocalizedText("Enter city", "أدخل المدينة")}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {getLocalizedText("State", "الولاية")}
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder={getLocalizedText("Enter state", "أدخل الولاية")}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {getLocalizedText("Postal Code", "الرمز البريدي")}
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder={getLocalizedText("Enter postal code", "أدخل الرمز البريدي")}
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
