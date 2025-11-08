"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginSignUpWrapper from "./component/LoginSignUpWrapper";

// Define props type
interface LoginSignupDialogProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function LoginSignupDialog(props: LoginSignupDialogProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const open = typeof props.open === "boolean" ? props.open : internalOpen;
  const setOpen =
    typeof props.setOpen === "function" ? props.setOpen : setInternalOpen;

  const [view, setView] = useState<"login" | "signup">("login");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          onClick={() => {
            setOpen(true);
            setView("login");
          }}
          className="px-6 py-2 rounded-md text-base font-semibold text-white"
        >
          Login/Sign Up
        </Button>
      </DialogTrigger>

      <DialogContent className=" min-w-4xl min-h-[600px] max-h-screen flex flex-col justify-center items-center">
        <LoginSignUpWrapper
          view={view}
          switchToLogin={() => setView("login")}
          switchToSignup={() => setView("signup")}
          setOpen={setOpen}
        />
        <DialogFooter>{/* Optional footer */}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
