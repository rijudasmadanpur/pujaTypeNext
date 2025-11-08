"use client";
import { useEffect, useCallback, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/app/context/AuthContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


declare global {
    interface Window {
        google: any;
    }
}

interface GoogleUserData {
    email: string;
    sub: string;
    name?: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
}

type UserType = 1 | 2; // 1 for Pandit, 2 for Devotee

export default function GoogleLoginButton() {
    const { login } = useAuth();
    const googleButtonRef = useRef<HTMLDivElement>(null);
    const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
    const [showUserTypeDialog, setShowUserTypeDialog] = useState(false);
    const [googleResponse, setGoogleResponse] = useState<any>(null);
    const [googleUserData, setGoogleUserData] = useState<GoogleUserData | null>(null);

    // ====================================================================================
    const handleGoogleResponse = useCallback((response: any) => {
        const idToken = response.credential;
        console.log("✅ Google ID Token received");

        // Decode the ID token to get user info
        const tokenPayload = JSON.parse(atob(idToken.split('.')[1]));
        const userData: GoogleUserData = tokenPayload;

        console.log("Google user data:", userData);

        // Store the response and user data for later use
        setGoogleResponse(response);
        setGoogleUserData(userData);

        // Show the user type selection dialog
        setShowUserTypeDialog(true);
    }, []);
    const router = useRouter();


    // =========================================================================================
    const handleUserTypeSelection = useCallback(async (userType: UserType) => {
        if (!googleResponse || !googleUserData) {
            console.error("No Google response data available");
            return;
        }

        const idToken = googleResponse.credential;

        try {
            // Prepare the request body with selected user type
            const requestBody = {
                token: idToken,
                UserType: userType,
                // Email: googleUserData.email,
                // Phone: "" // Leave empty since Google doesn't give phone
            };

            console.log("Sending to backend with user type:", requestBody);

            // Call your OAuth endpoint
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/oAuth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();
            console.log("Backend OAuth response:", data);
            Cookies.set("userId", data.user.ID || data.user.UsersID
                , {
                    expires: 2,
                    path: "/",
                });
            Cookies.set("userType", data.user.UserType, {
                expires: 2,
                path: "/",
            });
            console.log("data.user", data)

            if (res.ok && data.user) {
                // ✅ Login successful
                login(data.user);
                // Store only userId in cookie (expires 7 days if rememberMe is checked)

                console.log("✅ Google OAuth login successful");
                setShowUserTypeDialog(false);
                if (!data.user.Profile) {
                    data.user.UserType == 1 && router.push("/secondRegistration");
                    data.user.UserType == 2 && router.push("/secondRegistrationDevotee");

                } else {
                    data.user.UserType == 1 && router.push("/profile/pandit/dashboard");
                    data.user.UserType == 2 && router.push("/profile/devotee/dashboard");
                }

                // Optional: Redirect user after successful login
                // window.location.href = "/dashboard";
            } else {
                console.error("❌ Google OAuth login failed:", data.message || "Unknown error");
                alert("Google login failed: " + (data.message || "Please try again"));
            }
        } catch (err) {
            console.error("⚠️ Error during Google OAuth login:", err);
            alert("Network error during login. Please try again.");
        }
    }, [googleResponse, googleUserData, login]);

    // =========================================================================================
    const handleCustomButtonClick = () => {
        if (!window.google) {
            console.error("⚠️ Google SDK not loaded!");
            alert("Google sign-in is not available. Please refresh the page.");
            return;
        }

        try {
            // Directly trigger the Google One Tap prompt
            window.google.accounts.id.prompt();
        } catch (error) {
            console.error("Error triggering Google sign-in:", error);
        }
    };

    const closeDialog = () => {
        setShowUserTypeDialog(false);
        setGoogleResponse(null);
        setGoogleUserData(null);
    };

    // =========================================================================================
    useEffect(() => {
        if (typeof window === "undefined") return;

        const loadGoogleScript = () => {
            if (window.google) {
                initializeGoogle();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogle;
            script.onerror = () => {
                console.error("⚠️ Failed to load Google SDK");
                setIsGoogleLoaded(false);
            };
            document.head.appendChild(script);
        };

        const initializeGoogle = () => {
            if (!window.google) {
                console.error("⚠️ Google SDK failed to load");
                setIsGoogleLoaded(false);
                return;
            }

            try {
                window.google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                    callback: handleGoogleResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });

                console.log("✅ Google SDK initialized successfully");
                setIsGoogleLoaded(true);

                // Render the Google button immediately
                if (googleButtonRef.current) {
                    window.google.accounts.id.renderButton(
                        googleButtonRef.current,
                        {
                            theme: "outline",
                            size: "large",
                            width: 400,
                            text: "continue_with"
                        }
                    );
                }
            } catch (error) {
                console.error("❌ Error initializing Google SDK:", error);
                setIsGoogleLoaded(false);
            }
        };

        loadGoogleScript();

        return () => {
            // Cleanup if needed
        };
    }, [handleGoogleResponse]);

    return (
        <div className="w-full">
            {/* Custom Google Login Button */}
            {/* <button
                onClick={handleCustomButtonClick}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
                <FcGoogle className="text-xl" />
                Continue with Google
            </button> */}

            {/* Google's official button (hidden by default, shown as fallback) */}
            <div
                ref={googleButtonRef}
                className={`mt-4 ${isGoogleLoaded ? 'block' : 'hidden'}`}
            ></div>

            {/* User Type Selection Dialog */}
            {showUserTypeDialog && (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Select Your Role
                            </h3>
                            <p className="text-gray-600 mb-6">
                                How would you like to use our platform?
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleUserTypeSelection(1)}
                                    className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors duration-200"
                                >
                                    <div className="text-left">
                                        <div className="font-medium text-gray-900">Pandit</div>
                                        <div className="text-sm text-gray-500">I want to offer services</div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-600 hidden"></div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleUserTypeSelection(2)}
                                    className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-500 transition-colors duration-200"
                                >
                                    <div className="text-left">
                                        <div className="font-medium text-gray-900">Devotee</div>
                                        <div className="text-sm text-gray-500">I want to find services</div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-green-600 hidden"></div>
                                    </div>
                                </button>
                            </div>

                            <button
                                onClick={closeDialog}
                                className="mt-6 text-gray-500 hover:text-gray-700 text-sm font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}