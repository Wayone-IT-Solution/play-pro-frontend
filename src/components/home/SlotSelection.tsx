"use client";

import React, { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { Fetch } from "@/utils/axios";
import { useRouter } from "next/navigation";

function formatDate(inputDate: any) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  date: string;
  duration: string;
}

export default function SportsBookingModal({
  ground,
  groundId,
}: {
  ground: any;
  groundId: string;
}) {
  const router = useRouter();
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);

  const fetchGroundSlots = useCallback(async () => {
    try {
      setSlots([]);
      const response: any = await Fetch(
        "/api/slot",
        {
          groundId,
          ...(selectedDate ? { date: formatDate(selectedDate) } : {}),
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
    if (groundId) {
      fetchGroundSlots();
    }
  }, [fetchGroundSlots, groundId, selectedDate]);

  const toggleSlot = (slot: Slot) => {
    if (slot.isBooked) return;
    if (selectedSlots.find((s) => s._id === slot._id)) {
      setSelectedSlots(selectedSlots.filter((s) => s._id !== slot._id));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  // ✅ confirm selection logic
  const handleConfirmSelection = () => {
    if (selectedSlots.length === 0) {
      alert("Please select at least one slot.");
      return;
    }

    const bookingData = {
      groundId,
      groundName: ground.name,
      location: ground.address,
      price: ground.pricePerHour,
      date: formatDate(selectedDate),
      slots: selectedSlots.map((s) => ({
        _id: s._id,
        endTime: s.endTime,
        startTime: s.startTime,
      })),
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    return router.push("/check-out");
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image
            src="/assets/slot.png"
            alt="Soccer ball and cleats on grass"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side */}
        <div
          className="md:w-1/2 p-6 relative"
          style={{ backgroundColor: "#F3F3F3" }}
        >
          {/* Close Button */}
          <button className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} className="text-gray-600" />
          </button>

          <div className="mt-8">
            {/* Title + Date Selector */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Available Slots: {formatDate(selectedDate)}
              </h3>
              <input
                required
                type="date"
                min={formatDate(new Date())}
                value={formatDate(selectedDate)}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6D54B5]"
              />
            </div>

            {/* Slots Grid or No Slots Message */}
            {slots.length === 0 ? (
              <p className="text-center text-red-600 font-medium mb-8">
                All slots are booked for {formatDate(selectedDate)} 🎉
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-3 mb-8">
                {slots.map((slot) => {
                  const isSelected = selectedSlots.find(
                    (s) => s._id === slot._id
                  );
                  return (
                    <button
                      key={slot._id}
                      onClick={() => toggleSlot(slot)}
                      disabled={slot.isBooked}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        slot.isBooked
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : isSelected
                          ? "text-white shadow-lg transform scale-105"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                      style={{
                        backgroundColor: isSelected ? "#6D54B5" : undefined,
                      }}
                    >
                      {slot.startTime} - {slot.endTime}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Selected Slots Preview */}
            {selectedSlots.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Selected Slots:
                </h4>
                <ul className="list-disc pl-5 text-gray-800">
                  {selectedSlots.map((s) => (
                    <li key={s._id}>
                      {s.startTime} - {s.endTime}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Select Slot Button */}
            <button
              type="button"
              onClick={handleConfirmSelection}
              disabled={slots.length === 0}
              className="w-full py-4 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
              style={{ backgroundColor: "#6D54B5" }}
            >
              Confirm Selection ({selectedSlots.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
