"use client";

import React, { useReducer } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country, State, City } from "country-state-city";
import {
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  Briefcase,
} from "lucide-react";

export default function FirstStep({ formDataRef }: any) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // trigger re-render

  const countries = Country.getAllCountries();
  const states = formDataRef.current.CountryCode
    ? State.getStatesOfCountry(formDataRef.current.CountryCode)
    : [];
  const cities =
    formDataRef.current.CountryCode && formDataRef.current.StateCode
      ? City.getCitiesOfState(
        formDataRef.current.CountryCode,
        formDataRef.current.StateCode
      )
      : [];

  return (
    <div className="flex flex-col gap-4">
      {/* Name Section */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <p className="flex items-center gap-2 text-sm font-medium mb-1">
            <User size={16} /> First Name
          </p>
          <Input
            type="text"
            placeholder="First Name"
            name="FirstName"
            defaultValue={formDataRef.current.FirstName}
            onChange={(e) => (formDataRef.current.FirstName = e.target.value)}
            required
          />
        </div>
        <div className="w-1/2">
          <p className="flex items-center gap-2 text-sm font-medium mb-1">
            <User size={16} /> Last Name
          </p>
          <Input
            type="text"
            placeholder="Last Name"
            name="LastName"
            defaultValue={formDataRef.current.LastName}
            onChange={(e) => (formDataRef.current.LastName = e.target.value)}
            required
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <p className="flex items-center gap-2 text-sm font-medium mb-1">
            <Mail size={16} /> Email
          </p>
          <Input
            type="email"
            placeholder="Email"
            name="EmailAddress"
            defaultValue={formDataRef.current.EmailAddress}
            onChange={(e) =>
              (formDataRef.current.EmailAddress = e.target.value)
            }
            required
          />
        </div>
        <div className="w-1/2">
          <p className="flex items-center gap-2 text-sm font-medium mb-1">
            <Phone size={16} /> Alternate Phone Number
          </p>
          <Input
            type="number"
            placeholder="Alternate Phone Number"
            name="AlternatePhoneNumber"
            defaultValue={formDataRef.current.AlternatePhoneNumber}
            onChange={(e) =>
              (formDataRef.current.AlternatePhoneNumber = e.target.value)
            }
            required
            min={0}
          />
        </div>
      </div>

      {/* Location Section */}
      <div className="flex gap-4">
        {/* Country Select */}
        <div className="w-1/2">
          <p className="flex items-center gap-2 text-sm font-medium mb-1">
            <Globe size={16} /> Country
          </p>
          <Select
            defaultValue={formDataRef.current.CountryCode || ""}
            onValueChange={(val) => {
              formDataRef.current.CountryCode = val;
              formDataRef.current.CountryName =
                countries.find((c) => c.isoCode === val)?.name || "";
              formDataRef.current.StateCode = "";
              formDataRef.current.StateName = "";
              formDataRef.current.CityCode = "";
              formDataRef.current.CityName = "";
              forceUpdate();
            }}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* State Select */}
        <div className="w-1/2">
          <p className="flex items-center gap-2 text-sm font-medium mb-1">
            <MapPin size={16} /> State
          </p>
          <Select
            defaultValue={formDataRef.current.StateCode || ""}
            onValueChange={(val) => {
              formDataRef.current.StateCode = val;
              formDataRef.current.StateName =
                states.find((s) => s.isoCode === val)?.name || "";
              formDataRef.current.CityCode = "";
              formDataRef.current.CityName = "";
              forceUpdate();
            }}
            disabled={!formDataRef.current.CountryCode}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((s) => (
                <SelectItem key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* City & Experience Section */}
      <div className="flex gap-4">
        {/* City Select */}
        <div className="w-full">
          <p className="flex items-center gap-2 text-sm font-medium mb-1">
            <Building2 size={16} /> City
          </p>
          <Select
            defaultValue={formDataRef.current.CityName || ""}
            onValueChange={(val) => {
              const city = cities.find((c) => c.name === val);

              if (city) {
                // ✅ CityCode = CityName
                formDataRef.current.CityCode = city.name;
                formDataRef.current.CityName = city.name;
              }

              forceUpdate();
            }}
            disabled={!formDataRef.current.StateCode}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c.name} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Experience Input */}
        <div className="w-full">
          <p className="flex items-center gap-2 text-sm font-medium mb-1">
            <Briefcase size={16} /> Experience (Years)
          </p>
          <Input
            type="number"
            placeholder="Experience (Years)"
            name="Experience"
            defaultValue={formDataRef.current.Experience}
            onChange={(e) => (formDataRef.current.Experience = e.target.value)}
            required
            min={0}
          />
        </div>
      </div>
    </div>
  );
}
