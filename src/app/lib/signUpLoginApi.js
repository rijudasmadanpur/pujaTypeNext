import * as Yup from "yup";

export async function SignUpPost(userData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    console.log("Raw Response Status:", res.status); // 👈 log status
    const text = await res.text(); // 👈 read raw text
    console.log("Raw Response Text:", text); // 👈 log raw body

    // if (!res.ok) {
    //   throw new Error(`Failed to signup: ${res.statusText}`);
    // }

    return JSON.parse(text); // 👈 try parsing as JSON
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

export const validationSchema = Yup.object().shape({
  UserType: Yup.string().required("User type is required"),
  Email: Yup.string().email("Invalid email").required("Email is required"),
  Password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  Phone: Yup.string()
    .min(6, "Please provide a valid phone number")
    .required("Phone number is required"),
});

export function prepareUserData(formData, countryCode) {
  const rawPhone = formData.get("Phone") || "";

  const data = {
    UserType: formData.get("UserType") || "",
    Email: formData.get("Email") || "",
    Password: formData.get("Password") || "",
    ConfirmPassword: formData.get("ConfirmPassword") || "",
    Phone: rawPhone,
    countryCode: countryCode,
  };

  return data;
}
