"use client";

import { useEffect, useState } from "react";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Loading({
  text = "Loading...",
  fullScreen = true,
  size = "md",
}: LoadingProps) {
  const [, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);

    // Simulate progress (for demo purposes)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center z-50 bg-white"
    : "flex items-center justify-center py-12 bg-white";

  return (
    <div className={containerClasses}>
      <div
        className={`relative z-10 flex flex-col items-center justify-center ${fullScreen ? "min-h-screen" : ""
          }`}
      >
        {/* Square progress box */}
        <div className="relative mb-6">
          {/* Outer square */}
          <div
            className={`${sizeClasses[size]} border-2 border-emerald-100 rounded-md bg-white shadow-lg`}
          ></div>

          {/* Filling progress square */}
          <div
            className={`${sizeClasses[size]} absolute inset-0 rounded-md bg-[#6D0E82] transition-all duration-300`}
            style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
          ></div>

          {/* Border animation */}
          <div
            className={`${sizeClasses[size]} border-2 rounded-md absolute inset-0 animate-pulse border-emerald-500`}
          ></div>

          {/* Checkmark when complete */}
          {progress >= 100 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-1/2 h-1/2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Loading text */}
        <div className="mb-4 text-center">
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-[#6D0E82]">
            {text}
          </h3>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#6D0E82] transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress percentage */}
        <div className="mt-2 text-sm text-gray-600">
          {Math.min(100, Math.round(progress))}%
        </div>

        {/* Floating elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#6D0E82]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
