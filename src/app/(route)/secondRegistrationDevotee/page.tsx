

"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import { submitForm } from "@/app/actions/submitForm";
import { Country, State, City } from "country-state-city";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";


// Zod validation schema
const formSchema = z.object({
  Name: z.string().min(1, "Full name is required"),
  EmailAddress: z.string().email("Please enter a valid email address"),
  PhoneNumber: z.string().min(1, "Phone number is required"),
  WhatsappNumber: z.string().min(1, "WhatsApp number is required"),
  Address: z.string().min(1, "Address is required"),
  CountryName: z.string().min(1, "Country is required"),
  CountryCode: z.string().min(1, "Country code is required"),
  StateName: z.string().min(1, "State is required"),
  StateCode: z.string().min(1, "State code is required"),
  CityName: z.string().min(1, "City is required"),
  CityCode: z.string().min(1, "City code is required"),
  Location: z.string().min(1, "Location is required"),
  UsersID: z.string(),
  Comments: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function TempleFormPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const { user, login, logout } = useAuth();


  const routes = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      EmailAddress: "",
      PhoneNumber: "",
      WhatsappNumber: "",
      Address: "",
      CountryName: "",
      CountryCode: "",
      StateName: "",
      StateCode: "",
      CityName: "",
      CityCode: "",
      Location: "",
      UsersID: "",
      Comments: "",
    },
  });

  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];
  const cities = selectedCountry && selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState)
    : [];

  const handleCountryChange = (value: string) => {
    const country = countries.find(c => c.isoCode === value);
    setSelectedCountry(value);
    setSelectedState("");
    setSelectedCity("");

    setValue("CountryCode", value);
    setValue("CountryName", country?.name || "");
    setValue("StateCode", "");
    setValue("StateName", "");
    setValue("CityCode", "");
    setValue("CityName", "");

    // Trigger validation for country fields
    trigger(["CountryCode", "CountryName"]);
  };

  const handleStateChange = (value: string) => {
    const state = states.find(s => s.isoCode === value);
    setSelectedState(value);
    setSelectedCity("");

    setValue("StateCode", value);
    setValue("StateName", state?.name || "");
    setValue("CityCode", "");
    setValue("CityName", "");

    // Trigger validation for state fields
    trigger(["StateCode", "StateName"]);
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);

    setValue("CityCode", value);
    setValue("CityName", value);

    // Trigger validation for city fields
    trigger(["CityCode", "CityName"]);
  };

  // ===================================================================================

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setStatus(null);

    const submitData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      submitData.append(key, value || "");
    });
    console.log("data", data)


    try {
      const userCookie = Cookies.get("userId");
      if (!userCookie) {
        throw new Error("User not authenticated");
      }
      submitData.append("UsersID", userCookie);
      console.log("Submitting data for user:", userCookie);
      data.UsersID = userCookie;
      console.log("Final data to submit:", data);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/devotee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ✅ tell backend this is JSON
        },
        body: JSON.stringify(data),
      });
      console.log("Response status:", res);

      if (!res.ok) {

        throw new Error(`Server responded with ${res.status}`);
      }
      const dataa = await res.json();
      console.log("Server response data:", dataa);
      login(dataa.Devotee);

      // Uncomment when you have the server action
      // await submitForm(submitData);

      routes.push('/profile/dashboard/devotee/profile');

      console.log("Form data:", data);
      setStatus("Form submitted successfully!");
    } catch (error) {
      setStatus("Error submitting form. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Complete your Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-card p-6 rounded-2xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="Name" className="mb-2 block">Full Name *</Label>
            <Input
              id="Name"
              {...register("Name")}
              placeholder="Rajesh Sharma"
            />
            {errors.Name && (
              <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="EmailAddress" className="mb-2 block">Email *</Label>
            <Input
              id="EmailAddress"
              type="email"
              {...register("EmailAddress")}
              placeholder="rajesh.sharma@example.com"
            />
            {errors.EmailAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.EmailAddress.message}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <Label htmlFor="PhoneNumber" className="mb-2 block">Phone Number *</Label>
            <Input
              id="PhoneNumber"
              {...register("PhoneNumber")}
              placeholder="9876543210"
            />
            {errors.PhoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.PhoneNumber.message}</p>
            )}
          </div>

          {/* WhatsApp Number Field */}
          <div>
            <Label htmlFor="WhatsappNumber" className="mb-2 block">WhatsApp Number *</Label>
            <Input
              id="WhatsappNumber"
              {...register("WhatsappNumber")}
              placeholder="9876543210"
            />
            {errors.WhatsappNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.WhatsappNumber.message}</p>
            )}
          </div>

          {/* Address Field */}
          <div className="md:col-span-2">
            <Label htmlFor="Address" className="mb-2 block">Address *</Label>
            <Input
              id="Address"
              {...register("Address")}
              placeholder="12/5, Krishna Nagar, New Delhi"
            />
            {errors.Address && (
              <p className="text-red-500 text-sm mt-1">{errors.Address.message}</p>
            )}
          </div>

          {/* Country Field */}
          <div>
            <Label htmlFor="CountryName" className="mb-2 block">Country Name *</Label>
            <Select
              value={selectedCountry}
              onValueChange={handleCountryChange}
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
            {(errors.CountryName || errors.CountryCode) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.CountryName?.message || errors.CountryCode?.message}
              </p>
            )}
          </div>

          {/* State Field */}
          <div>
            <Label htmlFor="StateName" className="mb-2 block">State Name *</Label>
            <Select
              value={selectedState}
              onValueChange={handleStateChange}
              disabled={!selectedCountry}
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
            {(errors.StateName || errors.StateCode) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.StateName?.message || errors.StateCode?.message}
              </p>
            )}
          </div>

          {/* City Field */}
          <div>
            <Label htmlFor="CityName" className="mb-2 block">City Name *</Label>
            <Select
              value={selectedCity}
              onValueChange={handleCityChange}
              disabled={!selectedState}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(errors.CityName || errors.CityCode) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.CityName?.message || errors.CityCode?.message}
              </p>
            )}
          </div>

          {/* Location Field */}
          <div>
            <Label htmlFor="Location" className="mb-2 block">Location *</Label>
            <Input
              id="Location"
              {...register("Location")}
              placeholder="Laxmi Nagar Temple"
            />
            {errors.Location && (
              <p className="text-red-500 text-sm mt-1">{errors.Location.message}</p>
            )}
          </div>
        </div>

        {/* Comments Field */}
        <div>
          <Label htmlFor="Comments" className="mb-2 block">Comments</Label>
          <Textarea
            id="Comments"
            {...register("Comments")}
            placeholder="Regular temple visitor, donated multiple times."
          />
          {errors.Comments && (
            <p className="text-red-500 text-sm mt-1">{errors.Comments.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>

        {status && (
          <p className={`text-center text-sm mt-4 ${status.includes("Error") ? "text-red-500" : "text-green-500"
            }`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}