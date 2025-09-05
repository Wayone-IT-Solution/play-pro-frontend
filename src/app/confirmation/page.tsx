"use client";

import Image from "next/image";
import { Fetch } from "@/utils/axios";
import OrderDetailsPage from "./components/OrderDetailsPage";
import React, { useCallback, useEffect, useState } from "react";

const ThankYouPage: React.FC = () => {
  const [orderData, setOrderData] = useState<any>({});
  const fetchOrder = useCallback(async (bookingId: any) => {
    try {
      const response: any = await Fetch("/api/order/" + bookingId, {}, 5000, true, false);
      if (response?.success) setOrderData(response?.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bookingDataStr = localStorage.getItem("productOrderId");
      if (bookingDataStr) {
        fetchOrder(bookingDataStr);
      }
    }
  }, [fetchOrder]);

  return (
    <div className="p-6 mt-24 w-full">
      <div className="bg-white max-w-6xl mx-auto">
        <div className="rounded-3xl text-center relative">
          {/* Thank You Image */}
          <div className="mb-8 mt-4">
            <Image
              src="/assets/thankyou.png"
              alt="Thank You"
              width={400}
              height={120}
              className="w-full max-w-sm mx-auto"
              priority
            />
          </div>
          {orderData?._id &&
            <OrderDetailsPage data={orderData as any} />
          }
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
