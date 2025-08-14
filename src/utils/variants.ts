// import { Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const fadeIn = (direction: "up" | "down" | "left" | "right", delay = 0) => {
  const distance = 50; // Adjust distance for the animation
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x:
        direction === "left" ? distance : direction === "right" ? -distance : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8, // Smooth animation duration
        ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier easing
        delay, // Delay for animation
      },
    },
  };
  return variants;
};

export default fadeIn;

// Custom hook for authentication
export const useAuthRedirect = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/"); // Redirect to home if not authenticated
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return isAuthenticated;
};
