
"use client";

import { Cookie } from "next/font/google";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import Cookies from "js-cookie";
import { cookies } from "next/headers";


interface User {
    UsersID: number;
    Phone: string;
    Email: string;
    // Add other minimal types if needed
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // ✅ Load user from server (using secure cookie/session) on initial mount
    const fetchUser = async () => {
        const userId = Cookies.get("userId");
        const userType: number = parseInt(Cookies.get("userType") as string, 1);
        console.log("Fetching user with ID:", userId);
        const url = userType == 1 ? `${process.env.NEXT_PUBLIC_API_URL2}/panditData?UsersID=${userId}` : `${process.env.NEXT_PUBLIC_API_URL2}/devotee?UsersID=${userId}`;

        try {
            if (userId) {
                const res = await fetch(url, {
                    method: "GET",
                    // credentials: "include",
                });

                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData.user);
                } else {
                    setUser(null);
                }
            }
        }
        catch (error) {
            console.error("Failed to fetch user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        fetchUser();
    }, []);



    // ✅ On login, update in-memory state only
    const login = (userData: User) => {
        console.log("Logging in user:", userData);
        setUser(userData);
    };

    // ✅ On logout, clear session on server + reset client state
    const logout = async () => {
        try {
            await fetch("/api/logout", {
                method: "POST",

                credentials: "include",
            });
            Cookies.remove("userId");
            Cookies.remove("userType");
        } catch (err) {
            console.error("Logout failed", err);
        }

        setUser(null);
    };
    const refreshUser = async () => {
        await fetchUser(); // 👈 re-fetch latest user data
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
