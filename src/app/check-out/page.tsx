"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Fetch, Post } from "@/utils/axios";
import { getLocalizedText } from "@/hooks/general";
import AuthGuard from "@/components/layout/AuthGuard";
import CouponSection from "./components/CouponSection";

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

const BookingForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>({});
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
        const token = await localStorage.getItem("accessToken");
        console.log(token)
        if (!token) {
          router.push("/login");
          return;
        }
        console.log('first')
        const res: any = await Fetch("/api/user", {}, 500, true, false);
        if (res.success) setUser(res.data);
      } catch (error) {
        console.log("Error fetching user:", error);
        // localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingDataStr: any = localStorage.getItem("orderData");
        if (bookingDataStr) {
          const bookingData = JSON.parse(bookingDataStr);
          const response: any = await Fetch("/api/booking/" + bookingData?._id, {}, 5000, true, false);
          if (response?.success) {
            setOrderData(response?.data);
          }
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    fetchBooking();
  }, []);

  if (!bookingData) return null;

  if (loading)
    return <p className="text-center py-6">{getLocalizedText("Loading checkout...", "جارٍ تحميل الدفع...")}</p>;

  const handleBooking = async () => {
    if (!bookingData) return;

    const bookingDataStr: any = localStorage.getItem("orderData");
    if (bookingDataStr) {
      const bookingData = JSON.parse(bookingDataStr);
      if (bookingData?._id)
        return router.replace("/thank-you");
    }

    setBookingLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return router.push("/login");

      const payload = {
        numberOfGuests: 2,
        groundId: bookingData.groundId,
        slots: bookingData.slots.map((slot: any) => slot._id),
      };
      const res: any = await Post("/api/booking", payload);
      if (res.success) {
        localStorage.setItem("orderData", JSON.stringify(res.data));
        return true;
      }
    } catch (err) {
      console.log("Booking error:", err);
      localStorage.removeItem("orderData");
      setTimeout(() => {
        router.back();
      }, 2000);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="bg-white pb-8 px-4 w-full mt-24">
        <div className="max-w-6xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Stadium Image */}
            <div className="relative w-full h-56 md:h-72 lg:h-80">
              <Image
                fill
                priority
                unoptimized
                alt={getLocalizedText("Stadium", "الملعب")}
                draggable={false}
                src={bookingData?.images[0]}
                className="object-cover rounded-3xl"
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
                      <span className="text-sm text-gray-600">
                        4.5 {getLocalizedText("Rating", "التقييم")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="8" cy="8" r="2" fill="currentColor" />
                    </svg>
                    <span>{bookingData.location || getLocalizedText("Sahya Road, Gurugram...", "طريق ساهيا، جورجام...")}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>
                      {bookingData.slots.length > 0 &&
                        `${bookingData.slots[0].startTime}–${bookingData.slots[0].endTime}`}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-2 rounded-lg">
                  <span className="text-lg font-semibold text-gray-900">
                    ${getLocalizedText("SAR", "ريال سعودي")} {bookingData.price}
                  </span>
                </div>
              </div>

              {/* Player Information Section */}
              <div className="mb-6">
                <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
                  {getLocalizedText("Player Information", "معلومات اللاعب")}
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
                          {getLocalizedText("First Name", "الاسم الأول")}
                        </label>
                        <input
                          type="text"
                          value={user?.firstName || ""}
                          placeholder={getLocalizedText("Anshul", "أنشول")}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {getLocalizedText("Last Name", "اسم العائلة")}
                        </label>
                        <input
                          type="text"
                          value={user?.lastName || ""}
                          placeholder={getLocalizedText("Anshul", "أنشول")}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400"
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Email and Mobile Row */}
                    <div className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {getLocalizedText("Email", "البريد الإلكتروني")}
                        </label>
                        <input
                          type="email"
                          value={user?.email || ""}
                          placeholder={getLocalizedText("example@gmail.com", "مثال@gmail.com")}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {getLocalizedText("Mobile", "الهاتف المحمول")}
                        </label>
                        <input
                          type="tel"
                          value={user?.phoneNumber || ""}
                          placeholder={getLocalizedText("1234567890", "1234567890")}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <CouponSection setOrderData={setOrderData} handleBooking={handleBooking} />

                  {/* Pay Now Button */}
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full mt-8 flex mx-auto text-center justify-center cursor-pointer bg-[#932AAA] hover:bg-[#7d2391] text-white py-4 rounded-full font-semibold text-lg transition-colors duration-200 disabled:opacity-70"
                  >
                    {bookingLoading ? (
                      getLocalizedText("Booking...", "جارٍ الحجز...")
                    ) : (
                      <>
                        {getLocalizedText("Pay Now", "ادفع الآن")}
                        {" "} SAR{" "}
                        {orderData?.discountAmount > 0 ? (
                          <span className="flex items-center gap-2">
                            {/* Final Amount */}
                            <span className="font-bold text-white">
                              {orderData?.finalAmount?.toFixed(2)} /-
                            </span>
                            {/* Cut-through Original Price */}
                            <span className="line-through text-gray-300 text-sm">
                              {orderData?.totalAmount?.toFixed(2)}
                            </span>
                          </span>
                        ) : (
                          <span className="font-bold text-white">
                            {orderData?.finalAmount?.toFixed(2)}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default BookingForm;
