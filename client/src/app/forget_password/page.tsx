"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { SEND_RESET_CODE } from "../../graphql/queries/sendResetcode";
import { VERIFY_RESET_CODE } from "../../graphql/queries/verifyResetcode";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [sentCode, setSentCode] = useState(false);
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  const [sendResetCode, { loading: sending }] = useMutation(SEND_RESET_CODE);
  const [verifyResetCode, { loading: verifying }] = useMutation(VERIFY_RESET_CODE);

  const handleSendCode = async () => {
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");

    try {
      await sendResetCode({ variables: { email } });
      setSentCode(true);
      toast.success("Verification code sent to your email");
    } catch (error) {
      toast.error("Error sending code");
    }
  };

  const handleVerifyCode = async () => {
    if (!code) {
      setCodeError("Please enter the verification code");
      return;
    }
    setCodeError("");

    try {
      const { data } = await verifyResetCode({ variables: { email, code } });

      if (data?.verifyResetCode) {
        setVerified(true);
        toast.success("Code verified successfully!");
      } else {
        setCodeError("Invalid verification code");
        toast.error("Invalid verification code");
      }
    } catch (error) {
      setCodeError("Error verifying code");
      toast.error("Error verifying code");
    }
  };

  const handleContinue = () => {
    if (verified) {
      router.push(`/reset_password?email=${email}`);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
      <ToastContainer /> {/* Toast Container */}
      <h1 className="text-3xl font-bold text-center text-blue-600">proxima</h1>
      <h2 className="mt-4 text-xl font-semibold text-center">Reset password</h2>
      <p className="mt-2 text-center text-gray-400">
        Enter your email address and we will send you a verification code to reset your password.
      </p>

      <div className="mt-6">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={sentCode}
        />
        {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}

        <button
          onClick={handleSendCode}
          disabled={sending || sentCode}
          className="w-full py-2 mt-4 text-white bg-gray-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
        >
          {sending ? "Sending..." : sentCode ? "Code Sent" : "Send Code"}
        </button>

        <div className="flex items-center mt-4 space-x-2">
          <input
            type="text"
            placeholder="# Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!sentCode || verified}
          />
          <button
            onClick={handleVerifyCode}
            disabled={verifying || verified}
            className="px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 disabled:bg-gray-500"
          >
            {verifying ? "Verifying..." : verified ? "Verified ✅" : "Verify Code"}
          </button>
        </div>
        {codeError && <p className="mt-1 text-sm text-red-500">{codeError}</p>}

        <button
          onClick={handleContinue}
          className="w-full py-2 mt-6 text-white bg-gray-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
          disabled={!verified}
        >
          Continue
        </button>

        <p className="mt-4 text-center">
          <Link href="/sign_in" className="text-blue-700 hover:underline">Back to log in</Link>
        </p>
      </div>
    </div>
  );
}
