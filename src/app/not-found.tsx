"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaStar, FaHeart, FaRocket, FaArrowLeft } from "react-icons/fa";

export default function NotFoundPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize animations and particles
  useEffect(() => {
    setIsVisible(true);

    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const suggestions = [
    { text: "Home", icon: <FaHome className="w-4 h-4" />, href: "/" },
    { text: "Blog", icon: <FaRocket className="w-4 h-4" />, href: "/blogs" },
    { text: "About", icon: <FaStar className="w-4 h-4" />, href: "/about" },
    {
      text: "Contact",
      icon: <FaHeart className="w-4 h-4" />,
      href: "/contact",
    },
  ];

  return (
    <div className="relative flex min-h-screen pt-40 pb-20 flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black px-6 text-center text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: `${20 + mousePosition.y * 0.05}%`,
            left: `${10 + mousePosition.x * 0.03}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: `${20 + mousePosition.y * 0.03}%`,
            right: `${10 + mousePosition.x * 0.05}%`,
            transform: "translate(50%, 50%)",
            animationDelay: "1s",
          }}
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* 404 Number with Advanced Animation */}
        <div
          className={`mb-8 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="relative text-8xl md:text-9xl font-black">
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
              404
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 blur-sm">
              404
            </span>
          </h1>

          {/* Glitch Effect Lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-1/4 left-0 w-full h-1 bg-red-500/50 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute top-3/4 left-0 w-3/4 h-1 bg-cyan-500/50 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
        </div>

        {/* Subtitle with Typewriter Effect */}
        <div
          className={`mb-8 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100">
              Oops! This page seems to have vanished into the digital void.
            </span>
          </p>
          <p className="text-lg text-gray-400 mt-2">
            Let&apos;s help you find your way back home.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div
          className={`mb-8 transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-gray-400 mb-6">Or try these popular sections:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {suggestions.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group relative p-4 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:bg-gray-700/60 transition-all duration-300 hover:scale-105 hover:border-purple-500/50"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
                <div className="relative flex flex-col items-center gap-2">
                  <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    {item.text}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col justify-center sm:flex-row gap-4 transform transition-all duration-1000 delay-900 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Link
            href="/"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-8 py-4 text-lg font-bold shadow-2xl hover:from-pink-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <div className="relative flex items-center gap-3">
              <FaHome className="w-5 h-5" />
              Back to Home
            </div>
          </Link>

          <button
            onClick={() => router.back()}
            className="group relative overflow-hidden rounded-2xl bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 px-8 py-4 text-lg font-bold hover:bg-gray-700/80 hover:border-gray-500/50 transform hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <div className="relative flex items-center gap-3">
              <FaArrowLeft className="w-5 h-5" />
              Go Back
            </div>
          </button>
        </div>

        {/* Error Code Details */}
        <div
          className={`mt-12 transform transition-all duration-1000 delay-1100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-md mx-auto p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30">
            <h3 className="text-lg font-semibold text-gray-200 mb-3">
              Error Details
            </h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Status Code:</span>
                <span className="text-red-400 font-mono">404</span>
              </div>
              <div className="flex justify-between">
                <span>Error Type:</span>
                <span className="text-yellow-400">Page Not Found</span>
              </div>
              <div className="flex justify-between">
                <span>Timestamp:</span>
                <span className="text-blue-400 font-mono">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Help Text */}
        <div
          className={`mt-8 transform transition-all duration-1000 delay-1300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Don&apos;t worry! Even the best explorers sometimes take a wrong
            turn. Use the search above or navigation links to continue your
            journey.
          </p>
        </div>
      </div>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]">
          <svg width="100%" height="100%" className="animate-pulse">
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(5deg);
          }
          50% {
            transform: translateY(-20px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-5deg);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.8);
          }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #7c3aed, #db2777);
        }
      `}</style>
    </div>
  );
}
