"use client";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function LoginSignUpWrapper({
  view,
  switchToLogin,
  switchToSignup, setOpen

}) {
  if (view === "login") {
    return <LoginForm switchToSignup={switchToSignup} setOpen={setOpen} />;
  }
  return <SignUpForm switchToLogin={switchToLogin} setOpen={setOpen} />;
}
