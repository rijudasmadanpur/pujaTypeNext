"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useLocation } from "@/app/context/LocationContext";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <Card className="w-full rounded-2xl overflow-hidden shadow-lg">
      <div className="overflow-hidden">
        <Skeleton className="h-48 w-full rounded-none" />
      </div>
      <CardHeader className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-end">
        <Skeleton className="h-9 w-24 rounded-lg" />
      </CardFooter>
    </Card>
  );
}

export default function TestimonialSection() {
  const router = useRouter();
  const { location } = useLocation();

  // ✅ State for fetched data
  const [panditList, setPanditList] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch pandit list based on location
  useEffect(() => {
    if (!location?.cityName) return;

    const fetchPandits = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL2}/panditData/location?countryCode=${location.countryCode}&stateCode=${location.stateCode}&cityCode=${location.cityName}`,
          { cache: "no-store" }
        );

        console.log("url", `${process.env.NEXT_PUBLIC_API_URL2}/panditData/location?countryCode=${location.countryCode}&stateCode=${location.stateCode}&cityCode=${location.cityName}`);
        if (!res.ok) throw new Error("Failed to fetch pandit list");
        const data = await res.json();
        setPanditList(data.user);
      } catch (err) {
        console.error("❌ Error fetching pandit list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPandits();
  }, [location?.countryCode, location?.stateCode, location?.cityName, location]);
  console.log(panditList);
  // console.log("last digit:", panditList?.[0]?.UsersID % 10);

  return (
    <div className="w-screen bg-orange-300 p-10">
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "white",
          borderTopRightRadius: "180px",
          borderBottomLeftRadius: "180px",
        }}
        className="pt-10"
      >
        <p className="text-2xl text-center font-bold">
          Choose your favourite Pandit
        </p>

        {/* ✅ Grid of Cards */}
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8 pt-10 pb-20 px-5 sm:px-8 lg:px-16 xl:px-30">
          {loading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            panditList?.map((pandit, index) => (
              <Card
                key={index}
                className="w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <div className="relative w-full h-80">
                    <img
                      src={
                        pandit.Profile.Picture
                          ? `${process.env.NEXT_PUBLIC_API_URL2}/${pandit.Profile.Picture}`
                          : `/img/pandit/${pandit?.UsersID % 10}.jpg`
                      }
                      alt={pandit.Profile.FirstName}
                      className="h-120 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Details */}
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-bold group-hover:text-red-600 transition-colors">
                    {pandit.Profile.FirstName || "Pandit Ji"} {pandit.Profile.LastName || ""}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    {pandit.Profile.CityName || "Experienced Pandit"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-600">
                    {pandit.Profile.AboutPandit}                  </p>
                </CardContent>

                <CardFooter className="p-4 border-t flex justify-end">
                  <button
                    onClick={() => router.push(`/puja/0/${pandit.UsersID}`)}
                    className="px-4 py-1 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                  >
                    Book Now
                  </button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {/* ✅ View All Button */}
        <div className="flex justify-end mt-8 pb-5 mr-5">
          <button
            onClick={() => router.push("/findPandit")}
            className="p-3 rounded-full bg-black text-white shadow hover:bg-gray-900 transition flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}