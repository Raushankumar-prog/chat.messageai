"use client";

import { useState, useEffect, useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuth } from "@lib/googleAuth";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { login } from "../../graphql/queries/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { setLocalStorage,getLocalStorage,removeLocalStorage } from "@lib/storage";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, signInWithGoogle, logout } = useGoogleAuth();
  const router = useRouter();
  const [loginUser] = useMutation(login);

  const handleGoogleLogin = useCallback(async () => {
    try {
      const result = await signInWithGoogle();
       
      if (!result?.idToken) {
        return;
      }

      const { data } = await loginUser({
        variables: { email: result.user.email, googleId: result.user.uid },
      });

      if (!data?.loginUser?.token) {
        toast.error("Google login failed. 102");
        return;
      }

      setLocalStorage("token", data.loginUser.token);
      setLocalStorage("userId", data.loginUser.user.id);
    
      toast.success("Google login successful!");
      router.push("/");
    } catch (error) {
      removeLocalStorage("userId");
      removeLocalStorage("token");
      logout();
      console.error("Google Sign-in error:", error);
      let errorMessage = "Sign-in failed. 103";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  }, [signInWithGoogle, loginUser, router, logout]);

  
  useEffect(() => {
    if (user) handleGoogleLogin();
  }, [user, handleGoogleLogin]);

  useEffect(() => {
    if (getLocalStorage("token")) router.push("/");
  }, [router]);

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({ variables: { email, password } });

      if (data?.loginUser?.token) {
        setLocalStorage("token", data.loginUser.token);
        setLocalStorage("userId", data.loginUser.user.id);
        
        toast.success("Login successful!");
        router.push("/");
      } else {
        removeLocalStorage("userId");
        removeLocalStorage("token");
        logout();

        toast.error("Invalid credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed.");
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-blue-400">proxima</h1>
          <p className="text-sm text-gray-400 mt-2">Only login via email or Google</p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Email address"
            className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mt-4 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full mt-4 p-3 bg-gray-500 rounded hover:bg-blue-600"
          >
            Log in
          </button>
        </div>

        <div className="flex justify-between mt-3">
          <Link href="/forget_password" className="text-sm text-gray-400 hover:underline">
            Forgot password?
          </Link>
          <Link href="/sign_up" className="text-sm text-blue-400 hover:underline">
            Sign up
          </Link>
        </div>

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
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center p-3 bg-gray-700 rounded hover:bg-gray-600"
          >
            <FcGoogle className="text-xl mr-2" /> Log in with Google
          </button>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}