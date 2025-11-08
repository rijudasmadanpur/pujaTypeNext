"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Plus, Gift } from "lucide-react";
import Image from "next/image";

export default function PujaDetailsImage({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const thumbnails = [
    `${process.env.NEXT_PUBLIC_API_URL}/${images[0]}`,
    `${process.env.NEXT_PUBLIC_API_URL}/${images[1]}`,
    `${process.env.NEXT_PUBLIC_API_URL}/${images[2]}`,
  ];
  console.log("thumbnails:", thumbnails);
  console.log("images:", images);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image ================================================= */}
      <div className="relative bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 rounded-2xl p-4 sm:p-8 aspect-square overflow-hidden">
        {/* Navigation Arrows */}
        <div className="relative bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 rounded-2xl  aspect-square overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={`Puja Image ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
        </div>

        <button
          onClick={prevImage}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
        </button>
      </div>
      {/* Thumbnail Images ====================================================================== */}
      <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
        {images.map((thumb, index) => (
          thumb && <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-16 sm:w-20 h-12 sm:h-16 rounded-lg overflow-hidden border-2 transition-colors ${currentImageIndex === index
              ? "border-blue-400"
              : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 relative">
              <img
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover absolute top-0 left-0"
              />
            </div>

          </button>
        ))}
      </div>
    </div>
  );
}
