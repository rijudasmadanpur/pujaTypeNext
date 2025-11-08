// "use client";

// import React from "react";
// // import Page from "./page";
// import { useLocation } from "@/app/context/LocationContext";

// interface WrapperProps {
//     ID: string;
// }

// export default function LocationClientWrapper({ ID }: WrapperProps) {
//     const { location } = useLocation();

//     if (!location.countryCode || !location.stateCode || !location.cityCode) {
//         return <div>Loading location...</div>;
//     }

//     return <Page ID={ID} location={location} />;
// }
