"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LanguageSwitcher = () => {
    const [lang, setLang] = useState<"en" | "ar">("en");
    const [isAnimating, setIsAnimating] = useState(false);

    // Load saved language on mount
    useEffect(() => {
        const storedLang = localStorage.getItem("lang") as "en" | "ar";
        if (storedLang) {
            setLang(storedLang);
            document.documentElement.dir = storedLang === "ar" ? "rtl" : "ltr";
        } else {
            localStorage.setItem("lang", "ar");
            document.documentElement.dir = "rtl";
            window.location.reload();
        }
    }, []);

    // Handle switch with animation delay
    const toggleLang = () => {
        if (isAnimating) return; // Prevent multiple clicks during animation

        setIsAnimating(true);
        const newLang = lang === "en" ? "ar" : "en";

        // Wait 1 second before switching language and direction
        setTimeout(() => {
            setLang(newLang);
            localStorage.setItem("lang", newLang);
            document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
            setIsAnimating(false);
            window.location.reload();
        }, 1000);
    };

    return (
        <motion.button
            onClick={toggleLang}
            className="relative flex cursor-pointer items-center w-20 h-8 rounded-full bg-[#6D0E82] shadow-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isAnimating}
        >
            {/* Animated Background Indicator */}
            <motion.div
                className="absolute w-10 h-7 bg-white rounded-full shadow-lg"
                initial={false}
                animate={{
                    x: lang === "en" ? 2 : 50,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.8
                }}
            />

            {/* Animated Language Text on the Indicator */}
            <motion.div
                className="absolute w-10 h-7 flex items-center justify-center font-bold text-gray-800 pointer-events-none"
                initial={false}
                animate={{
                    x: lang === "en" ? 2 : 50,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.8
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.span
                        key={lang}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                            duration: 0.3,
                            delay: isAnimating ? 0.7 : 0 // Delay text change during animation
                        }}
                        className="text-xs"
                    >
                        {lang.toUpperCase()}
                    </motion.span>
                </AnimatePresence>
            </motion.div>

            {/* Static Labels with Fade Animation */}
            <div className="flex justify-between w-full px-3 text-xs font-semibold text-white pointer-events-none">
                <motion.span
                    animate={{
                        opacity: lang === "en" ? 0.3 : 0.8,
                        scale: lang === "en" ? 0.9 : 1
                    }}
                    transition={{ duration: 0.3 }}
                >
                    EN
                </motion.span>
                <motion.span
                    animate={{
                        opacity: lang === "ar" ? 0.3 : 0.8,
                        scale: lang === "ar" ? 0.9 : 1
                    }}
                    transition={{ duration: 0.3 }}
                >
                    AR
                </motion.span>
            </div>

            {/* Loading Ripple Effect During Animation */}
            <AnimatePresence>
                {isAnimating && (
                    <motion.div
                        className="absolute inset-0 bg-blue-400 rounded-full opacity-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                            duration: 1,
                            ease: "easeOut"
                        }}
                    />
                )}
            </AnimatePresence>
        </motion.button>
    );
};