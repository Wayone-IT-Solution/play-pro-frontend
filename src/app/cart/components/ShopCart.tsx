"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Delete, Post, Put } from "@/utils/axios";
import { Plus, Minus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

type CartItemType = {
  brand: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  productId: string;
  description: string;
};

const ShoeCartComponent = ({
  items,
  setItems,
  fetchCartItems,
}: {
  items: any;
  setItems: any;
  fetchCartItems?: any;
}) => {
  // ------------------ Pay Now ------------------
  const router = useRouter();
  const [paymentMethod] = useState("COD");
  const [address, setAddress] = useState("");

  const handlePayNow = async () => {
    try {
      if (!address) return toast.warn("Please Provide Addresss!");
      const orderPayload = {
        paymentMethod,
        address,
      };
      const res: any = await Post("/api/order", orderPayload, 5000, true);
      if (res?.success) {
        localStorage.setItem("productOrderId", res?.data?._id);
        return router.replace("/confirmation");
      } else {
        console.error("Order failed:", res);
        toast.error(res?.message || "Failed to place order", {
          style: {
            background: "#932AAA",
            color: "#fff",
          },
        });
      }
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Something went wrong!", {
        style: {
          background: "#932AAA",
          color: "#fff",
        },
      });
    }
  };

  // ------------------ Update Quantity ------------------
  const updateQuantity = async (index: number, change: number) => {
    const newQty = Math.max(1, items[index].quantity + change);
    try {
      await Put("/api/cart", {
        productId: items[index].productId,
        quantity: newQty,
      });
      setItems((prev: any) => {
        const copy = [...prev];
        copy[index].quantity = newQty;
        return copy;
      });
    } catch (err) {
      console.log("Error updating cart quantity:", err);
    }
  };

  // ------------------ Delete Item ------------------
  const handleDelete = async (productId: string, index: number) => {
    try {
      await Delete("/api/cart/" + productId);
      setItems((prev: any) => prev.filter((_: any, i: any) => i !== index));
    } catch (err) {
      console.log("Error deleting from cart:", err);
    }
  };

  // ------------------ Calculate Total ------------------
  const calculateTotal = () => {
    return items.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
  };

  // ------------------ Cart Item ------------------
  const CartItem: React.FC<{ item: CartItemType; index: number }> = ({
    item,
    index,
  }) => (
    <div className="flex items-center gap-4 bg-white rounded-lg mb-4 w-full">
      <div className="w-24 h-24 lg:w-40 lg:h-40 rounded-lg flex-shrink-0 overflow-hidden">
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
              SAR {item.price * item.quantity}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-[#932AAA] rounded-lg overflow-hidden h-8">
              <button
                onClick={() => updateQuantity(index, -1)}
                className="w-10 h-10 aspect-square rounded-r-xl flex items-center cursor-pointer justify-center text-white"
                style={{ backgroundColor: "#932AAA" }}
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-medium bg-white text-gray-900">
                {String(item.quantity).padStart(2, "0")}
              </span>
              <button
                onClick={() => updateQuantity(index, 1)}
                className="w-10 h-10 aspect-square rounded-l-xl flex items-center cursor-pointer justify-center text-white"
                style={{ backgroundColor: "#932AAA" }}
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => handleDelete(item.productId, index)}
              className="w-8 h-8 flex items-center cursor-pointer justify-center text-white"
              style={{ backgroundColor: "#932AAA" }}
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ------------------ Render ------------------
  return (
    <>
      <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white rounded-3xl border-4 border-gray-200 flex flex-col mt-24">
        <div className="flex flex-col space-y-0 w-full">
          {items.map((item: any, i: any) => (
            <CartItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Address Field (Single Row Input) */}
        <div className="mt-4 px-2 w-full">
          <label className="block mb-2 font-medium text-gray-700">Add Address</label>
          <input
            type="text"
            value={address}
            style={{ backgroundColor: "#fff" }}
            placeholder="Enter delivery address"
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border-2 border-gray-200 text-[#932AAA] rounded-lg p-2 focus:outline-none focus:ring-2 focus:border-[#932AAA] transition-colors"
          />
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-2 items-center justify-between mt-6 px-4 w-full border-t pt-4">
          <div className="flex items-center justify-between w-full gap-3">
            <span className="text-gray-700 font-medium">Grand Total:</span>
            <div
              className="px-4 py-2 rounded-full text-white font-semibold"
              style={{ backgroundColor: "#932AAA" }}
            >
              SAR {calculateTotal()}
            </div>
          </div>
          <button
            onClick={handlePayNow}
            className="px-20 whitespace-nowrap cursor-pointer py-3 w-full md:w-fit rounded-full text-white font-medium text-lg"
            style={{ backgroundColor: "#932AAA" }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoeCartComponent;
