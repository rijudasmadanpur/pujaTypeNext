"use server";

import * as Yup from "yup";

interface LoginResult {
  success: boolean;
  errors: Record<string, string>;
  user?: any;
}

// Yup schema for validation
const loginValidationSchema = Yup.object().shape({
  Phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]{10,15}$/, "Please provide a valid phone number"),
  Password: Yup.string().required("Password is required"),
});

export async function loginServerAction(
  formData: FormData
): Promise<LoginResult> {
  const Phone = formData.get("Phone") || "";
  const Password = formData.get("Password")?.toString() || "";


  const data = { Phone, Password };
  console.log("Validation passed:", JSON.stringify({ login: Phone, password: Password }));

  try {
    // Validate fields with Yup
    await loginValidationSchema.validate(data, { abortEarly: false });

    // Call Laravel backend API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: Phone, password: Password }),
    });

    const apiData = await res.json();
    console.log("API Response:", apiData);

    if (!res.ok) {
      return {
        success: false,
        errors: { general: apiData.message || "Login failed" },
      };
    }

    return { success: true, errors: {}, user: apiData.user };
  } catch (err: any) {
    const errors: Record<string, string> = {};
    if (err.inner) {
      err.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });
    }
    return { success: false, errors };
  }
}
