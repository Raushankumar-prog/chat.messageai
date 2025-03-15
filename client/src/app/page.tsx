"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = Cookies.get("token");
    const userId = Cookies.get("userId");

    // Check for invalid cookie state
    if (token && !userId) {
      // Clear all cookies
      const cookies = document.cookie.split(";");
      cookies.forEach(cookie => {
        const [name] = cookie.trim().split("=");
        if (name) {
          Cookies.remove(name, {
            path: "/",
            domain: window.location.hostname,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
          });
        }
      });
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