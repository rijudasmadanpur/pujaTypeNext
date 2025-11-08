"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import "react-phone-input-2/lib/style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormState, useFormStatus } from "react-dom";
import registerSubmitServerAction from "./registerSubmitServerAction"; // <-- import server action

// Validation schema


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-60"
    >
      {pending ? "Submitting..." : "SIGN UP"}
    </button>
  );
}

export default function SignUpForm({ switchToLogin }) {
  const registrationTypes = [
    "Pandit",
    "Devotee",
    "Vendor",
    "Puja Trainer",
    "Puja Trainee",
  ];
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [formState, formAction] = useFormState(registerSubmitServerAction, {
    errors: {},
    success: false,
    successMsg: "",
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col sm:flex-row min-h-[600px]">
      {/* Left Side - Illustration */}
      <div className="flex-1 p-8 flex items-center justify-center relative">
        <Image
          src={"/img/loginsignUp/pandit.png"}
          alt="Login Illustration"
          width={400}
          height={400}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-white bg-opacity-80 backdrop-blur-sm p-8 flex flex-col justify-center border-l border-orange-200 overflow-auto max-h-[90vh]">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">
            SIGNUP
          </h2>

          {formState.successMsg && (
            <p className="mb-1 text-green-600 text-center text-sm font-medium">
              {formState.successMsg}
            </p>
          )}

          {formState.errors.general && (
            <p className="mb-1 text-red-600 text-center text-sm font-medium">
              {formState.errors.general}
            </p>
          )}

          <form action={formAction} autoComplete="off">
            <div className="space-y-3">
              {/* Replace shadcn select with native select */}
              <div className="flex justify-between items-center">
                <p className="text-black">User Type:</p>
                <div className="flex flex-col justify-between ">
                  <select
                    key={formState?.data?.UserType || "empty"}
                    name="UserType"
                    className="w-[180px] h-[40px] px-2 py-1 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors text-gray-700"
                    defaultValue={String(formState?.data?.UserType || "")} // force string match
                  >
                    <option value="" disabled>
                      Select User Type
                    </option>
                    {registrationTypes.map((type, index) => (
                      <option key={index} value={String(index + 1)}>
                        {type}
                      </option>
                    ))}
                  </select>

                  {formState.errors.UserType && (
                    <div className="text-red-500 text-xs mt-0.5 ml-3">
                      {formState.errors.UserType}
                    </div>
                  )}
                </div>
              </div>

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
                {formState.errors.Phone && (
                  <div className="text-red-500 text-xs mt-0.5">
                    {formState.errors.Phone}
                  </div>
                )}
              </div>
              <div>
                <Input
                  name="Email"
                  placeholder="Email"
                  autoComplete="new-email"
                  className="w-full px-4 text-black"
                  style={{ height: "40px" }}
                  defaultValue={formState?.data?.Email || ""}
                />
                {formState.errors.Email && (
                  <div className="text-red-500 text-xs mt-0.5">
                    {formState.errors.Email}
                  </div>
                )}
              </div>
              <div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="Password"
                    placeholder="Password"
                    defaultValue={formState?.data?.Password || ""}
                    autoComplete="new-password"
                    className="w-full px-4 pr-10 text-black"
                    style={{ height: "40px" }}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formState.errors.Password && (
                  <div className="text-red-500 text-xs mt-0.5">
                    {formState.errors.Password}
                  </div>
                )}
              </div>
              <div>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="ConfirmPassword"
                    placeholder="Confirm Password"
                    defaultValue={formState?.data?.ConfirmPassword || ""}
                    autoComplete="new-password"
                    className="w-full px-4 pr-10 text-black"
                    style={{ height: "40px" }}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formState.errors.ConfirmPassword && (
                  <div className="text-red-500 text-xs mt-0.5">
                    {formState.errors.ConfirmPassword}
                  </div>
                )}
              </div>

              <SubmitButton />
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
                onClick={switchToLogin}
              >
                Log In
              </button>
            </p>
          </div>
          {/* <div className="text-center mt-8 text-xs text-gray-500">
            🏢 Product by Prabhabi Infocom
          </div> */}
        </div>
      </div>
    </div>
  );
}
