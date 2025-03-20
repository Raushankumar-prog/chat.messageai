"use client";

import { getLocalStorage, removeLocalStorage } from "@lib/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = getLocalStorage("token");
    const userId = getLocalStorage("userId");

    // Check for invalid authentication state
    if (token && !userId) {
      // Clear all authentication-related storage
      removeLocalStorage("token");
      removeLocalStorage("userId");
      router.replace("/sign_up");
      return;
    }

    // Check normal authentication
    if (!token) {
      router.replace("/sign_up");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="bg-gray-900 text-gray-300 min-h-screen flex flex-col justify-center items-center">
        <p className="text-xl font-semibold">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
        Hello, User
      </h1>
    </div>
  );
}