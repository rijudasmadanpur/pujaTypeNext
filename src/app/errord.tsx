"use client"
import { useState } from "react";
import { X } from "lucide-react"; // Make sure lucide-react is installed

interface ErrorOverlayProps {
  error: Error;
  reset: () => void;
}

export default function ErrorOverlay({ error, reset }: ErrorOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-white rounded-lg p-6 w-11/12 max-w-md text-center shadow-lg">
        {/* Close Icon */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Something went wrong!
        </h2>
        <p className="text-gray-700 mb-4">{error.message}</p>

        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
