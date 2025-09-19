"use client";

import Image from "next/image";
import Address from "./Address";
import { Post } from "@/utils/axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import CouponSection from "./CouponSection";
import { useRouter } from "next/navigation";
import { getLocalizedText, getLocalizedValues } from "@/hooks/general";

type CartItemType = {
  _id: any;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  productId: string;
  description: string;
};

const ShoeCartComponent = ({ items, orderData, setOrderData }: { items: any; orderData: any; setOrderData: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    city: "",
    state: "",
    street: "",
    country: "",
    postalCode: "",
  });

  const validateAddress = () => {
    if (!address.street.trim()) {
      toast.error(getLocalizedText("Street is required", "الشارع مطلوب"));
      return false;
    }
    if (!address.city.trim()) {
      toast.error(getLocalizedText("City is required", "المدينة مطلوبة"));
      return false;
    }
    if (!address.state.trim()) {
      toast.error(getLocalizedText("State is required", "المحافظة مطلوبة"));
      return false;
    }
    if (!address.postalCode.trim()) {
      toast.error(
        getLocalizedText("Postal Code is required", "الرمز البريدي مطلوب")
      );
      return false;
    }
    if (!address.country.trim()) {
      toast.error(getLocalizedText("Country is required", "الدولة مطلوبة"));
      return false;
    }
    return true;
  };

  const handlePayNow = async () => {
    try {
      setLoading(true);
      if (items.length === 0) return toast.warn("Please add products in your cart!");
      if (!validateAddress()) return;

      const productOrderId = localStorage.getItem("productOrderId");
      if (!productOrderId) return;
      const data = { clear: true, address }
      const response: any = await Post(`/api/order/${productOrderId}`, data, 5000);
      if (response?.success) {
        localStorage.setItem("productOrderId", response?.data?._id);
        return router.replace("/confirmation");
      }
    } catch (err) {
      console.log("Error placing order:", err);
    } finally {
      setLoading(false);
    }
  };

  const CartItem: React.FC<{ item: CartItemType; index: number }> = ({ item }) => {
    item = getLocalizedValues(item);
    return <div className="flex items-center gap-4 bg-white rounded-lg mb-4 w-full">
      <div className="w-24 h-24 lg:w-40 lg:h-40 border border-gray-200 shadow rounded-lg flex-shrink-0 overflow-hidden">
        <Image
          width={200}
          height={200}
          alt={item.name}
          src={item.image}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-lg">
              {item.brand} {item.name}
            </h3>
          </div>

          <p className="hidden md:block text-sm text-gray-600 leading-relaxed line-clamp-2">
            {item.description}
          </p>

          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">
              {item.category}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              SAR {item.price}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-10 text-center whitespace-nowrap font-medium bg-white text-gray-900">
              {String(item.quantity)} Qty
            </span>
          </div>
        </div>
      </div>
    </div>
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white rounded-3xl border-4 border-gray-200 flex flex-col mt-24">
      <div className="flex flex-col space-y-0 w-full">
        {items.map((item: any, i: any) => (
          <CartItem key={i} item={item} index={i} />
        ))}
      </div>

      <div className="my-4">
        <CouponSection setOrderData={setOrderData} />
      </div>
      <Address address={address} setAddress={setAddress} />

      <div className="mt-6 px-4 w-full border-t pt-4">
        {/* Order Summary */}
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          {getLocalizedText("Order Summary", "ملخص الطلب")}
        </h3>

        <div className="space-y-2 text-gray-700">
          {/* Total Amount */}
          <div className="flex justify-between">
            <span>{getLocalizedText("Total Amount", "المبلغ الإجمالي")}</span>
            <span>SAR {orderData?.totalAmount?.toFixed(2)}</span>
          </div>

          {/* Discount */}
          {orderData?.discountAmount > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>{getLocalizedText("Discount", "الخصم")}</span>
              <span>- SAR {orderData?.discountAmount?.toFixed(2)}</span>
            </div>
          )}

          {/* Applied Coupon */}
          {orderData?.appliedCoupon && (
            <div className="flex justify-between text-sm text-purple-600">
              <span>{getLocalizedText("Applied Coupon", "الكوبون المطبق")}</span>
              <span>{orderData?.appliedCoupon}</span>
            </div>
          )}

          {/* Final Amount */}
          <div className="flex justify-between font-bold text-gray-900 border-t pt-2">
            <span>{getLocalizedText("Final Amount", "المبلغ النهائي")}</span>
            <span className="text-[#932AAA]">
              SAR {orderData?.finalAmount?.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          disabled={loading}
          onClick={handlePayNow}
          className="w-full mt-6 flex items-center justify-center cursor-pointer bg-[#932AAA] hover:bg-[#7d2391] text-white py-4 rounded-full font-semibold text-lg transition-colors duration-200 disabled:opacity-70"
        >
          {loading
            ? getLocalizedText("Processing...", "جارٍ المعالجة...")
            : getLocalizedText("Pay Now", "ادفع الآن")
          }
        </button>
      </div>

    </div>
  );
};

export default ShoeCartComponent;
