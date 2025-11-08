"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { loginServerAction } from "./loginServerAction";
import { signIn } from "next-auth/react"; // ✅ Import NextAuth signIn
import PhoneInput from "react-phone-input-2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import GoogleLoginButton from "./GoogleLoginButton(";









interface LoginFormProps {
  switchToSignup: () => void;
  setOpen: (open: boolean) => void;
}

export default function LoginForm({ switchToSignup, setOpen }: LoginFormProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { user, login, logout } = useAuth();

  useEffect(() => {
    const userId = Cookies.get("userId");

    if (userId) {
      // Fetch full user data from backend using userId
      fetch(`/api/user/${userId}`)
        .then(res => res.json())
        .then(userData => {
          login(userData);
        })
        .catch(() => {
          logout(); // Clear context & cookie if error
        });
    }
  }, []);







  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.set("Phone", phone);
    formData.set("Password", password);

    try {
      const result = await loginServerAction(formData);
      console.log("Login result:", result);

      if (!result.success) {
        setErrors(result.errors);
      } else {
        // Store full user in context
        login(result.user);

        // Store only userId in cookie (expires 7 days if rememberMe is checked)
        Cookies.set("userId", result.user.UsersID, {
          expires: rememberMe ? 7 : 1,
          path: "/",
        });
        Cookies.set("userType", result.user.UserType, {
          expires: rememberMe ? 7 : 1,
          path: "/",
        });

        if (!result.user.Profile) {
          result.user.UserType == 1 && router.push("/secondRegistration");
          result.user.UserType == 2 && router.push("/secondRegistrationDevotee");

        } else {
          result.user.UserType == 1 && router.push("/profile/pandit/dashboard");
          result.user.UserType == 2 && router.push("/profile/devotee/dashboard");
        }

        setOpen(false);
      }
    } catch (err) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }

  };


  return (
    <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col sm:flex-row min-h-[600px]">
      {/* Left Image Section */}
      <div className="flex-1 p-8 flex items-center justify-center relative">
        <Image
          src="/img/loginsignUp/pandit.png"
          alt="Login Illustration"
          width={400}
          height={400}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Right Login Form Section */}
      <div className="flex-1 bg-white bg-opacity-80 backdrop-blur-sm p-8 flex flex-col justify-center border-l border-orange-200">
        <div className="max-w-md mx-auto w-full">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Hello</h1>
            <p className="text-gray-600">
              Welcome to{" "}
              <span className="text-orange-500 font-semibold">
                PanditJi4You
              </span>
            </p>
          </div>

          <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">
            LOGIN
          </h2>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* <div>
              <Input
                placeholder="Email or Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-4 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors text-gray-700 placeholder-gray-400"
              />
              {errors.Phone && (
                <p className="text-red-500 text-sm mt-1">{errors.Phone}</p>
              )}
            </div> */}
            <div>
              <PhoneInput
                country={"in"}
                enableSearch={true}
                value={phone}
                onChange={(value) => setPhone(value)}
                inputProps={{
                  name: "Phone",
                }}
                inputStyle={{
                  height: "40px",
                  width: "100%",
                  color: "black",
                  padding: ".5rem 0 .5rem 3rem",
                }}
              />
              <input type="hidden" name="Phone" value={phone} />
              {/* {formState.errors.Phone && (
                <div className="text-red-500 text-xs mt-0.5">
                  {formState.errors.Phone}
                </div>
              )} */}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors text-gray-700 placeholder-gray-400"
              />
              {errors.Password && (
                <p className="text-red-500 text-sm mt-1">{errors.Password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 text-orange-500 border-orange-300 rounded focus:ring-orange-400"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                Forget your password?
              </button>
            </div>

            {errors.general && (
              <p className="text-red-500 text-center text-sm">
                {errors.general}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
            >
              {loading ? "Logging in..." : "LOG IN"}
            </button>
          </form>

          {/* Google Login Button */}
          <div className="mt-6">
            {/* <button
              type="button"
              onClick={
                () => signIn("google", { callbackUrl: "/after-login" }) // temporary page
              } // ✅ Trigger Google login
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button> */}
            <GoogleLoginButton />
          </div>

          {/* Signup Switch */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
                onClick={switchToSignup}
              >
                Sign Up
              </button>
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-500">
            🏢 Product by Prabhabi Infocom
          </div>
        </div>
      </div>
    </div>
  );
}
