
"use client";
import React, { useState, useRef } from "react";
import Stepper from "react-stepper-horizontal";
import FirstStep from "./firstStep/FirstStep";
import SecondStep from "./secondStep/SecondStep";
import ThirdStep from "./thirdStep/ThirdStep";
import { User, Building2, Sparkles } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

// Define proper TypeScript interfaces
// Corrected interface - match the property names used in your component
interface FormData {
  Languages: number[];        // Changed from 'Language' to 'Languages'
  Certification: number[];    // This matches your component
  Education: number[];        // Changed from string[] to number[] to match your usage
  Specialization: number[];   // Changed from string[] to number[] to match your usage
  CityName?: string;
  [key: string]: any;
}
interface UserCookie {
  userId?: string;
  [key: string]: any;
}

const steps = [
  { title: "Personal Details", icon: User },
  { title: "Details Information", icon: Building2 },
  { title: "Service details", icon: Sparkles },
];

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const formDataRef = useRef<FormData>({
    Languages: [],       // ✅ Change to plural
    Certification: [],
    Education: [],
    Specialization: [],
  });

  const formRefs = useRef<{ [key: string]: HTMLFormElement | null }>({});
  const { user, login, logout, loading } = useAuth();
  console.log("Authenticated User:", user);

  const nextStep = () => {
    const form = formRefs.current[activeStep];
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCookie: string = Cookies.get("userId") as string;
      // if (!userCookie) {
      //   throw new Error("User not authenticated");
      // }

      const user: UserCookie = JSON.parse(userCookie);
      console.log("User:", user);

      const finalData = {
        CityCode: formDataRef.current.CityName,
        UsersID: user.userId || user,
        Certifications: formDataRef.current.Certification,
        ...formDataRef.current
      };

      console.log("Final Form Data:", finalData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/panditData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Success Response:", data);

      if (data.NewPandit && data.NewPandit.UsersID) {
        Cookies.set("userId", JSON.stringify(data.NewPandit.UsersID), {
          expires: 1,
          path: "/"
        });
        login(data.NewPandit);
      }

      router.push("/profile/dashboard");
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="mb-6 text-2xl font-bold text-center">
        Complete your Profile in 3 steps
      </h1>

      <div className="bg-white p-6 rounded-lg shadow w-full max-w-2xl">
        <Stepper
          steps={steps.map((s) => ({ title: s.title }))}
          activeStep={activeStep}
          activeColor="#4f46e5"
          completeColor="#16a34a"
          defaultColor="#d1d5db"
          size={40}
          circleFontSize={16}
        />

        <form
          ref={(el) => {
            if (el) {
              formRefs.current[activeStep] = el;
            }
          }}
          className="mt-8 space-y-4"
          onSubmit={handleSubmit}
        >
          {activeStep === 0 && (
            <FirstStep formDataRef={formDataRef} />
          )}
          {activeStep === 1 && (
            <SecondStep formDataRef={formDataRef} />
          )}
          {activeStep === 2 && (
            <ThirdStep formDataRef={formDataRef} />
          )}

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
              Previous
            </button>

            {activeStep < steps.length - 1 && (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Next
              </button>
            )}

            {activeStep === steps.length - 1 && (
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}