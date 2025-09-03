"use client";

import ShopCart from "./components/ShopCart";
import BestProducts from "./components/BestProducts";

import { useCallback, useEffect, useState } from "react";
import { Fetch } from "@/utils/axios";

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

export default function Product() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: any = await Fetch("/api/product/public");
        setProducts(response?.data?.result ?? []);
      } catch (error) {
        console.log("Errro: ", error);
      }
    };
    fetchProducts();
  }, []);

  const fetchCartItems = useCallback(async () => {
    try {
      const res: any = await Fetch("/api/cart", {}, 5000, true, false);
      if (res?.success && res.data?.items) {
        const fetchedItems = res.data.items.map((item: any) => ({
          brand: item.brand,
          name: item.name,
          price: item.price,
          image: item.image?.trim() || "/assets/cart1.png",
          productId: item.productId,
          category: item.category,
          quantity: item.quantity,
          description: item.description,
        }));
        setItems(fetchedItems);
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  }, []);
  return (
    <div>
      <ShopCart
        items={items}
        setItems={setItems}
        fetchCartItems={fetchCartItems}
      />
      <BestProducts product={products} fetchCartItems={fetchCartItems} />
    </div>
  );
}
