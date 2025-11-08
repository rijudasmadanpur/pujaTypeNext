"use client";
import React, { useState, useRef, useEffect } from "react";
import { Check, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export type Item = {
    id: number | string;
    name: string;
};

interface MultiSelectCreateProps {
    items: Item[];
    placeholder?: string;
    onChange: (selected: Item[]) => void;
    value?: Item[];
    allowCreate?: boolean;
    postData?: (
        data: { id: number | string; name: string }[],
        type: "Certification" | "Education" | "Specialization"
    ) => Promise<void>;
}

export default function SelectsearchCreate({
    items,
    placeholder = "Select or create...",
    onChange,
    postData,
    value = [],
    allowCreate = true,
}: MultiSelectCreateProps) {
    const [query, setQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState<Item[]>(value);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Sync value with parent
    useEffect(() => {
        const isDifferent =
            value.length !== selectedItems.length ||
            value.some((v, i) => v.id !== selectedItems[i]?.id);
        if (isDifferent) setSelectedItems(value);
    }, [value]);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredItems = items.filter(
        (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) &&
            !selectedItems.some((s) => s.id === item.id)
    );

    const handleSelect = (item: Item) => {
        const newSelected = [...selectedItems, item];
        setSelectedItems(newSelected);
        onChange(newSelected);
        setQuery("");
    };

    const handleCreate = async () => {
        if (!query.trim() || !postData) return;

        const newItem: Item = { id: Date.now(), name: query };

        // Guess type from placeholder
        const type: "Certification" | "Education" | "Specialization" =
            placeholder.includes("Education")
                ? "Education"
                : placeholder.includes("Specialization")
                    ? "Specialization"
                    : "Certification";

        // 1️⃣ Post to backend
        await postData([newItem], type);

        // 2️⃣ Add to selection after post
        const newSelected = [...selectedItems, newItem];
        // setSelectedItems(newSelected);
        onChange(newSelected);

        setQuery("");
        setOpen(false);
    };

    const removeItem = (id: number | string) => {
        const newSelected = selectedItems.filter((i) => i.id !== id);
        setSelectedItems(newSelected);
        onChange(newSelected);
    };
    console.log("selectedItems:", selectedItems);

    return (
        <div className="relative w-full" ref={ref}>
            {/* Selected Items */}
            <div
                className="flex flex-wrap gap-1 border p-2 rounded cursor-text"
                onClick={() => setOpen(true)}
            >
                {selectedItems.map((item) =>
                    item.name ? (
                        // <div
                        //     key={item.id}
                        //     className="flex items-center bg-blue-300 text-blue-800 rounded px-2 py-1 text-sm"
                        // >
                        //     {item.name}
                        //     <X
                        //         className="ml-1 cursor-pointer"
                        //         onClick={() => removeItem(item.id)}
                        //         size={16}
                        //     />
                        // </div>
                        <Badge
                            key={item.id}
                            className="bg-blue-500 text-white"
                            variant="secondary"
                        >
                            {item.name}
                        </Badge>
                    ) : null
                )}

                <input
                    type="text"
                    className="flex-1 outline-none p-1 text-sm"
                    placeholder={selectedItems.length === 0 ? placeholder : ""}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                />
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelect(item)}
                            >
                                {item.name}
                                <Check className="text-green-500" size={16} />
                            </div>
                        ))
                    ) : allowCreate && query.trim() ? (
                        <div
                            className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={handleCreate}
                        >
                            <span>Create "{query}"</span>
                            <Plus size={16} />
                        </div>
                    ) : (
                        <div className="p-2 text-gray-400">No items found</div>
                    )}
                </div>
            )}
        </div>
    );
}
