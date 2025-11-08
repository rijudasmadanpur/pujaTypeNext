import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconClipboardCopy } from "@tabler/icons-react";
import Link from "next/link";
import { getAllPuja } from "@/lib/api";
import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import AddPUjaDialog from "./components/addPujaDialog/AddPUjaDialog";


// Puja type (adjust fields if your API returns differently)
interface Puja {
  ID?: number | string;
  PujaName?: string;
  title?: string;
  Description?: string;
  description?: string;
  Picture1?: string;
}

// Props for PujaListSection
interface PujaListSectionProps {
  showAll: boolean;
  type?: "home" | "admin";
}

// Props for CardImage
interface CardImageProps {
  src: string;
  alt?: string;
}

// Card image component
const CardImage: React.FC<CardImageProps> = ({ src, alt }) => (
  <div className="w-full h-50 flex items-center justify-center overflow-hidden rounded-t-xl">
    <img
      src={src}
      alt={alt || "Image"}
      className="object-cover w-full h-full"
      style={{ maxHeight: "100%" }}
    />
  </div>
);
interface Puja {
  ID?: number | string;
  PujaName?: string;
}

export async function PujaListSection({ showAll, type }: PujaListSectionProps) {
  let pujaTypes: Puja[] = [];


  try {
    pujaTypes = await getAllPuja();
  } catch (error) {
    console.error("Error fetching puja types:", error);
    // Show error to user or fallback
  }

  const items =
    Array.isArray(pujaTypes) && pujaTypes.length
      ? pujaTypes.map((puja, idx) => ({
        title: puja.PujaName || puja.title || "Puja Title",
        description:
          (
            puja.Description ||
            puja.description ||
            "No description available."
          )
            .split(" ")
            .slice(0, 18)
            .join(" ") + "...",
        header: (
          <CardImage
            src={
              puja.Picture1 &&
                typeof puja.Picture1 === "string" &&
                puja.Picture1.trim()
                ? `${process.env.NEXT_PUBLIC_API_URL}/${puja.Picture1}`
                : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            }
          />
        ),
        className: "md:col-span-1",
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        id: puja.ID ?? idx,
      }))
      : [];

  // Show only 2 rows (8 cards for 4 cols) unless showAll is true
  const maxCards = 8;
  const visibleItems = type !== "home" ? items : items.slice(0, maxCards);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "white",
        borderTopRightRadius: "180px",
        borderBottomLeftRadius: "180px",
        borderBottomRightRadius: "0",
      }}
      className="p-10"
    >
      <h2 className=" text-2xl font-semibold text-center mb-8">All Puja List</h2>
      <BentoGrid className="max-w-7xl h-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:auto-rows-[24rem]">
        <AddPUjaDialog />
        {visibleItems.map((item) => (
          <div key={item.id} className="flex flex-col">
            <BentoGridItem
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
            />
            <div className="flex justify-center pb-4">
              <Link
                href={`/puja/${item.id}`}
                className="mt-2 px-4 py-2 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
              >
                {type == "home" ? "View Puja" : "Edit Puja"}
              </Link>
            </div>
          </div>
        ))}
      </BentoGrid>



      {type == "home" && (items.length > maxCards) && (
        <div className="flex justify-center mt-8 mt-12">
          <form action="">
            <button
              type="submit"
              formAction="?viewAll=1"
              className="p-3 rounded-full bg-black text-white shadow hover:bg-gray-900 transition flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      )
      }
    </div>

  );
}
