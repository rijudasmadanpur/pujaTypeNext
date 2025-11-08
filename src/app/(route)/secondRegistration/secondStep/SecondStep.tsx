"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelectChip } from "@/components/ui/MultiSelectChip";
import MultipleInput from "@/components/ui/MultipleInput";
import {
  getAllCertificates,
  getAllEducation,
  getAllLanguages,
  getAllSpecialization,
} from "@/app/lib/api";
import SelectsearchCreate from "@/components/ui/SelectsearchCreate";

// ✅ Import icons from lucide-react
import { Languages, GraduationCap, BookOpenCheck, Award } from "lucide-react";

interface SecondStepProps {
  formDataRef: React.MutableRefObject<any>;
}

export default function SecondStep({ formDataRef }: SecondStepProps) {
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [allLanguages, setAllLanguages] = useState<{ id: number; name: string }[]>([]);
  const [allCertificates, setAllCertificates] = useState<{ id: number; name: string }[]>([]);
  const [allEducation, setAllEducation] = useState<{ id: number; name: string }[]>([]);
  const [allSpecializations, setAllSpecializations] = useState<{ id: number; name: string }[]>([]);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([2]);

  useEffect(() => {
    const fetchData = async () => {
      const languagesa = await getAllLanguages();
      const formattedLanguages = languagesa.map((lang) => ({
        id: lang.ID,
        name: lang.LanguageName,
      }));
      setAllLanguages(formattedLanguages);

      const certificates = await getAllCertificates();
      const formattedCertificates = certificates.map((cert) => ({
        id: cert.ID,
        name: cert.Certification,
      }));
      setAllCertificates(formattedCertificates);

      const education = await getAllEducation();
      const formattedEducation = education.map((edu) => ({
        id: edu.ID,
        name: edu.Certification,
      }));
      setAllEducation(formattedEducation);

      const specializations = await getAllSpecialization();
      const formattedSpecializations = specializations.map((spec) => ({
        id: spec.ID,
        name: spec.SpecializationName,
      }));
      setAllSpecializations(formattedSpecializations);
    };
    fetchData();
  }, []);

  const handleSelect = (ids: number[]) => {
    console.log("Selected Language IDs:", ids);
    formDataRef.current.Languages = ids;
    setSelectedIds(ids);
  };

  const postData = async (
    data: { id: number | string; name: string }[],
    type: "Certification" | "Education" | "Specialization"
  ) => {
    if (!data.length) return;

    const payload: { CertificationType: string; Certification: string } = {
      CertificationType: type,
      Certification: data[0].name,
    };
    const payload1: { SpecializationName: string } = {
      SpecializationName: data[0].name,
    };
    const url =
      type === "Specialization"
        ? `${process.env.NEXT_PUBLIC_API_URL2}/specializations`
        : `${process.env.NEXT_PUBLIC_API_URL2}/certificates`;

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(type === "Specialization" ? payload1 : payload),
      });

      if (type === "Education") {
        const education = await getAllEducation();
        const formattedEducation = education.map((edu) => ({
          id: edu.ID,
          name: edu.Certification,
        }));
        setAllEducation(formattedEducation);
      } else if (type === "Certification") {
        const certificates = await getAllCertificates();
        const formattedCertificates = certificates.map((cert) => ({
          id: cert.ID,
          name: cert.Certification,
        }));
        setAllCertificates(formattedCertificates);
      } else if (type === "Specialization") {
        const specializations = await getAllSpecialization();
        const formattedSpecializations = specializations.map((spec) => ({
          id: spec.ID,
          name: spec.SpecializationName,
        }));
        setAllSpecializations(formattedSpecializations);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Languages */}
        <div className="w-1/2">
          <p className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
            <Languages className="w-4 h-4 text-blue-600" /> Languages
          </p>
          <MultiSelectChip
            options={allLanguages}
            label="Select Languages"
            defaultSelected={selectedIds}
            onChange={handleSelect}
          />
        </div>

        {/* Certificates */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-600" /> Certificates
          </p>
          <SelectsearchCreate
            items={allCertificates}
            placeholder="Select Certificate"
            value={formDataRef.current.Certification.map((id: number) => {
              const item = allCertificates.find((c) => c.id === id);
              return item ? { id: item.id, name: item.name } : { id, name: "" };
            })}
            onChange={(data) => {
              formDataRef.current.Certification = data.map((d) => d.id);
            }}
            postData={postData}
          />
        </div>

        {/* Education */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-green-600" /> Education
          </p>

          <SelectsearchCreate
            items={allEducation}
            placeholder="Select Education"
            value={formDataRef.current.Education.map((id: number) => {
              const item = allEducation.find((c) => c.id === id);
              return item ? { id: item.id, name: item.name } : { id, name: "" };
            })}
            onChange={(data) => {
              formDataRef.current.Education = data.map((d) => d.id);
            }}
            postData={postData}
          />
        </div>

        {/* Specialization */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4 text-purple-600" /> Specialization
          </p>
          <SelectsearchCreate
            items={allSpecializations}
            placeholder="Select Specialization"
            value={formDataRef.current.Specialization.map((id: number) => {
              const item = allSpecializations.find((c) => c.id === id);
              return item ? { id: item.id, name: item.name } : { id, name: "" };
            })}
            onChange={(data) => {
              formDataRef.current.Specialization = data.map((d) => d.id);
            }}
            postData={postData}
          />
        </div>


      </div>
    </div>
  );
}
