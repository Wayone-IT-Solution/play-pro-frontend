"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface SectionHeadingProps {
  title: string;
  Icon?: IconType;
  subtitle: string;
  highlight: string;
  gradient?: string; // optional for different themes
}

export default function SectionHeading({
  // Icon,
  title,
  subtitle,
  highlight,
}: // gradient = "from-[#5BB35B] to-purple-500",
  SectionHeadingProps) {
  return (
    <div className="relative flex flex-col items-center justify-center mb-10 md:mb-16">
      {/* Animated Icon */}
      {/* <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className={`mb-4 flex items-center justify-center bg-gradient-to-tr ${gradient} p-2 rounded-full shadow-lg`}
      >
        <Icon size={24} className="text-white" />
      </motion.div> */}

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-extrabold text-center text-gray-800"
      >
        {title} <span className="text-[#014999]">{highlight}</span>
      </motion.h2>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-2 text-center w-4/5 md:max-w-4xl text-gray-600"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
