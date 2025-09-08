"use client";

import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const localToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (!localToken) {
      setIsAuthenticated(false);
      router.replace("/login");
    } else setIsAuthenticated(true);
  }, [router, pathname]);

  if (!isMounted || isAuthenticated === null) {
    return <Loading />;
  }

  return <>{isAuthenticated ? children : <Loading />}</>;
};
export default AuthGuard;
