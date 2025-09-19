"use client";

import Image from "next/image";
import GroundMap from "@/app/grounds/components/GroundMap";
import { Fetch } from "@/utils/axios";
import Testimonials from "@/components/home/Testimonial";
import GroundImageSwiper from "@/app/grounds/GroundImageSwiper";
import React, { useCallback, useEffect, useState } from "react";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Slot {
  _id: string;
  date: string;
  amount: number;
  endTime: string;
  duration: string;
  startTime: string;
  isBooked: boolean;
}

export default function GroundBookingClient({
  groundData,
  testimonials,
}: {
  groundData: any;
  testimonials: any[];
}) {
  const today = new Date();
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const groundId = groundData?._id;

  const formatDate = (day: number, month: number, year: number) => {
    const dd = String(day).padStart(2, "0");
    const mm = String(month + 1).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const [showSlots, setShowSlots] = useState(false);
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(
    formatDate(today.getDate(), today.getMonth(), today.getFullYear())
  );
  const [selectedDuration, setSelectedDuration] = useState("120min");

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const durations = ["60min", "90min", "120min"];

  const calendarDays = [
    { date: 29, prev: true },
    { date: 30, prev: true },
    { date: 31, prev: true },
    { date: 1 },
    { date: 2 },
    { date: 3 },
    { date: 4 },
    { date: 5 },
    { date: 6 },
    { date: 7 },
    { date: 8 },
    { date: 9 },
    { date: 10 },
    { date: 11 },
    { date: 12 },
    { date: 13 },
    { date: 14 },
    { date: 15 },
    { date: 16 },
    { date: 17 },
    { date: 18 },
    { date: 19 },
    { date: 20 },
    { date: 21 },
    { date: 22 },
    { date: 23 },
    { date: 24 },
    { date: 25 },
    { date: 26 },
    { date: 27 },
    { date: 28 },
    { date: 29 },
    { date: 30 },
    { date: 1, next: true },
    { date: 2, next: true },
  ];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const monthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const fetchGroundSlots = useCallback(async () => {
    try {
      setSlots([]);
      const response: any = await Fetch(
        "/api/slot",
        {
          groundId,
          ...(selectedDate ? { date: selectedDate } : {}),
        },
        5000,
        true,
        false
      );
      if (response?.success) {
        const data = response?.data || [];
        setSlots(data);
      }
    } catch (error) {
      console.log("Error fetching grounds:", error);
    }
  }, [groundId, selectedDate]);

  useEffect(() => {
    if (selectedDate) setSelectedSlots([]);
    if (groundId) fetchGroundSlots();
  }, [fetchGroundSlots, groundId, selectedDate]);

  const totalAmount = selectedSlots.reduce((sum, s) => sum + s.amount, 0);
  const totalDuration = selectedSlots
    .reduce((sum, s) => sum + Number(s.duration.replace("min", "")), 0)
    .toString();
  const toggleSlot = (slot: Slot) => {
    if (slot.isBooked) return;
    if (selectedSlots.find((s) => s._id === slot._id)) {
      setSelectedSlots(selectedSlots.filter((s) => s._id !== slot._id));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  console.log(selectedSlots);

  // ✅ confirm selection logic
  const handleConfirmSelection = () => {
    if (selectedSlots.length === 0) {
      alert("Please select at least one slot.");
      return;
    }
    const bookingData = {
      groundId: groundData._id,
      images: groundData?.images,
      groundName: groundData.name,
      location: groundData.address,
      date: selectedDate,
      slots: selectedSlots.map((s) => ({
        _id: s._id,
        startTime: s.startTime,
        endTime: s.endTime,
        amount: s.amount,
      })),
      totalAmount: selectedSlots.reduce((sum, s) => sum + s.amount, 0),
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    window.location.href = "/check-out";
  };

  return (
    <div className="w-screen mt-16 lg:mt-24 max-w-6xl lg:px-4 mx-auto flex flex-col items-center">
      <div className="w-full px-4 py-6">
        {/* Ground Info */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
          <div className="w-full lg:w-3/5">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                {groundData.name || "Padel 10"}
              </h2>
              <div className="flex items-center text-gray-600 mb-1">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">
                  {groundData.address || "Saudi Arabia, Medina"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span>
                  Pitch Type:{" "}
                  <span className="font-medium">
                    {groundData.pitchType || "turf"}
                  </span>
                </span>
                <span>
                  Venue Type:{" "}
                  <span className="font-medium">
                    {groundData.venueType || "outdoor"}
                  </span>
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Opening Hours:{" "}
                <span className="font-medium">
                  {groundData.openingHours || "04:00 PM - 04:00 AM"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-400" />
                <span className="text-sm font-medium">4.2/5 Rating</span>
              </div>
            </div>

            {/* Ground Image */}
            <div className="rounded-lg mb-6">
              {Array.isArray(groundData.images) &&
                groundData.images.length > 0 ? (
                <GroundImageSwiper
                  images={groundData.images}
                  name={groundData.name}
                />
              ) : (
                <div className="relative w-full h-60">
                  <Image
                    src="/assets/stadium1.png"
                    alt="Stadium placeholder"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Booking Section */}
          <div className="mb-6 w-full lg:w-2/5 mx-auto text-center">
            <div
              className="border border-dashed border-gray-600 rounded-2xl p-5 w-full"
              style={{ minWidth: 320 }}
            >
              <h3 className="text-lg font-semibold mb-2">
                Book a Field on {groundData.name || "PADEL10"}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select date and duration to show available slots
              </p>

              {/* Calendar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1 bg-white shadow rounded-full"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm font-medium text-gray-800">
                    {monthYear}
                  </span>
                  <button
                    onClick={handleNextMonth}
                    className="p-1 bg-white shadow rounded-full"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <hr className="mb-3 opacity-50" />

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs text-gray-500 py-2 font-medium"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    const formatted = formatDate(
                      day.date,
                      currentDate.getMonth(),
                      currentDate.getFullYear()
                    );
                    return (
                      <button
                        key={index}
                        onClick={() =>
                          !day.prev && !day.next && setSelectedDate(formatted)
                        }
                        className={`py-2 text-sm rounded-lg border-2 ${selectedDate === formatted
                          ? "text-[#932AAA] border-[#932AAA] bg-white font-bold"
                          : day.prev || day.next
                            ? "text-gray-300 border-white"
                            : "text-gray-700 border-white hover:bg-gray-100"
                          }`}
                        style={
                          selectedDate === formatted
                            ? { boxShadow: "0 0 0 2px #932AAA22" }
                            : {}
                        }
                      >
                        {day.date}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration Selection */}
              <div className="flex justify-center gap-2 mb-4">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={`px-6 py-2 rounded-md text-sm border transition ${selectedDuration === duration
                      ? "text-[#932AAA] border-[#932AAA] font-semibold bg-white"
                      : "border-purple-300 text-gray-700 bg-white"
                      }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>

              {/* Show Slots */}
              <button
                className="w-full py-3 text-white rounded-lg font-medium hover:opacity-90"
                style={{ backgroundColor: "#932AAA" }}
                onClick={() => setShowSlots(true)}
              >
                Show Available Slot
              </button>

              {showSlots &&
                (slots.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {slots.map((slot) => (
                      <div
                        key={slot._id}
                        className={`flex justify-between items-center border rounded-lg px-4 py-2 text-sm ${slot.isBooked
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white border-[#932AAA] text-gray-800"
                          }`}
                      >
                        <span>
                          {slot.startTime} - {slot.endTime} ({slot.duration}{" "}
                          min)
                        </span>
                        <span className="font-semibold">Dhs {slot.amount}</span>
                        <button
                          disabled={slot.isBooked}
                          onClick={() => toggleSlot(slot)}
                          className={`px-3 py-1 rounded-md text-xs font-medium ${selectedSlots.find((s) => s._id === slot._id)
                            ? "bg-[#932AAA] text-white"
                            : "bg-purple-50 text-[#932AAA] border border-[#932AAA]"
                            } ${slot.isBooked ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                          {slot.isBooked
                            ? "Booked"
                            : selectedSlots.find((s) => s._id === slot._id)
                              ? "Selected"
                              : "Select"}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-500">
                    No slots available
                  </p>
                ))}
            </div>
          </div>
        </div>
        {/* Pricing Section */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-4 w-full">
            <span className="text-2xl font-bold">
              Dhs {totalAmount || groundData.pricePerHour || "300"}/hr
            </span>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <input
                type="date"
                value={selectedDate}
                readOnly
                className="border-2 border-[#932AAA] text-[#932AAA] rounded-full px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <div className="flex items-center gap-1">
                <input
                  type="time"
                  value={selectedSlots[0]?.startTime || "11:30"} 
                  readOnly
                  className="border-2 border-[#932AAA] text-[#932AAA] rounded-full px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <span className="text-xs text-black">-To-</span>
                <input
                  type="time"
                  value={
                    selectedSlots[selectedSlots.length - 1]?.endTime || "13:30"
                  } 
                  readOnly
                  className="border-2 border-[#932AAA] text-[#932AAA] rounded-full px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>
          </div>
          <div className="border-2 border-dashed border-[#932AAA] rounded-full px-4 py-4 flex justify-between items-center">
            <span className="text-gray-600 text-sm">
              {totalDuration ? totalDuration + " min" : "120 min"}
            </span>
            <span className="flex-1 border-t-2 border-dashed border-[#932AAA] mx-4"></span>
            <span className="font-semibold text-gray-900">
              Dhs {totalAmount || groundData.pricePerHour}
            </span>
          </div>
        </div>

        <button
          className="w-full py-3 text-white cursor-pointer rounded-lg font-medium mb-6 hover:opacity-90"
          style={{ backgroundColor: "#932AAA" }}
          onClick={handleConfirmSelection}
        >
          Checkout
        </button>

        {groundData?.location?.coordinates?.length === 2 && (
          <GroundMap
            lat={groundData.location.coordinates[1]}
            lng={groundData.location.coordinates[0]}
          />
        )}
      </div>
    </div>
  );
}
