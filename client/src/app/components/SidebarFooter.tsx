"use client";

import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/user";
import Image from "next/image";
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface SidebarFooterProps {
  isSidebarOpen: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isSidebarOpen }) => {
  const [mounted, setMounted] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    setUserId(Cookies.get("userId"));
  }, []);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId },
    skip: !userId,
  });

  if (!mounted) {
    // Return server-side compatible fallback
    return (
      <div className="border-t border-gray-700 pt-4">
        <div className="mt-6 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-500 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-700 pt-4">
      {/* User Profile Section */}
      <div className="mt-6 flex items-center space-x-3">
        <div className="relative w-8 h-8">
          <Link href="/editprofile">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-500 animate-pulse" />
            ) : error ? (
              <div className="w-8 h-8 rounded-full bg-red-500" />
            ) : (
              <Image
                src={data?.user?.avatar || "/default-avatar.png"}
                alt={data?.user?.name || "User Avatar"}
                width={32}
                height={32}
                className="rounded-full object-cover"
                key={data?.user?.avatar} 
              />
            )}
          </Link>
        </div>

        {isSidebarOpen && !loading && !error && (
          <Link href="/editprofile">
            <span className="text-sm hover:text-gray-300 transition-colors">
              {data?.user?.name}
            </span>
          </Link>
        )}
      </div>

      {/* Account Settings */}
      <ul className={`${isSidebarOpen ? "space-y-4" : "space-y-2"} mt-4`}>
        <li className="flex items-center">
          <Link
            href="/account"
            className="flex items-center text-sm hover:text-gray-300 transition-colors"
          >
            <IoSettingsSharp className="text-xl mr-6 mt-2 text-gray-400" />
            {isSidebarOpen && <span>Account</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarFooter;