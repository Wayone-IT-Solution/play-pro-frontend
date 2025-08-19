"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Fetch, Post } from "@/utils/axios";

interface BookingData {
  groundId: string;
  groundName: string;
  location?: string;
  date: string;
  slots: { startTime: string; endTime: string }[];
  price: number;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

const BookingForm = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // ✅ Emergency contact state
//   const [emergencyContact, setEmergencyContact] = useState({
//     name: "",
//     phone: "",
//   });

  useEffect(() => {
    // Load booking data
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      router.push("/");
      return;
    }

    // Fetch user data
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

  // ✅ Handle booking API call
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
        // emergencyContact,
        groundId: bookingData.groundId,
        slots: bookingData.slots.map((slot: any) => slot._id),
      };

      const res: any = await Post("/api/booking", payload);
      if (res.success) {
        localStorage.setItem("orderData", JSON.stringify(res.data));

        router.push("/thank-you");
      }
    } catch (err) {
      console.log("Booking error:", err);
      localStorage.removeItem("orderData")
      router.back();
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 m-24">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-black mb-1">
            {bookingData.groundName}
          </h1>
          <p className="text-gray-600 text-sm mb-4">{bookingData.location}</p>

          <div className="flex justify-between items-start">
            <div>
              <p className="text-black font-medium">{bookingData.date}</p>
              {bookingData.slots.map((slot, i) => (
                <p key={i} className="text-gray-600 text-sm">
                  {slot.startTime} - {slot.endTime}
                </p>
              ))}
            </div>
            <div className="text-right">
              <p className="text-black font-semibold">
                Price Per Slot: {bookingData.price}
              </p>
              <button
                className="text-gray-600 text-sm underline mt-1"
                onClick={() => router.push("/")}
              >
                Edit Booking
              </button>
            </div>
          </div>
        </div>

        {/* User Information Section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-black mb-4">
            User Information
          </h2>
          {user ? (
            <div className="space-y-4">
              <input
                type="text"
                value={`${user.firstName} ${user.lastName}`}
                readOnly
                className="w-full p-3 border border-gray-200 rounded-lg text-gray-600 bg-gray-100"
              />
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full p-3 border border-gray-200 rounded-lg text-gray-600 bg-gray-100"
              />
              <input
                type="tel"
                value={user.phoneNumber ?? ""}
                readOnly
                className="w-full p-3 border border-gray-200 rounded-lg text-gray-600 bg-gray-100"
              />
              {/* <input
                type="text"
                value={user.teamName ?? ""}
                placeholder="Team/Club Name (Optional)"
                readOnly
                className="w-full p-3 border border-gray-200 rounded-lg text-gray-600 bg-gray-100"
              /> */}
            </div>
          ) : (
            <p className="text-gray-500">No user data found.</p>
          )}
        </div>

        {/* Emergency Contact Section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-black mb-4">
            Emergency Contact
          </h2>
          {/* <input
            type="text"
            placeholder="Contact Name"
            value={emergencyContact.name}
            onChange={(e) =>
              setEmergencyContact({ ...emergencyContact, name: e.target.value })
            }
            className="w-full p-3 border border-gray-200 rounded-lg mb-2"
          /> */}
          {/* <input
            type="tel"
            placeholder="Contact Phone"
            value={emergencyContact.phone}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                phone: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-200 rounded-lg"
          /> */}
        </div>

        {/* Payment Section (UI only) */}
        {/* <div className="px-4 pb-4">
          <h2 className="text-lg font-semibold text-black mb-4">
            Payment Method
          </h2>
          <div className="space-y-3">
            {[
              "Credit/Debit Card",
              "UPI / Wallet",
              "Apple Pay / Google",
              "Cash on Arrival",
            ].map((method, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
              >
                <input
                  type="radio"
                  name="payment"
                  id={method}
                  className="w-4 h-4 text-blue-600"
                />
                <label
                  htmlFor={method}
                  className="text-gray-800 text-sm font-medium"
                >
                  {method}
                </label>
              </div>
            ))}
          </div>
        </div> */}

        {/* Price Breakdown */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-black">
              Price Breakdown
            </h2>
            <p className="text-lg font-semibold text-black">
              Dhs {bookingData.price}
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes/Service Fee</span>
              <span className="text-black">Dhs 0</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-black">Total</span>
              <span className="text-black">Dhs {bookingData.price}</span>
            </div>
          </div>
        </div>

        {/* T&C */}
        <div className="px-4 pb-4">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 mt-1 text-blue-600"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms & Conditions
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-4">
          <button
            onClick={handleBooking}
            disabled={bookingLoading}
            className="w-full bg-[#6D54B5] text-white py-4 rounded-lg font-medium text-base hover:bg-opacity-90 transition-all duration-200"
          >
            {bookingLoading ? "Booking..." : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
