"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../graphql/queries/resetPassword";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

  const handleResetPassword = async () => {
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await resetPassword({ variables: { email, newPassword: password } });
      setSuccess(true);
      alert("Password reset successfully!");
      router.push("/sign_in");
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-blue-600">proxima</h1>
      <h2 className="mt-4 text-xl font-semibold text-center">Set New Password</h2>
      <p className="mt-2 text-center text-gray-400">Enter a new password for your account.</p>

      <div className="mt-6">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

        <button
          onClick={handleResetPassword}
          disabled={loading || success}
          className="w-full py-2 mt-6 text-white bg-gray-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
        >
          {loading ? "Resetting..." : success ? "Password Reset ✅" : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
