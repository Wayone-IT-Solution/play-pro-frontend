"use client";

import { motion } from "framer-motion";
import { Fetch, Post } from "@/utils/axios";
import { formatCurrency } from "@/hooks/general";
import React, { useEffect, useState } from "react";
import { FaTag, FaTimes, FaTicketAlt, FaCheck, FaPercentage, FaGift, FaCopy } from "react-icons/fa";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3 }
    }
};

const successVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 10
        }
    },
    exit: {
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

export default function CouponSection({ handleBooking, setOrderData }: { handleBooking: any, setOrderData: any }) {
    const [coupons, setCoupons] = useState([]);
    const [couponInput, setCouponInput] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'fixed': return FaGift;
            case 'shipping': return FaTag;
            case 'percentage': return FaPercentage;
            default: return FaTag;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'fixed': return 'from-gray-500 to-teal-600';
            case 'shipping': return 'from-orange-500 to-red-600';
            case 'percentage': return 'from-blue-500 to-purple-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const bookingDataStr: any = localStorage.getItem("orderData");
                if (bookingDataStr) {
                    const bookingData = JSON.parse(bookingDataStr);
                    const response: any = await Fetch("/api/booking/" + bookingData?._id, {}, 5000, true, false);
                    if (response?.success && response?.data?.couponId) {
                        const applied: any = coupons.filter((coupon: any) => coupon._id === response?.data?.couponId);
                        setOrderData({ ...response?.data, code: applied?.[0]?.code });
                        setAppliedCoupon({ ...response?.data, code: applied?.[0]?.code });
                    }
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        if (coupons.length > 0) fetchBooking();
    }, [coupons]);

    const handleApply = async (code: string) => {
        if (appliedCoupon?.code === code) return;
        try {
            let booking, bookingDataStr;
            bookingDataStr = localStorage.getItem("orderData");
            if (!bookingDataStr) booking = await handleBooking();
            bookingDataStr = localStorage.getItem("orderData");
            if (bookingDataStr) {
                const bookingData = JSON.parse(bookingDataStr);
                const response: any = await Post("/api/booking/apply", { bookingId: bookingData._id, couponCode: code });
                if (response?.success) {
                    setIsAnimating(true);
                    setTimeout(() => {
                        setAppliedCoupon(response?.data);
                        setOrderData(response?.data);
                        setCouponInput("");
                        setIsAnimating(false);
                    }, 300);
                }
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    };

    const handleRemove = async () => {
        try {
            const bookingDataStr = localStorage.getItem("orderData");
            if (bookingDataStr && appliedCoupon) {
                const bookingData = JSON.parse(bookingDataStr);
                const response: any = await Post("/api/booking/remove", { bookingId: bookingData._id });
                if (response?.success) {
                    setAppliedCoupon(null);
                }
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    };

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopiedCode(code);
            setTimeout(() => setCopiedCode(null), 2000);
        })
    };

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response: any = await Fetch("/api/coupon/public", {}, 5000, true, false);
                if (response?.success) setCoupons(response?.data?.result);
            } catch (error) {
                console.log("Error: ", error)
            }
        };
        fetchCoupons();
    }, []);

    return (
        <div className="bg-gray-100 rounded-2xl border border-gray-100">
            <motion.div
                initial="hidden"
                animate="visible"
                className="w-full"
                variants={containerVariants}
            >
                {/* Header */}
                <motion.div
                    className="text-left p-4"
                    variants={itemVariants}
                >
                    <h1 className="text-lg font-bold">
                        Available Coupons
                    </h1>
                    <p className="text-xs">
                        Save more on your orders with our exclusive deals
                    </p>
                </motion.div>

                {/* Main Container */}
                <div className="bg-white p-4">

                    {/* Apply Coupon Input */}
                    <motion.div
                        className="mb-4"
                        variants={itemVariants}
                    >
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <FaTag className="text-gray-600" />
                            Apply Coupon Code
                        </h3>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={couponInput}
                                placeholder="Enter coupon code (e.g., SAVE10)"
                                onChange={(e) => setCouponInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleApply(couponInput)}
                                className="flex-1 bg-white/20 border border-gray-200 rounded-2xl px-2 py-4 lg:px-6 lg:py-3 placeholder-gray-300 text-sm backdrop-blur-sm focus:ring-4 focus:ring-gray-600 focus:border-transparent outline-none transition-all"
                            />
                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => handleApply(couponInput)}
                                disabled={!couponInput.trim() || isAnimating}
                                className="bg-gray-600 text-white p-2 md:px-6 lg:px-8 lg:py-3 rounded-2xl text-sm md:text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {isAnimating ? 'Applying...' : 'Apply Code'}
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Applied Coupon */}
                    {appliedCoupon && (
                        <motion.div
                            exit="exit"
                            className="mb-4"
                            initial="initial"
                            animate="animate"
                            variants={successVariants as any}
                        >
                            <div className="bg-gray-600 backdrop-blur-sm p-4 rounded-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="bg-white p-2 rounded-lg">
                                            <FaCheck className="text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-lg">
                                                {appliedCoupon.code} Applied!
                                            </p>
                                            <p className="text-gray-200 text-sm">
                                                You saved {formatCurrency(appliedCoupon.discountAmount)}
                                            </p>
                                        </div>
                                    </div>
                                    <motion.button
                                        type="button"
                                        onClick={handleRemove}
                                        className="text-white cursor-pointer hover:text-gray-600 hover:bg-white p-2 rounded-lg transition-all"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FaTimes className="text-lg" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Coupon Grid */}
                    <motion.div
                        className="space-y-4"
                        variants={itemVariants}
                    >
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <FaGift className="text-xl text-gray-600" />
                            Available Offers
                        </h3>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {coupons.map((coupon: any, index: number) => {
                                const IconComponent = getCategoryIcon(coupon.category);
                                const isApplied = appliedCoupon?.couponId === coupon._id;
                                return (
                                    <motion.div

                                        key={coupon._id}
                                        className={`relative group overflow-hidden rounded-2xl transition-all duration-300 ${isApplied
                                            ? 'border-gray-400/50 bg-gray-500/10'
                                            : 'bg-gray-100'
                                            }`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                delay: index * 0.1,
                                                duration: 0.3
                                            }
                                        }}
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    >
                                        <div className="p-4 flex flex-col h-full cursor-pointer items-start justify-between">
                                            {/* Header */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={`bg-gradient-to-r ${getCategoryColor(coupon.category)} p-3 rounded-xl shadow-lg`}>
                                                        <IconComponent className="text-white text-lg" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-1">
                                                            <h4 className="font-bold">
                                                                {coupon.code}
                                                            </h4>
                                                            <button
                                                                disabled={true}
                                                                title="Copy code"
                                                                onClick={() => copyCode(coupon.code)}
                                                                className="text-gray-500 transition-colors p-1"
                                                            >
                                                                <FaCopy className="text-sm" />
                                                            </button>
                                                            {copiedCode === coupon.code && (
                                                                <span className="text-gray-400 text-xs font-medium">
                                                                    Copied!
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-gray-500 pt-2 mb-2 text-xs line-clamp-2">{coupon.description}</p>
                                            <div className="mb-2 space-y-1">
                                                {coupon.minBookingAmount && (
                                                    <p className="text-gray-500 text-sm font-semibold">
                                                        • Minimum order: SAR {coupon.minBookingAmount}
                                                    </p>
                                                )}
                                                {coupon.maxDiscountAmount && (
                                                    <p className="text-gray-500 text-sm font-semibold">
                                                        • Maximum discount: SAR {coupon.maxDiscountAmount}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Action Button */}
                                            <motion.button
                                                type="button"
                                                disabled={isApplied}
                                                onClick={() => handleApply(coupon.code)}
                                                className={`w-full p-3 rounded-xl cursor-pointer font-semibold transition-all ${isApplied
                                                    ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed border border-gray-500/30'
                                                    : 'bg-gray-600 text-white shadow-lg hover:shadow-xl'
                                                    }`}
                                                whileHover={!isApplied ? { scale: 1.02 } : {}}
                                                whileTap={!isApplied ? { scale: 0.98 } : {}}
                                            >
                                                {isApplied ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <FaCheck /> Applied
                                                    </span>
                                                ) : (
                                                    'Apply Coupon'
                                                )}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                            {coupons?.length === 0 &&
                                <div className="flex col-span-3 flex-col items-center justify-center">
                                    {/* Icon */}
                                    <div className="relative">
                                        <FaTicketAlt className="h-48 w-48 text-gray-400" />
                                    </div>

                                    {/* Heading */}
                                    <h2 className="mt-6 text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        No Coupons Available
                                    </h2>

                                    {/* Subtext */}
                                    <p className="mt-2 text-base text-center text-gray-500 max-w-md">
                                        Currently, you don&apos;t have any active coupons. Keep shopping and
                                        check back later for exciting offers!
                                    </p>
                                </div>
                            }
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}