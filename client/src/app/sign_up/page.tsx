"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Sign-up successful!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
        <h2 className="text-center text-3xl font-semibold text-blue-500">deepseek</h2>
        <p className="mb-4 text-center text-gray-300">
          One DeepSeek account is all you need to access all services.
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
            required
          />

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="# Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              Send code
            </button>
          </div>

          <label className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="h-4 w-4"
            />
            <span>I confirm the Terms of Use & Privacy Policy</span>
          </label>

          <button
            type="submit"
            className={`w-full rounded-md px-4 py-2 font-semibold text-white transition ${
              isChecked ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!isChecked}
          >
            Sign up
          </button>

          <div className="mt-2 text-center text-sm text-gray-400">
            <a href="#" className="text-blue-400 hover:underline">Forgot password?</a> |
            <a href="/sign_in" className="text-blue-400 hover:underline"> Log in</a>
          </div>
        </form>
         <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-600"></div>
                  <p className="px-3 text-gray-400">OR</p>
                  <div className="flex-1 border-t border-gray-600"></div>
                </div>
                <button className="w-full flex items-center justify-center p-3 bg-gray-700 rounded hover:bg-gray-600">
                  <FcGoogle className="text-xl mr-2" /> Signup  with Google
                </button>
      </div>
    </div>
  );
}
