import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-bold tracking-wide mb-2">
            Pandit4You
          </span>
          <span className="text-sm text-gray-400 mb-2">
            &copy; {new Date().getFullYear()} Pandit4You. All rights reserved.
          </span>
          <span className="text-xs text-gray-500">
            Made with <span className="text-orange-500">♥</span> in India
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <a href="#" className="hover:text-orange-400 transition">
            Home
          </a>
          <a href="#" className="hover:text-orange-400 transition">
            About
          </a>
          <a href="#" className="hover:text-orange-400 transition">
            Services
          </a>
          <a href="#" className="hover:text-orange-400 transition">
            Contact
          </a>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-orange-400 transition"
          >
            <svg width="24" height="24" fill="currentColor">
              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12"></path>
            </svg>
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-orange-400 transition"
          >
            <svg width="24" height="24" fill="currentColor">
              <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0 0 24 4.59a8.48 8.48 0 0 1-2.54.7z"></path>
            </svg>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-orange-400 transition"
          >
            <svg width="24" height="24" fill="currentColor">
              <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07c-1.28.058-2.16.24-2.91.51-.82.29-1.51.67-2.19 1.35-.68.68-1.06 1.37-1.35 2.19-.27.75-.452 1.63-.51 2.91C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.28.24 2.16.51 2.91.29.82.67 1.51 1.35 2.19.68.68 1.37 1.06 2.19 1.35.75.27 1.63.452 2.91.51C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.058 2.16-.24 2.91-.51.82-.29 1.51-.67 2.19-1.35.68-.68 1.06-1.37 1.35-2.19.27-.75.452-1.63.51-2.91.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.28-.24-2.16-.51-2.91-.29-.82-.67-1.51-1.35-2.19-.68-.68-1.37-1.06-2.19-1.35-.75-.27-1.63-.452-2.91-.51C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-11.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
