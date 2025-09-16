"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaBug,
  FaCog,
  FaSearch,
  FaRocket,
  FaShieldAlt,
  FaHeartBroken,
  FaExclamationTriangle,
} from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [errorDetails, setErrorDetails] = useState({
    name: "",
    stack: "",
    message: "",
    timestamp: "",
  });

  useEffect(() => {
    setIsVisible(true);

    // Extract error details
    setErrorDetails({
      name: error.name || "UnknownError",
      timestamp: new Date().toISOString(),
      message: error.message || "An unexpected error occurred",
      stack: error.stack?.split("\n").slice(0, 3).join("\n") || "",
    });

    // Generate floating particles
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
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

    // Console error logging
    console.log("Global Error:", error);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [error]);

  const handleReportError = () => {
    // In a real app, this would send the error to your error tracking service
    const errorReport = {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    console.log("Error Report:", errorReport);
    // Example: sendToErrorTracking(errorReport);

    alert("Error report has been logged. Thank you for helping us improve!");
  };

  const quickActions = [
    {
      text: "Go Home",
      icon: <FaHome className="w-5 h-5" />,
      href: "/",
      color: "from-green-500 to-emerald-600",
    },
    {
      text: "Try Again",
      icon: <HiOutlineRefresh className="w-5 h-5" />,
      action: reset,
      color: "from-blue-500 to-cyan-600",
    },
    {
      text: "Report Bug",
      icon: <FaBug className="w-5 h-5" />,
      action: handleReportError,
      color: "from-orange-500 to-red-500",
    },
    {
      text: "Contact Support",
      icon: <FaShieldAlt className="w-5 h-5" />,
      href: "/contact",
      color: "from-purple-500 to-indigo-600",
    },
  ];

  const errorTypes = {
    TypeError: { icon: <FaCog className="w-6 h-6" />, color: "text-blue-400" },
    ReferenceError: {
      icon: <FaSearch className="w-6 h-6" />,
      color: "text-yellow-400",
    },
    SyntaxError: { icon: <FaBug className="w-6 h-6" />, color: "text-red-400" },
    NetworkError: {
      icon: <FaShieldAlt className="w-6 h-6" />,
      color: "text-orange-400",
    },
    ChunkLoadError: {
      icon: <FaRocket className="w-6 h-6" />,
      color: "text-purple-400",
    },
    UnknownError: {
      icon: <FaHeartBroken className="w-6 h-6" />,
      color: "text-gray-400",
    },
  };

  const currentErrorType =
    errorTypes[error.name as keyof typeof errorTypes] ||
    errorTypes.UnknownError;

  return (
    <html>
      <body>
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-900/20 via-gray-900 to-black px-6 text-center text-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient Orbs */}
            <div
              className="absolute w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"
              style={{
                top: `${15 + mousePosition.y * 0.05}%`,
                left: `${5 + mousePosition.x * 0.03}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
              style={{
                bottom: `${15 + mousePosition.y * 0.03}%`,
                right: `${5 + mousePosition.x * 0.05}%`,
                transform: "translate(50%, 50%)",
                animationDelay: "1s",
              }}
            />

            {/* Floating Particles */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-1 h-1 bg-red-400/40 rounded-full animate-pulse"
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
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Error Icon and Status */}
            <div
              className={`mb-8 transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-500/30 animate-pulse">
                  <FaExclamationTriangle className="w-12 h-12 text-red-400" />
                </div>

                {/* Pulsing rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-red-500/20 rounded-full animate-ping" />
                  <div
                    className="absolute w-40 h-40 border-2 border-red-500/10 rounded-full animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
              </div>

              <h1 className="text-6xl md:text-7xl font-black mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500">
                  ERROR
                </span>
              </h1>

              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`${currentErrorType.color}`}>
                  {currentErrorType.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-200">
                  {error.name || "System Error"}
                </h2>
              </div>
            </div>

            {/* Error Message */}
            <div
              className={`mb-8 transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-red-300 mb-3">
                  What happened?
                </h3>
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  {error.message ||
                    "Something went wrong and we couldn't recover from it. This error has been logged and our team will investigate."}
                </p>

                {error.digest && (
                  <div className="bg-gray-800/50 rounded-lg p-3 text-sm">
                    <span className="text-gray-400">Error ID: </span>
                    <code className="text-yellow-400 font-mono">
                      {error.digest}
                    </code>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div
              className={`mb-8 transform transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <p className="text-gray-400 mb-6 text-lg">
                Choose your next step:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                  const Component: any = action.href ? Link : "button";
                  const props = action.href
                    ? { href: action.href }
                    : { onClick: action.action };

                  return (
                    <Component
                      key={index}
                      {...props}
                      className={`group relative p-6 bg-gradient-to-br ${action.color} rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 active:scale-95`}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex flex-col items-center gap-3">
                        <div className="text-white group-hover:scale-110 transition-transform duration-200">
                          {action.icon}
                        </div>
                        <span className="text-white font-semibold text-sm">
                          {action.text}
                        </span>
                      </div>
                    </Component>
                  );
                })}
              </div>
            </div>

            {/* Technical Details (Collapsible) */}
            <div
              className={`mb-8 transform transition-all duration-1000 delay-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <details className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 max-w-3xl mx-auto">
                <summary className="cursor-pointer text-gray-300 font-semibold mb-4 hover:text-white transition-colors">
                  🔧 Technical Details (Click to expand)
                </summary>

                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-red-400 font-semibold mb-2">
                        Error Type
                      </h4>
                      <p className="text-gray-300 font-mono">
                        {errorDetails.name}
                      </p>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-yellow-400 font-semibold mb-2">
                        Timestamp
                      </h4>
                      <p className="text-gray-300 font-mono">
                        {new Date(errorDetails.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {errorDetails.stack && (
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-blue-400 font-semibold mb-2">
                        Stack Trace
                      </h4>
                      <pre className="text-gray-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                        {errorDetails.stack}
                      </pre>
                    </div>
                  )}

                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">
                      Browser Info
                    </h4>
                    <p className="text-gray-300 font-mono text-xs">
                      {navigator.userAgent}
                    </p>
                  </div>
                </div>
              </details>
            </div>

            {/* Additional Help */}
            <div
              className={`transform transition-all duration-1000 delay-900 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-r from-gray-800/40 to-gray-700/40 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-3">
                  <FaShieldAlt className="text-blue-400" />
                  Need Help?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-2">
                      For Users:
                    </h4>
                    <ul className="space-y-1 text-gray-400">
                      <li>• Try refreshing the page</li>
                      <li>• Clear browser cache</li>
                      <li>• Check your internet connection</li>
                      <li>• Contact support if issue persists</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-300 mb-2">
                      For Developers:
                    </h4>
                    <ul className="space-y-1 text-gray-400">
                      <li>• Check console logs</li>
                      <li>• Review error tracking service</li>
                      <li>• Verify server status</li>
                      <li>• Check recent deployments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Grid */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-[0.02]">
              <svg width="100%" height="100%" className="animate-pulse">
                <defs>
                  <pattern
                    id="error-grid"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#error-grid)" />
              </svg>
            </div>
          </div>

          {/* Floating Error Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-red-400/20 animate-pulse"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 20}%`,
                  fontSize: `${16 + i * 2}px`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${4 + i * 0.3}s`,
                }}
              >
                <FaExclamationTriangle />
              </div>
            ))}
          </div>

          {/* Custom CSS Animations */}
          <style jsx>{`
            @keyframes errorFloat {
              0%,
              100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.2;
              }
              25% {
                transform: translateY(-15px) rotate(5deg);
                opacity: 0.4;
              }
              50% {
                transform: translateY(-30px) rotate(0deg);
                opacity: 0.6;
              }
              75% {
                transform: translateY(-15px) rotate(-5deg);
                opacity: 0.4;
              }
            }

            .animate-error-float {
              animation: errorFloat 4s ease-in-out infinite;
            }

            @keyframes glitch {
              0%,
              100% {
                text-shadow: 0 0 5px rgba(239, 68, 68, 0.5);
              }
              25% {
                text-shadow: -2px 0 5px rgba(239, 68, 68, 0.8),
                  2px 0 5px rgba(59, 130, 246, 0.8);
              }
              50% {
                text-shadow: 0 -2px 5px rgba(239, 68, 68, 0.8),
                  0 2px 5px rgba(59, 130, 246, 0.8);
              }
              75% {
                text-shadow: 2px 0 5px rgba(239, 68, 68, 0.8),
                  -2px 0 5px rgba(59, 130, 246, 0.8);
              }
            }

            .animate-glitch {
              animation: glitch 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      </body>
    </html>
  );
}
