"use client"
import React, { FC } from "react";
import HeroCarousel from "./component/HeroCarousel";
import Lottie from "lottie-react";
import happy from "@/app/animationJson/Happy.json";

const HeroSection: FC = () => {
  return (
    <div className="w-screen h-[130vh] bg-orange-300 px-5 pt-18 lg:px-30 xl:px-40 2xl:px-40">

      <div
        style={{
          height: "50%",
          width: "100%",
          background: "white",
          borderTopRightRadius: "180px",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
        }}
      >
        {/* <div style={{ position: "absolute", top: "5%", left: "25%", width: 800, height: 200 }}>
          <Lottie
            animationData={happy}
            loop={true}
            autoplay={true}
          />
        </div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {/* Search bar with button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              maxWidth: "400px",
              marginBottom: "2rem",
            }}
          >
            <input
              type="text"
              placeholder="Search for puja, pandit, city..."
              style={{
                flex: 1,
                padding: "0.75rem 1.5rem",
                borderRadius: "2rem 0 0 2rem",
                border: "1px solid #ddd",
                fontSize: "1.1rem",
                outline: "none",
                boxShadow: "0 2px 8px #0001",
                borderRight: "none",
              }}
            />
            <button
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "0 2rem 2rem 0",
                border: "1px solid #ddd",
                borderLeft: "none",
                background: "#f97316",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                height: "100%",
              }}
            >
              Search
            </button>
          </div>
          <h1
            style={{
              color: "#333",
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
            className="text-center"
          >
            Book your puja with trusted pandits. Experience
          </h1>
          <p
            style={{
              color: "#333",
              fontSize: "1.2rem",
              marginBottom: "0.5rem",
              padding: "0 2rem",
              textAlign: "center",
            }}
          >
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          </p>
        </div>
      </div>
      <div style={{ position: "relative", height: "50%", width: "100%" }}>
        <div
          style={{
            background: "white",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            borderBottomLeftRadius: "180px",
          }}
        ></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <HeroCarousel />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
