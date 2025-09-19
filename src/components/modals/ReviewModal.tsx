"use client";

import Modal from "./Modal";
import { Post } from "@/utils/axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { X, CheckCircle2, Star } from "lucide-react";

interface ReviewModalProps {
    isOpen: boolean;
    bookingId: string;
    onClose: () => void;
}

const ratingFields = [
    { key: "cleanliness", label: "Cleanliness" },
    { key: "maintenance", label: "Maintenance" },
    { key: "staffBehavior", label: "Staff Behavior" },
    { key: "valueForMoney", label: "Value for Money" },
    { key: "groundCondition", label: "Ground Condition" },
    { key: "overallExperience", label: "Overall Experience" },
] as const;

type RatingKeys = (typeof ratingFields)[number]["key"];

export const ReviewModal: React.FC<ReviewModalProps> = ({
    isOpen,
    onClose,
    bookingId,
}) => {
    const [ratings, setRatings] = useState<Record<RatingKeys, number>>({
        cleanliness: 0,
        maintenance: 0,
        staffBehavior: 0,
        valueForMoney: 0,
        groundCondition: 0,
        overallExperience: 0,
    });

    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleRatingChange = (field: RatingKeys, value: number) => {
        setRatings((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!feedback.trim()) {
            toast.error("Feedback is required!");
            return;
        }
        if (Object.values(ratings).some((r) => r === 0)) {
            toast.error("Please provide all ratings!");
            return;
        }
        try {
            setLoading(true);
            await Post("/api/review", {
                ratings,
                feedback,
                bookingId,
            });
            setSubmitted(true);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;
    return (
        <Modal isVisible={isOpen} onClose={onClose} width="w-[95%] lg:w-2/5">
            <div className="animate-fadeIn">
                {!submitted ? (
                    <>
                        {/* Header */}
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Write a Review
                            </h2>
                        </div>

                        {/* Ratings Section */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {ratingFields.map(({ key, label }) => (
                                <div key={key} className="">
                                    <p className="font-medium text-gray-700 mb-1">{label}</p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => handleRatingChange(key, num)}
                                                className="transition"
                                            >
                                                <Star
                                                    size={22}
                                                    className={`${ratings[key] >= num
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-300 hover:text-yellow-400"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Feedback Box */}
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Share your experience..."
                            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-3 focus:ring-[#014999]/70"
                            rows={4}
                        />

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="mt-4 cursor-pointer px-6 py-3 bg-[#014999] text-white rounded-xl hover:bg-[#014999] transition"
                        >
                            {loading ? "Submitting..." : "Submit Review"}
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Thank You!
                        </h3>
                        <p className="text-gray-600 text-center">
                            Your review has been submitted successfully.
                        </p>
                        <button
                            type="submit"
                            onClick={onClose}
                            className="mt-6 cursor-pointer px-6 py-2 bg-[#014999] text-white rounded-xl hover:bg-[#014999] transition"
                        >
                            Done
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};
