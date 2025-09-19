"use client";

import { Fetch } from "@/utils/axios";
import ShopCart from "./components/ShopCart";
import AuthGuard from "@/components/layout/AuthGuard";
import { useCallback, useEffect, useState } from "react";

export default function Cart() {
    const [items, setItems] = useState<any[]>([]);
    const [orderData, setOrderData] = useState({});
    const fetchOrderDetails = useCallback(async () => {
        try {
            const productOrderId = typeof window !== "undefined" && localStorage.getItem("productOrderId");
            const res: any = await Fetch("/api/order/" + productOrderId, {}, 5000, true, false);
            if (res?.success && res.data?.items) {
                setItems(res.data.items);
                setOrderData(res.data);
            }
        } catch (err) {
            console.log("Error fetching cart items:", err);
        }
    }, []);

    useEffect(() => {
        fetchOrderDetails();
    }, [fetchOrderDetails]);

    return (
        <AuthGuard>
            <div className="max-w-6xl mx-auto py-4">
                <ShopCart setOrderData={setOrderData} orderData={orderData} items={items} />
            </div>
        </AuthGuard>
    );
}
