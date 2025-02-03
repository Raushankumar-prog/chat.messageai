"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-blue-400">deepseek</h1>
          <p className="text-sm text-gray-400 mt-2">
            Only login via email or  Google
          </p>
        </div>
        <div>
          <input
            type="text"
            placeholder="email address"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mt-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-4 flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm text-gray-400">
              I confirm that I have read, consent and agree to
              <span className="text-blue-400 cursor-pointer"> Terms of Use </span>and
              <span className="text-blue-400 cursor-pointer"> Privacy Policy</span>.
            </label>
          </div>
          <button className="w-full mt-4 p-3 bg-blue-500 rounded text-white font-semibold hover:bg-blue-600">
            Log in
          </button>
          <div className="mt-3 text-center text-sm">
            <a href="#" className="text-blue-400">Forgot password?</a> &nbsp;|&nbsp;
            <a href="#" className="text-blue-400">Sign up</a>
          </div>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-600"></div>
          <p className="px-3 text-gray-400">OR</p>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>
        <button className="w-full flex items-center justify-center p-3 bg-gray-700 rounded hover:bg-gray-600">
          <FcGoogle className="text-xl mr-2" /> Log in with Google
        </button>
      </div>
    </div>
  );
}
