"use client";

import React from 'react'
import Image from 'next/image';
import { Put } from '@/utils/axios';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/utils/cartUtils';
import { getLocalizedText } from '@/hooks/general';

export const ProductCard = ({ product, index, fetchCartItems }: { product: any, index: any, fetchCartItems?: any }) => {
    const router = useRouter();

    const handleAddToCart = async (item: any) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                const result = addToCart(product);
                if (result.success) {
                    toast.success(result.message);
                } else toast.warn(result.message);
                return router.push("/cart");
            }
            const response: any = await Put(
                "/api/cart",
                { productId: item._id, quantity: 1 },
            );
            if (response?.success) {
                fetchCartItems?.();
                router.push("/cart");
            }
        } catch (err) {
            console.log("Error adding to cart:", err);
        }
    };

    return (
        <motion.div
            key={product._id}
            className="rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col transition-all"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        >
            {/* Product Image */}
            <div className="relative h-56 w-full">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
                {product.brand && (
                    <div
                        className="absolute top-3 right-3 bg-white/90 text-gray-800 px-2 py-1 rounded-full shadow-md text-xs font-medium italic"
                        style={{ fontFamily: "Poppins" }}
                    >
                        {product.brand}
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-base md:text-lg text-gray-900 line-clamp-1">
                        {product.name}
                    </span>
                    {product.rating && (
                        <span className="flex items-center text-xs text-yellow-600 font-medium gap-1">
                            ⭐ {product.rating}
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                    {product.description || getLocalizedText("No description available", "لا يوجد وصف متاح")}
                </p>

                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                    <span className="text-lg font-semibold text-gray-900">
                        SAR {product.price}
                    </span>
                    <motion.button
                        onClick={() => handleAddToCart(product)}
                        className="px-4 cursor-pointer py-2 text-sm rounded-full"
                        style={{
                            background: "#6D0E82",
                            color: "#fff",
                            fontWeight: 600,
                            fontFamily: "Inter, sans-serif",
                        }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {getLocalizedText("Add to Cart", "أضف إلى السلة")}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}
