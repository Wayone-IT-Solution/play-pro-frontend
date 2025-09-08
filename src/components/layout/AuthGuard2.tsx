"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthGuard2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, [router, pathname]);

  return <>{isMounted ? children : null}</>;
};
export default AuthGuard2;
