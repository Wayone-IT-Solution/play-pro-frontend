"use client";
import { Fetch } from "@/utils/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Booking {
  _id: string;
  groundId: {
    name: string;
    address: string;
    location?: { type: string; coordinates: number[] };
    pricePerHour?: number;
  };
  slots: {
    date: string;
    startTime: string;
    endTime: string;
    amount: number;
  }[];
  numberOfGuests: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  totalAmount: number;
  finalAmount: number;
}

const BookingHistory = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res: any = await Fetch(
          "/api/booking/users",
          {},
          5000,
          true,
          false
        );
        if (res.success) {
          const data = res.data;
          console.log("✅ User bookings:", data);
          setBookings(data || []);
        }
      } catch (error) {
        console.error("❌ Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen mb-20 flex flex-col justify-between">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/vector2.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex justify-center items-start px-4 sm:px-8 lg:px-20 pt-10 pb-10 mt-24 relative w-full">
        <div className="space-y-6 w-full">
          {bookings.length === 0 ? (
            <p className="text-center text-gray-500">No bookings found.</p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white rounded-[24px] border-2 border-amber-100 w-full"
                style={{
                  padding: "16px",
                  boxShadow: "0px 0px 4px 0px #00000040",
                }}
              >
                {/* Left Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">
                  <div
                    className="relative rounded-[16px] overflow-hidden w-full sm:w-[182px] sm:h-[182px]"
                    style={{
                      height: "auto",
                      minHeight: "182px",
                    }}
                  >
                    <Image
                      src="/assets/ground.png"
                      alt={booking.groundId?.name || "Ground"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-center w-full">
                    {/* Title & Rating */}
                    <div className="flex items-center flex-wrap gap-2">
                      <h2
                        className="font-bold"
                        style={{
                          fontFamily: "Inter",
                          fontSize: "20px",
                          color: "#000000",
                        }}
                      >
                        {booking.groundId?.name || "Unknown Ground"}
                      </h2>
                      <span className="text-yellow-500">⭐</span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#000000" }}
                      >
                        {booking.numberOfGuests} Guests
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 12 12"
                        fill="#000000"
                        className="flex-shrink-0"
                      >
                        <path d="M6 0C3.515 0 1.5 2.015 1.5 4.5c0 3.375 4.5 7.5 4.5 7.5s4.5-4.125 4.5-7.5C10.5 2.015 8.485 0 6 0zm0 6.75c-1.243 0-2.25-1.007-2.25-2.25S4.757 2.25 6 2.25s2.25 1.007 2.25 2.25S7.243 6.75 6 6.75z" />
                      </svg>
                      <span
                        className="text-lg font-semibold truncate"
                        style={{ color: "#000000" }}
                      >
                        {booking.groundId?.address || "Unknown Address"}
                      </span>
                    </div>

                    {/* Turf Type */}
                    <div className="mt-3">
                      <button
                        className="px-10 py-2.5 rounded-full text-white text-xs font-medium"
                        style={{ backgroundColor: "#013F5E" }}
                      >
                        Turf
                      </button>
                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-wrap items-center gap-5">
                      <button className="px-4 py-2.5 rounded-full text-[#013F5E] text-sm font-medium">
                        {new Date(booking.slots[0]?.date).toLocaleDateString()}
                      </button>
                      <button
                        className="px-4 py-2.5 rounded-full border text-xs font-medium"
                        style={{
                          borderColor: "#013F5E",
                          color: "#013F5E",
                        }}
                      >
                        {booking.slots[0]?.startTime}
                      </button>
                      <span
                        className="text-xs font-medium"
                        style={{ color: "#013F5E" }}
                      >
                        To
                      </span>
                      <button
                        className="px-4 py-2.5 rounded-full border text-sm font-medium"
                        style={{
                          borderColor: "#013F5E",
                          color: "#013F5E",
                        }}
                      >
                        {booking.slots[0]?.endTime}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                {/* Right Section */}
                <div className="flex flex-col items-start lg:items-end justify-between w-full lg:w-auto mt-4 lg:mt-0 gap-4 lg:gap-10">
                  <div className="flex flex-wrap lg:flex-nowrap gap-3 w-full lg:w-auto justify-start lg:justify-end">
                    <button
                      className="px-4 py-2 rounded-full border text-sm font-medium flex-shrink-0"
                      style={{
                        borderColor: "#013F5E",
                        color: "#013F5E",
                      }}
                    >
                      Status:{" "}
                      {booking.paymentStatus === "pending"
                        ? "Pending Payment"
                        : booking.paymentStatus}
                    </button>
                    <button
                      className="px-4 py-2 rounded-full text-white text-sm font-medium flex-shrink-0"
                      style={{ backgroundColor: "#013F5E" }}
                    >
                      See On Map
                    </button>
                  </div>
                  <div
                    className="text-lg font-medium lg:mt-2"
                    style={{ color: "#000000" }}
                  >
                    Paid: {booking.finalAmount} ₹
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
