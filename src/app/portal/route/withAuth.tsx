"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.FC) => {
  return function ProtectedComponent(props: any) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const user = localStorage.getItem("activeUser");
      if (!user) {
        router.push("/");
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    if (!isAuthenticated) {
      return <p className="text-center text-white">Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
