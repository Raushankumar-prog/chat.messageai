"use client";

import Link from "next/link";
import { useState } from "react";
import { IoLockClosedSharp, IoNotificationsSharp, IoPersonSharp, IoLogOut } from "react-icons/io5";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white px-6">
      <div className="w-full max-w-lg p-10 bg-gray-800 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-semibold mb-6 text-center">Settings</h2>

       
        <div className="flex flex-col gap-4">
          {/* Edit Profile */}
          <Link href="/editprofile">
            <div className="p-5 bg-gray-700 rounded-lg flex items-center justify-between shadow-md cursor-pointer hover:bg-gray-600 transition">
              <div className="flex items-center space-x-4">
                <IoPersonSharp className="text-3xl text-blue-400" />
                <span className="text-lg font-medium">Edit Profile</span>
              </div>
              <span className="text-sm text-gray-300 underline hover:text-white">Edit</span>
            </div>
          </Link>

          {/* Change Password */}
          <Link href="/forget_password">
            <div className="p-5 bg-gray-700 rounded-lg flex items-center justify-between shadow-md cursor-pointer hover:bg-gray-600 transition">
              <div className="flex items-center space-x-4">
                <IoLockClosedSharp className="text-3xl text-yellow-400" />
                <span className="text-lg font-medium">Change Password</span>
              </div>
              <span className="text-sm text-gray-300 underline hover:text-white">Update</span>
            </div>
          </Link>

          {/* Notifications */}
          <div className="p-5 bg-gray-700 rounded-lg flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-4">
              <IoNotificationsSharp className="text-3xl text-green-400" />
              <span className="text-lg font-medium">Notifications</span>
            </div>
            <button
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                notifications ? "bg-green-500" : "bg-gray-500"
              }`}
              onClick={() => setNotifications(!notifications)}
            >
              {notifications ? "On" : "Off"}
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full mt-6 p-4 bg-red-600 hover:bg-red-500 text-lg font-semibold rounded-lg flex items-center justify-center space-x-2 shadow-md">
          <IoLogOut className="text-2xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
