// app/(route)/after-login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AfterLoginPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.replace("/login");
          return;
        }

        // Verify token with your backend
        const response = await fetch("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();

          if (userData.statusCode === 1) {
            router.replace("/secondRegistration");
          } else if (userData.statusCode === 2) {
            router.replace("/profile");
          } else {
            router.replace("/");
          }
        } else {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  return loading ? <p>Redirecting...</p> : <p>Please wait...</p>;
}