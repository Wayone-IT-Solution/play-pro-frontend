"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Trash } from "lucide-react";

type CartItemProps = {
  index: number;
  imageSrc: string;
  onDelete: (index: number) => void;
};

const ShoeCartComponent = ({ cart }: { cart: any }) => {
  const [quantities, setQuantities] = useState<number[]>([1, 1]);
  const [items, setItems] = useState([
    { imageSrc: "/assets/cart1.png" },
    { imageSrc: "/assets/cart1.png" },
  ]);

  const updateQuantity = (index: number, change: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.max(1, newQuantities[index] + change);
      return newQuantities;
    });
  };

  // Remove item from both items and quantities arrays
  const handleDelete = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setQuantities((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = (): number => {
    return quantities.reduce((total, qty) => total + qty * 300, 0);
  };

  const CartItem: React.FC<CartItemProps> = ({ index, imageSrc, onDelete }) => (
    <div className="flex items-center gap-4 bg-white rounded-lg mb-4 w-full">
      {/* Product Image */}
      <div className="w-40 h-40 rounded-lg flex-shrink-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt="Classic White Shoes"
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {/* Product Details */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              Classic White Shoes{" "}
              <span className="text-gray-400 font-normal">(NEW)</span>
            </h3>
            <p className="text-sm text-gray-600 mb-2 leading-relaxed">
              A shoe is an item of footwear intended to protect and comfort the
              human foot. Though the human foot can adapt to varied terrain and
              climate conditions, it is vulnerable, and shoes p...
            </p>
            <p className="text-sm text-gray-500">#123456789</p>
          </div>
        </div>
        {/* Price and Quantity Controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              ج.م{quantities[index] * 300}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ج.م{quantities[index] * 500}
            </span>
            <span className="text-sm text-green-600 font-medium">
              (53% Off)
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Quantity Controls */}
            <div className="flex items-center border border-[#932AAA] rounded-lg overflow-hidden h-8">
              <button
                onClick={() => updateQuantity(index, -1)}
                className="w-10 h-10 aspect-square rounded-r-xl flex items-center cursor-pointer justify-center text-white"
                style={{ backgroundColor: "#932AAA" }}
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-medium bg-white text-gray-900">
                {String(quantities[index]).padStart(2, "0")}
              </span>
              <button
                onClick={() => updateQuantity(index, 1)}
                className="w-10 h-10 aspect-square rounded-l-xl flex items-center cursor-pointer justify-center text-white"
                style={{ backgroundColor: "#932AAA" }}
              >
                <Plus size={16} />
              </button>
            </div>
            {/* Delete Icon */}
            <button
              onClick={() => onDelete(index)}
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

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white rounded-3xl border-4 border-gray-200 flex flex-col mt-24">
      <div className="flex flex-col space-y-0 w-full">
        {items.map((item, i) => (
          <CartItem
            key={i}
            index={i}
            imageSrc={item.imageSrc}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Grand Total row */}
      <div className="flex items-center justify-between mt-6 px-4 w-full border-t pt-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">Grand Total:</span>
          <div
            className="px-4 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: "#932AAA" }}
          >
            ₹ {calculateTotal()}
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
