"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface NavigationWrapperProps {
    href: string;               // target URL
    children: React.ReactNode;  // any content inside (button, card, etc.)
}

export default function NavigationWrapper({ href, children }: NavigationWrapperProps) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
            {children}
        </div>
    );
}
