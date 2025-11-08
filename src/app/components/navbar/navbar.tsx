"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
} from "lucide-react";
import LocationSelector from "./component/location/LocationSelector";
import LoginSignupDialog from "../loginSignup/LoginSignupdialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showSticky, setShowSticky] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  console.log("usersss", user);

  // Sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // console.log("Navbar user:", user);


  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 z-40 h-16 transition-colors duration-300 ${showSticky ? "bg-white text-black shadow-md" : "bg-transparent text-black"
          }`}
      >
        {/* Logo */}
        <div
          className="font-bold text-xl tracking-tight flex items-center h-16 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Sparkles className="mr-2 text-black" size={35} />
          <span className="text-black text-2xl">Pandit4You</span>
        </div>

        {/* Right side: Location + Auth buttons */}
        <div className="flex items-center gap-4">
          <LocationSelector />

          {/* If user is logged in, show Logout button */}
          {user ? (
            // <Button
            //   variant="outline" className="text-black bg-orange-300 hover:bg-orange-400"
            //   onClick={() => {
            //     logout();
            //     router.push("/"); // optional: redirect after logout
            //   }}
            // >
            //   Logout
            // </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <Avatar className="w-10 h-10 cursor-pointer">
                    <AvatarImage src={user?.Profile?.Picture ? `${process.env.NEXT_PUBLIC_API_URL2}/${user?.Profile.Picture}` : "/img/user/1.png"} />
                    <AvatarFallback>RD</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48 mt-2">
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/")}>🏠 Home</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(user.UserType == 1 ? "/profile/pandit/dashboard" : "/profile/devotee/dashboard")}>🏠 Dashboard</DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/settings")}>⚙️ Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    router.push("/")
                  }}
                  className="text-red-600 focus:text-red-700"
                >
                  🚪 Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {/* <Button
                variant="default"
                onClick={() => setLoginDialogOpen(true)}
              >
                Login / Signup
              </Button> */}
              <LoginSignupDialog
                open={loginDialogOpen}
                setOpen={setLoginDialogOpen}
              />
            </>
          )}
        </div>
      </nav >
    </>
  );
}
