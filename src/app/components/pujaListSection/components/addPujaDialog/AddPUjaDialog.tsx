"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

// ✅ Validation Schema using Zod
const pujaSchema = z.object({
    PujaName: z.string().min(2, "Puja name is required"),
    Description: z.string().min(5),
    Summary: z.string().optional(),
    DetailedDescription: z.string().optional(),
    History: z.string().optional(),
    WhyToPerform: z.string().optional(),
    WhenToPerform: z.string().optional(),
    HowToPerform: z.string().optional(),
    WhatToOffer: z.string().optional(),
    BenefitsOfPuja: z.string().optional(),
    Mantras: z.string().optional(),
    Samagri: z.string().optional(),
    FlowersColors: z.string().optional(),
    ClothesColors: z.string().optional(),
    PrasadPrepLink1: z.string().optional(),
    PrasadPrepLink2: z.string().optional(),
    PushpanjaliMantra: z.string().optional(),
    Picture1: z.any().optional(),
    Picture2: z.any().optional(),
    Picture3: z.any().optional(),
});

type PujaFormValues = z.infer<typeof pujaSchema>;

interface AddPujaDialogProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

export default function AddPujaDialog(props: AddPujaDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const open = props.open ?? internalOpen;
    const setOpen = props.setOpen ?? setInternalOpen;

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const form = useForm<PujaFormValues>({
        resolver: zodResolver(pujaSchema),
        defaultValues: {
            PujaName: "",
            Description: "",
            Summary: "",
            DetailedDescription: "",
            History: "",
            WhyToPerform: "",
            WhenToPerform: "",
            HowToPerform: "",
            WhatToOffer: "",
            BenefitsOfPuja: "",
            Mantras: "",
            Samagri: "",
            FlowersColors: "",
            ClothesColors: "",
            PrasadPrepLink1: "",
            PrasadPrepLink2: "",
            PushpanjaliMantra: "",
        },
    });

    // ✅ Handle image preview and store File
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const files = e.target.files;
        if (files && files[0]) {
            const newPreviews = [...imagePreviews];
            newPreviews[index] = URL.createObjectURL(files[0]);
            setImagePreviews(newPreviews);
            form.setValue(`image${index + 1}` as keyof PujaFormValues, files[0]);
        }
    };

    const onSubmit = async (data: PujaFormValues) => {
        console.log("Form Data:", data);

        try {
            const formData = new FormData();

            // Append all form fields
            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof File) {
                    formData.append(key, value);
                } else if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            // ✅ Example for file input if you are storing image separately in state
            // if (selectedImageFile) formData.append("Picture1", selectedImageFile);

            const res = await fetch("http://192.168.1.10:8000/api/postPujaType", {
                method: "POST",
                body: formData,
                // ❌ Don't set Content-Type manually for FormData
                // headers: { "Content-Type": "multipart/form-data" }, // remove this line
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Server Error:", errorText);
                alert("Failed to submit Puja. Please check the server logs.");
                return;
            }

            const result = await res.json();
            console.log("Response Data:", result);
            alert("Puja submitted successfully!");

            // Reset form after success
            form.reset();
            setImagePreviews([]);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong while submitting the form.");
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="h-full w-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mb-3 hover:bg-orange-600 transition">
                        <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h6 className="text-lg font-semibold text-orange-600">Add Puja</h6>
                </div>
            </DialogTrigger>

            <DialogContent className="min-w-5xl max-h-[90vh] overflow-y-auto  rounded-2xl">
                <DialogHeader className=" border-b sticky top-0 bg-white z-10 ">
                    <DialogTitle className="text-2xl mt-[-24px] font-semibold text-center mb-4 text-orange-600 bg-white p-4 rounded-lg">
                        Add New Puja
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="PujaName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Puja Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Durga Puja" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="Description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Short description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Other Text Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Summary",
                                "DetailedDescription",
                                "History",
                                "WhyToPerform",
                                "WhenToPerform",
                                "HowToPerform",
                                "WhatToOffer",
                                "BenefitsOfPuja",
                                "Mantras",
                                "Samagri",
                                "FlowersColors",
                                "ClothesColors",
                                "PrasadPrepLink1",
                                "PrasadPrepLink2",
                                "PushpanjaliMantra",
                            ].map((fieldName) => (
                                <FormField
                                    key={fieldName}
                                    control={form.control}
                                    name={fieldName as keyof PujaFormValues}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{fieldName}</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={`Enter ${fieldName}`}
                                                    rows={2}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>

                        {/* ✅ Image Upload Section */}
                        <div>
                            <FormLabel className="font-semibold">Upload Images (3)</FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="border rounded-lg p-3 flex flex-col items-center justify-center hover:border-orange-400 transition"
                                    >
                                        {imagePreviews[i] ? (
                                            <img
                                                src={imagePreviews[i]}
                                                alt={`Preview ${i + 1}`}
                                                className="w-full h-32 object-cover rounded-md mb-2"
                                            />
                                        ) : (
                                            <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 rounded-md">
                                                No Image
                                            </div>
                                        )}
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, i)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <DialogFooter className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                Submit Puja
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
