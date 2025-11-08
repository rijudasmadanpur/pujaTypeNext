"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/app/animationJson/Security.json";


const SecurityAnimation = () => {
    return (
        <div style={{ width: 300, height: 300 }}>
            <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
            />
        </div>
    );
};

export default SecurityAnimation;
