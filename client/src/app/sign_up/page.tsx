"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { CREATE_USER } from "../../graphql/queries/signup";
import { useGoogleAuth } from "@lib/googleAuth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const { user, signInWithGoogle, logout } = useGoogleAuth();

  useEffect(() => {
    if (user) {
      handleGoogleSignUp();
    }
  }, [user]);



  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { data } = await createUser({
        variables: {
          email,
          name: email.split("@")[0],
          password,
          googleId: null,
          avatar: "",
        },
      });

      console.log("Sign-up successful:", data);
      alert("Sign-up successful!");
      router.push("/");
    } catch (err) {
      console.error("Sign-up error:", err);
      alert(`Sign-up failed: ${err.message}`);
    }
  };





  

  const handleGoogleSignUp = async () => {
    if (!user) return;

    try {
      const { data } = await createUser({
        variables: {
          email: user.email,
          name: user.displayName || user.email.split("@")[0],
          password: null,
          googleId: user.uid,
          avatar: user.photoURL || "",
        },
      });

      console.log("Google Sign-up successful:", data);
      router.push("/");
    } catch (err) {
      console.error("Google Sign-up error:", err);
      alert(`Sign-up failed: ${err.message}`);
    }
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
            disabled={!isChecked || loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

          {error && <p className="text-center text-red-500 mt-2">Error: {error.message}</p>}
        </form>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-600"></div>
          <p className="px-3 text-gray-400">OR</p>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {user ? (
          <button
            onClick={logout}
            className="w-full flex items-center justify-center p-3 bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center p-3 bg-gray-700 rounded hover:bg-gray-600"
          >
            <FcGoogle className="text-xl mr-2" /> Signup with Google
          </button>
        )}
      </div>
    </div>
  );
}