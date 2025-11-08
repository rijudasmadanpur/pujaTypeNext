// "use client";
import { ChevronLeft, ChevronRight, Star, Plus, Gift } from "lucide-react";
import PujaDetailsImage from "./component/PujaDetailsImage";
import { getSinglePuja } from "@/lib/api";
import ExpandableSection from "./component/ExpandableSection";
import NavigationWrapper from "@/app/components/NavigationWrapper/NavigationWrapper";

// Define type for Puja (adjust fields as per your backend response)
interface Puja {
  ID: number;
  PujaName: string;
  Active: boolean;
  Picture1?: string;
  Picture2?: string;
  Picture3?: string;
  Description?: string;
  BenefitsOfPuja?: string;
  FlowersColors?: string;
  ClothesColors?: string;
  WhatToOffer?: string;
  Summary?: string;
  DetailedDescription?: string;
  History?: string;
  WhyToPerform?: string;
  WhenToPerform?: string;
  HowToPerform?: string;
  Samagri?: string;
  Mantras?: string;
  PushpanjaliMantra?: string;
  PrasadPrepLink1?: string;
  PrasadPrepLink2?: string;
}

// Props type - UPDATED for Next.js 15
interface ProductShowcaseProps {
  params: Promise<{
    PujaID: string;
  }>;
}

const ProductShowcase = async ({ params }: ProductShowcaseProps) => {
  // AWAIT the params promise
  const { PujaID } = await params;
  // const router

  const getPuja: Puja | null = await getSinglePuja(PujaID);
  console.log("Fetched Puja:", getPuja);

  const images: (string | null)[] = [
    getPuja?.Picture1
      ? `${process.env.NEXT_PUBLIC_API_URL}/${getPuja.Picture1}`
      : null,
    getPuja?.Picture2
      ? `${process.env.NEXT_PUBLIC_API_URL}/${getPuja.Picture2}`
      : null,
    getPuja?.Picture3
      ? `${process.env.NEXT_PUBLIC_API_URL}/${getPuja.Picture3}`
      : null,
  ];

  return (
    <div className="max-w-7xl mx-auto pt-18 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 justify-center align-middle">
        {/* Left Side - Product Images */}
        <PujaDetailsImage images={images} />

        {/* Right Side - Product Details */}
        <div className="space-y-4 sm:space-y-6 px-2 pt-5 pb-12 sm:px-0 flex flex-col align-center justify-between">
          {/* Tags */}
          <div className="flex flex-col gap-2 flex-wrap align-center h-full justify-center">
            <div className="flex gap-2 flex-wrap align-center justify-center ">
              <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {getPuja?.PujaName}
              </span>
              {getPuja?.Active ? (
                <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  • ACTIVE
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  • INACTIVE
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 sm:w-4 h-3 sm:h-4 ${i < 4 ? "fill-current" : "fill-current opacity-30"
                      }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-xs sm:text-sm">
                4.4 Stars
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {getPuja?.PujaName}
            </h1>

            {/* Product Description */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {getPuja?.Description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
              <span className="flex items-center gap-1 sm:gap-2 text-gray-600">
                💝 {getPuja?.BenefitsOfPuja}
              </span>
              <span className="flex items-center gap-1 sm:gap-2 text-gray-600">
                🌸 Flowers: {getPuja?.FlowersColors}
              </span>
              <span className="flex items-center gap-1 sm:gap-2 text-gray-600">
                👗 Clothes: {getPuja?.ClothesColors}
              </span>
            </div>
          </div>

          {/* Price and Buy Button */}
          <div className="space-y-3 sm:space-y-4">

            <NavigationWrapper href={`/searchpanditwithpuja/${PujaID}`}>
              <button className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg hover:from-blue-500 hover:to-purple-500 transition-colors">
                ₹ BOOK PANDIT
              </button>

            </NavigationWrapper>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
              <Gift className="w-3 sm:w-4 h-3 sm:h-4" />
              Special: {getPuja?.WhatToOffer}
            </div>
          </div>
        </div>
      </div>

      <ExpandableSection getPuja={getPuja} />
    </div>
  );
};

export default ProductShowcase;