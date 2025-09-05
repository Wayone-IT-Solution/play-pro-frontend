"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus, Trash } from "lucide-react";
import { Delete, Fetch, Put } from "@/utils/axios";

type CartItemType = {
  brand: string;
  name: string;
  price: number;
  image: string;
  productId: string;
  category: string;
  quantity: number;
  description: string;
};
``;

const ShoeCartComponent = ({
  items,
  setItems,
  fetchCartItems,
}: {
  items: any;
  setItems: any;
  fetchCartItems: any;
}) => {
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
      console.error("Error updating cart quantity:", err);
    }
  };

  // ------------------ Delete Item ------------------
  const handleDelete = async (productId: string, index: number) => {
    try {
      await Delete("/api/cart/" + productId);
      setItems((prev: any) => prev.filter((_: any, i: any) => i !== index));
    } catch (err) {
      console.error("Error deleting from cart:", err);
    }
  };

  // ------------------ Calculate Total ------------------
  const calculateTotal = () => {
    return items.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
  };

  // ------------------ Cart Item Component ------------------
  const CartItem: React.FC<{ item: CartItemType; index: number }> = ({
    item,
    index,
  }) => (
    <div className="flex items-center gap-4 bg-white rounded-lg mb-4 w-full">
      <div className="w-40 h-40 rounded-lg flex-shrink-0 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              {item.brand} {item.name}{" "}
              <span className="text-gray-400 font-normal">(NEW)</span>
            </h3>
            <p className="text-sm text-gray-600 mb-2 leading-relaxed">
              {item.description}
            </p>
            <p className="text-sm text-gray-500">#{item.productId}</p>
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
              className="w-8 h-8 flex items-center justify-center text-white"
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
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white rounded-3xl border-4 border-gray-200 flex flex-col mt-24">
      <div className="flex flex-col space-y-0 w-full">
        {items.map((item: any, i: any) => (
          <CartItem key={i} item={item} index={i} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 px-4 w-full border-t pt-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">Grand Total:</span>
          <div
            className="px-4 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: "#932AAA" }}
          >
            SAR {calculateTotal()}
          </div>
        </div>
        <button
          className="px-20 py-3 rounded-full text-white font-medium text-lg"
          style={{ backgroundColor: "#932AAA" }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default ShoeCartComponent;
