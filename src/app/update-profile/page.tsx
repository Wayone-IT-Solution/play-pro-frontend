"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiEdit2, FiChevronDown } from "react-icons/fi";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    firstName1: "",
    firstName2: "",
    role: "",
    email: "example@gmail.com",
    phone: "000000000000",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = () => {
    console.log("Change image clicked");
  };

  const handleSaveChanges = () => {
    console.log("Save changes clicked", formData);
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
        {/* Profile Image Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-8">
          <div className="relative">
            {/* Profile Image */}
            <div className="w-20 h-20 rounded-2xl overflow-hidden">
              <Image
                src="/assets/profile2.png"
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Edit Icon */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:border-gray-300 transition-colors">
              <FiEdit2 className="w-3 h-3 text-gray-600" />
            </div>
          </div>

          {/* Change Image Button */}
          <button
            onClick={handleImageChange}
            className="bg-[#6D54B5] hover:bg-[#5b4498] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm w-full sm:w-auto"
          >
            Change Image
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* First Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                First name
              </label>
              <input
                type="text"
                name="firstName1"
                value={formData.firstName1}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className="w-full px-4 py-3.5 bg-gray-100 border-0 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:bg-gray-100 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Last name
              </label>
              <input
                type="text"
                name="firstName2"
                value={formData.firstName2}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className="w-full px-4 py-3.5 bg-gray-100 border-0 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:bg-gray-100 transition-colors"
              />
            </div>
          </div>

          {/* Select Role */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Select your Role
            </label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-0 focus:bg-gray-100 transition-colors appearance-none cursor-pointer pr-10"
              >
                <option value="" disabled>
                  eg. Admin, Owner, Player
                </option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
                <option value="player">Player</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-0 focus:bg-gray-100 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-0 focus:bg-gray-100 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          className="w-full sm:w-[600px] mx-auto flex items-center justify-center bg-[#6D54B5] hover:bg-[#5b4498] text-white py-3 sm:py-4 rounded-xl text-sm font-medium mt-8 transition-colors shadow-sm"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
