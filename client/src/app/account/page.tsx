"use client";

import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/user";
import Image from "next/image";
import { IoWalletSharp, IoCardSharp, IoPersonSharp } from "react-icons/io5";
import Link from "next/link";
import Cookies from "js-cookie";



const AccountPage = () => {
  
  const userId = Cookies.get("userId");
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white px-6">
      <div className="w-full max-w-lg p-10 bg-gray-800 rounded-2xl shadow-2xl transition-transform transform hover:scale-105">
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-xl">Error loading user</p>
        ) : (
          <>
            {/* Profile Section */}
            <div className="text-center mb-10">
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-600">
                <Image
                  src={data?.user?.avatar || "/default-avatar.png"}
                  alt={data?.user?.name || "User Avatar"}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-3xl font-semibold mt-5">{data?.user?.name}</h2>
              <p className="text-lg text-gray-400">{data?.user?.email}</p>
            </div>

            {/* User Account Details */}
            <div className="space-y-8">
              {/* Token Balance */}
              <div className="flex items-center justify-between p-5 bg-gray-700 rounded-xl shadow-md hover:bg-gray-600 transition">
                <div className="flex items-center gap-2">
                  <IoWalletSharp className="text-2xl text-yellow-400" />
                  <span className="text-lg font-medium">Token Balance</span>
                </div>
                <span className="font-semibold text-base px-2 py-1 bg-gray-600 rounded-md">
                  500k Tokens
                </span>
              </div>

              {/* Payment Option */}
              <Link href="/payment">
                <div className="flex items-center justify-between p-5 bg-gray-700 rounded-xl shadow-md cursor-pointer hover:bg-gray-600 transition">
                  <div className="flex items-center space-x-4">
                    <IoCardSharp className="text-3xl text-blue-400" />
                    <span className="text-lg font-medium">Payment</span>
                  </div>
                  <span className="text-gray-400 text-base">Manage payments</span>
                </div>
              </Link>

              {/* Account Settings */}
              <Link href="/settings">
                <div className="flex items-center justify-between p-5 bg-gray-700 rounded-xl shadow-md cursor-pointer hover:bg-gray-600 transition">
                  <div className="flex items-center space-x-4">
                    <IoPersonSharp className="text-3xl text-green-400" />
                    <span className="text-lg font-medium">Account Settings</span>
                  </div>
                  <span className="text-gray-400 text-base">Update profile</span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
