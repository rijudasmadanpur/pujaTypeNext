"use client";
import { useState, useEffect } from "react";

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(2);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("right");

  // Sample deity images - replace with your actual images
  interface Deity {
    id: number;
    name: string;
    src: string;
  }
  const deities = [
    {
      id: 1,
      name: "Narasimha",
      src: "https://w0.peakpx.com/wallpaper/16/924/HD-wallpaper-maa-laxmi-animation-maa-laxmi-goddess-of-wealth-lakshmi-maa-animation.jpg",
    },
    {
      id: 2,
      name: "Shiva",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Lalbaugh_Ganesha.jpg/1200px-Lalbaugh_Ganesha.jpg",
    },
    {
      id: 3,
      name: "Ganesha",
      src: "https://cdn11.bigcommerce.com/s-x49po/images/stencil/1280x1280/products/124437/291628/handmade%2Fdownscaled%2Fh_tqovldhx9i_2000x2000__24880.1701080055.jpg?c=2",
    },
    {
      id: 4,
      name: "Durga",
      src: "https://images.pexels.com/photos/10852670/pexels-photo-10852670.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      name: "Ram",
      src: "https://hinduismsimplified.com/wp-content/uploads/2023/12/pexels-kolkatar-chobiwala-14177097.jpg",
    },
    {
      id: 6,
      name: "Ram",
      src: "https://i.pinimg.com/736x/ef/5d/c5/ef5dc54ca08475e7b9bc8926559a0e56.jpg",
    },
    {
      id: 7,
      name: "Ram",
      src: "https://i.pinimg.com/736x/50/0c/71/500c71d6306965ba9c2a819e038c3f77.jpg",
    },
  ];

  // Animate each card moving to the next position in a "round" effect
  // We'll use translateX for each card based on its offset from the center
  const getCardStyle = (offset: number): React.CSSProperties => {
    if (offset < -3 || offset > 3) {
      return { display: "none" };
    }
    const baseZ = 10 + Math.abs(offset) * -1;
    const scale =
      offset === 0
        ? 1.1
        : Math.abs(offset) === 1
          ? 1
          : Math.abs(offset) === 2
            ? 0.9
            : 0.8;
    const percent =
      offset === 0
        ? 50
        : offset === -3
          ? 5
          : offset === -2
            ? 18
            : offset === -1
              ? 32
              : offset === 1
                ? 68
                : offset === 2
                  ? 82
                  : 95;

    // Use md size for sm and md screens, lg for large screens
    let width, height;
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      if (w < 1024) {
        // sm and md
        width =
          offset === 0
            ? "220px"
            : Math.abs(offset) === 1
              ? "170px"
              : Math.abs(offset) === 2
                ? "120px"
                : "80px";
        height =
          offset === 0
            ? "260px"
            : Math.abs(offset) === 1
              ? "200px"
              : Math.abs(offset) === 2
                ? "140px"
                : "100px";
      } else if (w < 1280) {
        // lg only (same as md)
        width =
          offset === 0
            ? "220px"
            : Math.abs(offset) === 1
              ? "170px"
              : Math.abs(offset) === 2
                ? "120px"
                : "80px";
        height =
          offset === 0
            ? "260px"
            : Math.abs(offset) === 1
              ? "200px"
              : Math.abs(offset) === 2
                ? "140px"
                : "100px";
      } else {
        // xl and up (big)
        width =
          offset === 0
            ? "356px"
            : Math.abs(offset) === 1
              ? "292px"
              : Math.abs(offset) === 2
                ? "228px"
                : "160px";
        height =
          offset === 0
            ? "420px"
            : Math.abs(offset) === 1
              ? "340px"
              : Math.abs(offset) === 2
                ? "260px"
                : "180px";
      }
    } else {
      width = "220px";
      height = "260px";
    }
    return {
      zIndex: baseZ,
      transform: `translate(-50%, -50%) scale(${scale})`,
      transition: "all 0.6s cubic-bezier(.4,2,.6,1)",
      position: "absolute",
      left: `${percent}%`,
      top: "30%",
      width,
      height,
      boxShadow: offset === 0 ? "0 8px 32px #0002" : "0 4px 16px #0001",
      border: offset === 0 ? "2px solid #fde047" : "none",
      borderRadius: "1rem",
      overflow: "hidden",
      background: "#fff",
      pointerEvents: offset === 0 ? "auto" : "none",
    };
  };

  const nextSlide = () => {
    if (!isAnimating) {
      setDirection("right");
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % deities.length);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setDirection("left");
      setIsAnimating(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? deities.length - 1 : prevIndex - 1
      );
    }
  };

  // Auto-advance card every 3 seconds with round effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("right");
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % deities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [deities.length]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="w-full h-[500px] flex items-center justify-center py-0 m-0 relative">
      <div className="w-full h-full relative flex items-center justify-center">
        {deities.map((deity, i) => {
          // Calculate offset from currentIndex, wrap around for circular carousel
          let offset = i - currentIndex;
          const half = Math.floor(deities.length / 2);
          // For 7 visible, wrap offsets to -3..3
          if (offset > 3) offset -= deities.length;
          if (offset < -3) offset += deities.length;
          return (
            <div
              key={deity.id}
              style={getCardStyle(offset)}
              className="
                sm:w-[120px] sm:h-[140px]
                md:w-[220px] md:h-[260px]
                lg:w-[220px] lg:h-[260px]
                xl:w-[356px] xl:h-[420px]
              "
            >
              <img
                src={deity.src}
                alt={deity.name}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
