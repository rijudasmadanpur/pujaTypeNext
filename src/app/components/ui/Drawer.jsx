"use client";

export default function Drawer({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="w-full max-w-md bg-white shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 font-bold"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
