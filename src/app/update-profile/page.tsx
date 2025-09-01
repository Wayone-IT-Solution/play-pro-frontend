"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiEdit2, FiChevronDown } from "react-icons/fi";
import { Fetch, Put } from "@/utils/axios";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "example@gmail.com",
    phoneNumber: "000000000000",
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = () => {
    console.log("Change image clicked");
    // later you can add image upload here
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
        {/* Profile Image Section */}
        {/* <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden">
              <Image
                src="/assets/profile2.png"
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:border-gray-300 transition-colors">
              <FiEdit2 className="w-3 h-3 text-gray-600" />
            </div>
          </div>

          <button
            onClick={handleImageChange}
            className="bg-[#6D54B5] hover:bg-[#5b4498] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm w-full sm:w-auto"
          >
            Change Image
          </button>
        </div> */}

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className="w-full px-4 py-3.5 bg-gray-100 border-0 rounded-lg text-sm placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className="w-full px-4 py-3.5 bg-gray-100 border-0 rounded-lg text-sm placeholder-gray-400"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Select your Role
            </label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-400 pr-10"
              >
                <option value="" disabled>
                  eg. Owner, Player
                </option>
                {/* <option value="admin">Admin</option> */}
                <option value="owner">Owner</option>
                <option value="Player">Player</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Email & Phone */}
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
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Phone number
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
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
function Get(arg0: string): any {
  throw new Error("Function not implemented.");
}

function fetchUserData() {
  throw new Error("Function not implemented.");
}
