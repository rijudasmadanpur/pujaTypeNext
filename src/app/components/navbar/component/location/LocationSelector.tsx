"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Country, State, City } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "@/app/context/LocationContext";

export default function LocationSelectorDialog() {
  const { location, setLocation } = useLocation();

  const [country, setCountry] = React.useState(location.countryCode);
  const [state, setState] = React.useState(location.stateCode);
  const [city, setCity] = React.useState(location.cityName);

  const countries = Country.getAllCountries();
  const states = country ? State.getStatesOfCountry(country) : [];
  const cities = country && state ? City.getCitiesOfState(country, state) : [];
  console.log("cities", cities)

  // Save changes to context whenever selections change
  React.useEffect(() => {
    const selectedCountry = countries.find((c) => c.isoCode === country);
    const selectedState = states.find((s) => s.isoCode === state);
    const selectedCity = cities.find((c) => c.name === city);

    setLocation({
      countryCode: selectedCountry?.isoCode || "",
      countryName: selectedCountry?.name || "",
      stateCode: selectedState?.isoCode || "",
      stateName: selectedState?.name || "",
      cityCode: selectedCity?.name || "",
      cityName: selectedCity?.name || "",
    });
  }, [country, state, city]);


  // Auto-detect on mount
  React.useEffect(() => {

    if (!process.env.NEXT_PUBLIC_LOCATIONIQ_KEY) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await res.json();

      const detectedCountry = countries.find(
        (c) => c.name.toLowerCase() === data.address.country?.toLowerCase()
      );
      if (detectedCountry) {
        setCountry(detectedCountry.isoCode);

        const detectedState = State.getStatesOfCountry(
          detectedCountry.isoCode
        ).find((s) =>
          s.name.toLowerCase().includes(data.address.state?.toLowerCase())
        );

        if (detectedState) {
          setState(detectedState.isoCode);

          const detectedCity = City.getCitiesOfState(
            detectedCountry.isoCode,
            detectedState.isoCode
          ).find((c) =>
            c.name.toLowerCase().includes(data.address.city?.toLowerCase())
          );

          if (detectedCity) {
            setCity(detectedCity.name);
          }
        }
      }
    });
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{city ? city : "Select City"}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 justify-center items-center w-full flex-wrap">
          {/* Country Selector */}
          <Select
            value={country}
            onValueChange={(val) => {
              setCountry(val);
              setState("");
              setCity("");
            }}
          >
            <SelectTrigger>
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

          {/* State Selector */}
          <Select
            value={state}
            onValueChange={(val) => {
              setState(val);
              setCity("");
            }}
            disabled={!country}
          >
            <SelectTrigger>
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

          {/* City Selector */}
          <Select value={city} onValueChange={setCity} disabled={!state}>
            <SelectTrigger>
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
      </DialogContent>
    </Dialog>
  );
}
