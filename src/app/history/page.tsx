"use client";

import Image from "next/image";
import { Fetch } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { getLocalizedValues } from "@/hooks/general";
import AuthGuard from "@/components/layout/AuthGuard";
import Link from "next/link";
import { ReviewModal } from "@/components/modals/ReviewModal";

interface Slot {
  date: string;
  amount: number;
  endTime: string;
  startTime: string;
}

interface Booking {
  _id: string;
  groundId: {
    name: string;
    images?: any;
    address: string;
    pricePerHour?: number;
    location?: { type: string; coordinates: number[] };
  };
  slots: Slot[];
  status: string;
  createdAt: string;
  totalAmount: number;
  finalAmount: number;
  paymentStatus: string;
  numberOfGuests: number;
}

const BookingHistory = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

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
          let data = res.data || [];

          // Fallback: get slots from localStorage if API returns empty
          data = data.map((b: Booking) => {
            if (!b.slots || b.slots.length === 0) {
              const storedSlots = localStorage.getItem(`bookingSlots_${b._id}`);
              if (storedSlots) {
                b.slots = JSON.parse(storedSlots);
              }
            }
            return b;
          });

          setBookings(data);
        }
      } catch (error) {
        console.log("❌ Error fetching bookings:", error);
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
    <AuthGuard>
      <div className="relative max-w-7xl mx-auto overflow-hidden min-h-screen mb-20 flex flex-col justify-between">
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
              bookings.map((booking: any) => {
                const updatedBooking = getLocalizedValues(booking?.groundId);
                const url = `https://www.google.com/maps/dir/?api=1&destination=${booking?.groundId?.location?.coordinates?.[0]},${booking?.groundId?.location?.coordinates?.[1]}`;
                return (
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
                      {updatedBooking?.images?.[0] &&
                        <div
                          className="relative rounded-[16px] overflow-hidden w-full sm:w-[182px] sm:h-[182px]"
                          style={{ height: "auto", minHeight: "142px" }}
                        >
                          <Image
                            fill
                            className="object-cover"
                            src={updatedBooking?.images?.[0]}
                            alt={updatedBooking?.name || "Ground"}
                          />
                        </div>
                      }

                      {/* Details */}
                      <div className="flex flex-col justify-center w-full">
                        {/* Title & Guests */}
                        <div className="flex items-center flex-wrap gap-2">
                          <h2
                            className="font-bold"
                            style={{
                              fontFamily: "Inter",
                              fontSize: "20px",
                              color: "#000000",
                            }}
                          >
                            {updatedBooking?.name || "Unknown Ground"}
                          </h2>
                          {/* <span className="text-yellow-500">⭐</span>
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#000000" }}
                        >
                          {booking.numberOfGuests} Guests
                        </span> */}
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 mt-1">
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
                            className="text-sm w-2/3 text-wrap"
                            style={{ color: "#000000" }}
                          >
                            {updatedBooking?.address || "Unknown Address"}
                          </span>
                        </div>

                        {/* Turf Type */}
                        <div className="mt-3">
                          <button
                            className="px-10 py-2.5 rounded-full text-white text-xs font-medium"
                            style={{ backgroundColor: "#6D0E82" }}
                          >
                            {updatedBooking?.pitchType}
                          </button>
                        </div>

                        {/* Date & Time */}
                        {/* <div className="flex flex-wrap items-center gap-5">
                        <button className="px-4 py-2.5 rounded-full text-[#6D0E82] text-sm font-medium">
                          {slot?.date ? new Date(slot.date).toLocaleDateString() : "No Date"}
                        </button>
                        <button
                          className="px-4 py-2.5 rounded-full border text-xs font-medium"
                          style={{ borderColor: "#6D0E82", color: "#6D0E82" }}
                        >
                          {slot?.startTime || "--:--"}
                        </button>
                        <span className="text-xs font-medium" style={{ color: "#6D0E82" }}>
                          To
                        </span>
                        <button
                          className="px-4 py-2.5 rounded-full border text-sm font-medium"
                          style={{ borderColor: "#6D0E82", color: "#6D0E82" }}
                        >
                          {slot?.endTime || "--:--"}
                        </button>
                      </div> */}
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col items-start lg:items-end justify-between w-full lg:w-auto mt-4 lg:mt-0 gap-4 lg:gap-10">
                      <div className="flex flex-wrap lg:flex-nowrap gap-3 w-full lg:w-auto justify-start lg:justify-end">
                        <button
                          className="px-4 py-2 rounded-full border text-sm font-medium flex-shrink-0"
                          style={{ borderColor: "#6D0E82", color: "#6D0E82" }}
                        >
                          Status:{" "}
                          {booking.paymentStatus === "pending"
                            ? "Pending"
                            : booking.paymentStatus}
                        </button>
                        <Link
                          href={url}
                          target="_blank"
                          className="px-4 py-2 rounded-full text-white text-sm font-medium flex-shrink-0"
                          style={{ backgroundColor: "#6D0E82" }}
                        >
                          See On Map
                        </Link>
                      </div>
                      {!booking?.isReviewed &&
                        <button
                          onClick={() => setSelectedBooking(booking._id)}
                          className="px-4 cursor-pointer py-2 bg-white text-[#014999] border border-[#014999] rounded-full hover:text-white hover:bg-[#014999]"
                        >
                          Write a Review
                        </button>
                      }
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {selectedBooking && (
        <ReviewModal
          isOpen={!!selectedBooking}
          bookingId={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </AuthGuard>
  );
};

export default BookingHistory;
