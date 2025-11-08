"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LocationData {
    countryCode: string;
    stateCode: string;
    cityCode: string;
    countryName: string;
    stateName: string;
    cityName: string;
}

interface LocationContextType {
    location: LocationData;
    setLocation: (data: Partial<LocationData>) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocationState] = useState<LocationData>({
        countryCode: "",
        stateCode: "",
        cityCode: "",
        countryName: "",
        stateName: "",
        cityName: "",
    });

    const setLocation = (data: Partial<LocationData>) => {
        setLocationState((prev) => ({ ...prev, ...data }));
    };

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
};
