"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Fetch, Post } from "@/utils/axios";

interface BookingData {
  date: string;
  images?: any;
  price: number;
  groundId: string;
  location?: string;
  groundName: string;
  slots: { startTime: string; endTime: string }[];
}
interface User {
  email: string;
  lastName: string;
  firstName: string;
  teamName?: string;
  phoneNumber?: string;
}

const stadiumImg = "/assets/std.png";

const BookingForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      router.push("/");
      return;
    }
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/login");
          return;
        }
        const res: any = await Fetch("/api/user", {}, 500, true, false);
        if (res.success) setUser(res.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (!bookingData) return null;
  if (loading) return <p className="text-center py-6">Loading checkout...</p>;

  const handleBooking = async () => {
    if (!bookingData) return;
    setBookingLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }
      const payload = {
        numberOfGuests: 2,
        groundId: bookingData.groundId,
        slots: bookingData.slots.map((slot: any) => slot._id),
      };
      const res: any = await Post("/api/booking", payload);
      if (res.success) {
        localStorage.setItem("orderData", JSON.stringify(res.data));
        return router.replace("/thank-you");
      }
    } catch (err) {
      console.log("Booking error:", err);
      localStorage.removeItem("orderData");
      router.back();
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className=" bg-white pb-8 px-4 w-full mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Stadium Image */}
          <div className="relative w-full h-56 md:h-72 lg:h-80">
            <Image
              src={bookingData?.images[0]}
              alt="Stadium"
              fill
              priority
              className="object-cover rounded-3xl"
              draggable={false}
            />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Ground Info Section */}
            <div className="flex justify-between items-start mb-8 bg-gray-100 rounded-2xl p-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    {bookingData.groundName}
                  </h2>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-sm text-gray-600">4.5 Rating</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="8" cy="8" r="2" fill="currentColor" />
                  </svg>
                  <span>
                    {bookingData.location ||
                      "Sahya Road, Gurugram...Sahya road, Gurugram..."}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 4v4l3 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>
                    {bookingData.slots.length > 0 &&
                      `${bookingData.slots[0].startTime}–${bookingData.slots[0].endTime}`}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-lg font-semibold text-gray-900">
                  Dhs {bookingData.price}
                </span>
              </div>
            </div>

            {/* Player Information Section */}
            <div className="mb-6">
              <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
                Player Information
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleBooking();
                }}
              >
                <div className="space-y-4">
                  {/* First Name and Last Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={user?.firstName || ""}
                        placeholder="Anshul"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={user?.lastName || ""}
                        placeholder="Anshul"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Email and Mobile Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        placeholder="Anshul"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile
                      </label>
                      <input
                        type="tel"
                        value={user?.phoneNumber || ""}
                        placeholder="Anshul"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Team Name Full Width */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team name
                    </label>
                    <input
                      type="text"
                      value={user?.teamName || ""}
                      placeholder="Anshul"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400"
                      readOnly
                    />
                  </div> */}
                </div>

                {/* Pay Now Button */}
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full mt-8 cursor-pointer bg-[#932AAA] hover:bg-[#7d2391] text-white py-4 rounded-full font-semibold text-lg transition-colors duration-200 disabled:opacity-70"
                >
                  {bookingLoading ? "Booking..." : "Pay Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
