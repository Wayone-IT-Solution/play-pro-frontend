"use client";

import { Fetch } from "@/utils/axios";
import ShopCart from "./components/ShopCart";
import BestProducts from "./components/BestProducts";
import { useCallback, useEffect, useState } from "react";
import { getCart } from "@/utils/cartUtils";

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

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: any = await Fetch("/api/product/public", {}, 5000, true, false);
        setProducts(response?.data?.result ?? []);
      } catch (error) {
        console.log("Errro: ", error);
      }
    };
    fetchProducts();
  }, []);

  const fetchCartItems = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        const result = getCart();
        setItems(result as any || []);
        return;
      }
      const res: any = await Fetch("/api/cart", {}, 5000, true, false);
      if (res?.success && res.data?.items) {
        const fetchedItems = res.data.items.map((item: any) => ({
          name: item.name,
          brand: item.brand,
          price: item.price,
          category: item.category,
          quantity: item.quantity,
          productId: item.productId,
          description: item.description,
          image: item.image?.trim() || "/assets/cart1.png",
        }));
        setItems(fetchedItems);
      }
    } catch (err) {
      console.log("Error fetching cart items:", err);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <div className="max-w-6xl mx-auto py-4">
      <ShopCart items={items} setItems={setItems} />
      <BestProducts product={products} fetchCartItems={fetchCartItems} />
    </div>
  );
}
