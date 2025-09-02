"use client";
import React, { useEffect, useState } from "react";
import ShopCart from "./components/ShopCart";
import BestProducts from "./components/BestProducts";
import { Fetch } from "@/utils/axios";

export default function Product() {
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res: any = await Fetch("/api/cart");
        if (res?.success) {
          setCart(res.data);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      {/* Pass cart data if ShopCart expects it */}
      <ShopCart cart={cart} />
      <BestProducts />
    </div>
  );
}
