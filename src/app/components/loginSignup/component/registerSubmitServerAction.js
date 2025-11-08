"use server";
import { SignUpPost } from "@/lib/signUpLoginApi";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  UserType: Yup.string().required("User type is required"),
  Email: Yup.string().email("Invalid email").required("Email is required"),
  Password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  Phone: Yup.mixed()
    .test(
      "valid-phone",
      "Please provide a valid phone number",
      function (value) {
        if (!value) return false;

        // If phone is array, prefer second element
        let phoneValue = Array.isArray(value) ? value[1] || value[0] : value;

        // Basic validation (10 digits minimum, numbers only)
        return /^[0-9]{10,15}$/.test(phoneValue.replace(/\D/g, ""));
      }
    )
    .required("Phone number is required"),
});
// ==============================================================================================
export default async function registerSubmitServerAction(prevState, formData) {
  console.log("Form Data:", formData);
  // const phone = "Phone: '+91 96569-85698'";

  // // Remove the "Phone: " part and split the number
  // const parts = phone.split(" ");

  // // Result
  // console.log(parts);
  // // ["Phone:", "'+91", "96569-85698'"]

  // console.log(parts[1]); // "'+91"
  // console.log(parts[2]); // "96569-85698'"

  // Parse phone
  const phoneValue = formData.get("Phone") || "";
  // Expecting format: "+91 98765-43210" or similar
  let CountryCode = "";
  let RawPhone = "";
  let formattedPhone = phoneValue;
  if (phoneValue) {
    const match = phoneValue.match(/^(\+\d+)[\s-]*(.*)$/);
    if (match) {
      CountryCode = match[1];
      RawPhone = match[2].replace(/\D/g, ""); // remove non-digits
    }
  }

  // Convert UserType to number
  const UserType = Number(formData.get("UserType")) || "";

  const data = {
    UserType,
    Phone: phoneValue.replace(/[+\-\s]/g, ''),
    CountryCode,
    RawPhone,
    Email: formData.get("Email") || "",
    Password: formData.get("Password") || "",
    ConfirmPassword: formData.get("ConfirmPassword") || "", // <-- add this line
  };
  try {
    await validationSchema.validate(
      {
        UserType: formData.get("UserType") || "",
        Email: formData.get("Email") || "",
        Password: formData.get("Password") || "",
        ConfirmPassword: formData.get("ConfirmPassword") || "",
        Phone: formData.get("Phone") || "",
      },
      { abortEarly: false }
    );

    // Simulate registration logic (replace with real registration)
    console.log("Registering user:", data);
    const res = await SignUpPost(data);
    console.log("API Response:", res);
    if (res && res.success === false && res.message) {
      return {
        success: false,
        errors: { general: res.message },
        successMsg: "",
        // data,
      };
    }
    return {
      success: true,
      errors: {},
      successMsg: "User registered successfully. Please login.",
      // data,
    };
  } catch (err) {
    console.log("dataaaaaaaa", data);
    const errorObj = {};
    if (err.inner) {
      err.inner.forEach((e) => {
        errorObj[e.path] = e.message;
      });
    }
    return { success: false, errors: errorObj, successMsg: "", data };
  }
}
