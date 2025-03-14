"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
 // const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = Cookies.get("token");

    if (!storedName) {
      router.replace("/sign_up"); 
    } else {
     // setName(storedName);
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
        Hello, Raushan
      </h1>
    </div>
  );
}
