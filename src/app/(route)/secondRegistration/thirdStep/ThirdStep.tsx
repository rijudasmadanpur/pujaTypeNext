"use client";

import React, { useEffect, useState } from "react";
import MultipleInput2 from "@/components/ui/MultipleInput2";
import { getAllPuja } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";

// Use the exact same interface as in MultipleInput2
interface FourFieldInput {
  PujaTypeMasterID: number | string;
  PersonalPrice: number | string;
  CommercialPrice: number | string;
  DurationHours: number | string;
}

interface ThirdStepProps {
  formDataRef: React.MutableRefObject<any>;
}

export default function ThirdStep({ formDataRef }: ThirdStepProps) {
  const [service, setService] = useState<FourFieldInput[]>([

  ]);

  const [allPuja, setAllPuja] = useState<{ value: string; label: string }[]>([]);

  // Handler function with the exact type
  const handleServiceChange = (newValue: FourFieldInput[]) => {
    setService(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pujas = await getAllPuja();
        console.log("Raw pujas:", pujas);

        // Transform to value/label with STRING values
        const formattedPujas = pujas.map(
          (puja: { ID: number; PujaName: string }) => ({
            value: puja.ID.toString(), // Convert number to string
            label: puja.PujaName,
          })
        );

        console.log("Formatted pujas:", formattedPujas);
        setAllPuja(formattedPujas);
      } catch (error) {
        console.error("Error fetching pujas:", error);
      }
    };
    fetchData();
  }, []);

  // Update formDataRef whenever services change
  useEffect(() => {
    formDataRef.current.Services = service;
  }, [service, formDataRef]);

  return (
    <div className="flex flex-col gap-4">
      <MultipleInput2
        value={service}
        onChange={handleServiceChange}
        services={allPuja}
        label1="Service"
        label2="Personal Price"
        label3="Commercial Price"
        label4="Duration Hours"
      />
      <div className="w-full">
        <p className="flex items-center gap-2 text-sm font-medium mb-1">
          About Yourself
        </p>
        <Textarea
          placeholder="About Yourself"
          name="AboutPandit"
          onChange={(e) => (formDataRef.current.AboutPandit = e.target.value)}
          className="w-full"
          rows={4}
        />
      </div>
    </div>
  );
}