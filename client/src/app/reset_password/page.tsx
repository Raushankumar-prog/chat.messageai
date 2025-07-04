"use client";

import { Suspense, useState } from "react";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../graphql/queries/resetPassword";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

  const handleResetPassword = async () => {
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await resetPassword({ variables: { email, newPassword: password } });
      setSuccess(true);
      toast.success("Password reset successfully! Redirecting...");
      setTimeout(() => router.push("/sign_in"), 2000);
    } catch {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-blue-600">AllModelHub</h1>
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}