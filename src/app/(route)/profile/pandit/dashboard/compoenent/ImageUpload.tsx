"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";
import { useAuth } from "@/app/context/AuthContext";

// Props type
interface ImageUploadProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    userType: string | number;
}

export default function ImageUpload(props: ImageUploadProps) {
    const { userType } = props;
    const [internalOpen, setInternalOpen] = useState<boolean>(false);
    const open = typeof props.open === "boolean" ? props.open : internalOpen;
    const { user, refreshUser } = useAuth();
    console.log("User from context:", user);

    const setOpen =
        typeof props.setOpen === "function" ? props.setOpen : setInternalOpen;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // Handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setSelectedFile(file);

        // Preview image
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);
    };

    // Handle upload using fetch
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image first!");
            return;
        }
        console.log(user)

        // console.log("User:", user?.Profile?.DevoteeID, user?.Profile?.PanditID);

        // Validate required fields before creating FormData
        // if (!user?.Profile?.PanditID || !user?.Profile?.DevoteeID) {
        //     alert("User ID is missing. Please make sure you're logged in properly.");
        //     return;
        // }

        console.log("Uploading image for user type:", userType);

        const formData = new FormData();
        formData.append("Picture", selectedFile);
        formData.append("UserType", userType.toString()); // Convert to string
        console.log(user?.Profile?.PanditID, user?.Profile?.DevoteeID);
        console.log(
            userType == 1
                ? (user?.Profile?.PanditID ?? '').toString()
                : (user?.Profile?.DevoteeID ?? '').toString()
        );
        // Use the validated PanditID
        formData.append("ID", userType == 1
            ? (user?.Profile?.PanditID ?? '').toString()
            : (user?.Profile?.DevoteeID ?? '').toString());

        // Debug: log FormData contents
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const url = userType == 1 ? `${process.env.NEXT_PUBLIC_API_URL2}/imageUpload/pandit` : `${process.env.NEXT_PUBLIC_API_URL2}/imageUpload/devotee`;
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            console.log("Response status:", response.status);
            console.log("Response ok:", response.ok);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server error:", errorText);
                throw new Error(`Upload failed! Status: ${response.status} `);
            }

            const data = await response.json();
            // alert("Image uploaded successfully!");
            console.log("Upload success:", data);

            // Close dialog on success
            setOpen(false);
            // Refresh user data to reflect new image
            await refreshUser();

        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed! Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    onClick={() => setOpen(true)}
                    className="cursor-pointer h-10 w-20"
                >
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="min-w-4xl min-h-[600px] max-h-screen flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col items-center gap-4">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            className="w-64 h-64 rounded-2xl object-cover shadow-2xl border-4 border-orange-200"
                            alt="Preview"
                        />
                    ) : (
                        <img
                            src={"/img/user/1.png"}
                            className="w-64 h-64 rounded-2xl object-cover shadow-2xl border-4 border-orange-200"
                            alt="Default"
                        />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-4"
                    />

                    <Button onClick={handleUpload} disabled={!selectedFile} className="mt-2">
                        Upload
                    </Button>
                </div>

                <DialogFooter>{/* Optional footer */}</DialogFooter>
            </DialogContent>
        </Dialog>
    );
}