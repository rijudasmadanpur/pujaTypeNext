"use client"
import React from 'react'
import { Phone } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from '@/app/context/AuthContext';
import LoginSignupDialog from '@/app/components/loginSignup/LoginSignupdialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Define the enum values separately
const BookingTypeEnum = z.enum(["P", "C"]);

const formSchema = z.object({
    DevoteeID: z.number().min(1, "Devotee is required"),
    PujaTypeID: z.number().min(1, "Puja type is required"),
    PanditID: z.number().min(1, "Pandit is required"),
    BookingType: BookingTypeEnum,
    DateTime: z.string().min(1, "Date and time is required"),
    Reason: z.string().min(1, "Reason is required").max(500, "Reason too long"),
    Price: z.number().min(0, "Price must be positive"),
    StateID: z.number().min(1, "State is required"),
    CityID: z.number().min(1, "City is required"),
    CountryID: z.number().min(1, "Country is required"),
    Landmark: z.string().optional(),
    Area: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for dropdowns (replace with your actual data)
const pujaTypes = [
    { id: 1, name: "Ganesh Puja" },
    { id: 2, name: "Laxmi Puja" },
    { id: 3, name: "Vastu Puja" },
    { id: 4, name: "Satyanarayan Puja" },
];

const states = [
    { id: 1, name: "California" },
    { id: 2, name: "Texas" },
    { id: 3, name: "New York" },
];

const cities = [
    { id: 1, name: "Los Angeles", stateId: 1 },
    { id: 2, name: "San Francisco", stateId: 1 },
    { id: 3, name: "Houston", stateId: 2 },
];

const countries = [
    { id: 1, name: "United States" },
    { id: 2, name: "India" },
    { id: 3, name: "United Kingdom" },
];

export default function PanditBookDialog() {
    const { user } = useAuth();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            DevoteeID: 57,
            PujaTypeID: 3,
            PanditID: 85,
            BookingType: "P",
            DateTime: "2025-10-29T18:00",
            Reason: "vastu griha Puja",
            Price: 300,
            StateID: 1,
            CityID: 2,
            CountryID: 3,
            Landmark: "Near abc building",
            Area: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted:", data);
        // Handle form submission here
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex-1 cursor-pointer border-2 bg-orange-600 text-white hover:bg-orange-500 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Book Consultation
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                {user ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className='font-bold text-center'>Book Puja Consultation</DialogTitle>
                            <DialogDescription className='text-center'>
                                Fill in the details below to book your puja consultation.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {/* Puja Type Dropdown */}
                                <div className='flex gap-4'>
                                    <div className='flex-1'>
                                        <FormField
                                            control={form.control}
                                            name="PujaTypeID"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Select Puja:</FormLabel>
                                                    <Select
                                                        onValueChange={(value) => field.onChange(Number(value))}
                                                        defaultValue={field.value?.toString()}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select puja type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {pujaTypes.map((puja) => (
                                                                <SelectItem key={puja.id} value={puja.id.toString()}>
                                                                    {puja.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Booking Type Dropdown */}
                                    <div className='flex-1'>
                                        <FormField
                                            control={form.control}
                                            name="BookingType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Booking Type</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select booking type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="P">Personal</SelectItem>
                                                            <SelectItem value="C">Commercial</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Date and Time */}
                                <FormField
                                    control={form.control}
                                    name="DateTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date & Time</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="datetime-local"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Reason */}
                                <FormField
                                    control={form.control}
                                    name="Reason"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reason</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter reason for puja..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Price */}
                                <FormField
                                    control={form.control}
                                    name="Price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Area */}
                                <FormField
                                    control={form.control}
                                    name="Area"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Block/Flat no/Floor No</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter block/flat/floor details"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Location Section */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Country Dropdown */}
                                    <FormField
                                        control={form.control}
                                        name="CountryID"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <Select
                                                    onValueChange={(value) => field.onChange(Number(value))}
                                                    defaultValue={field.value?.toString()}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select country" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {countries.map((country) => (
                                                            <SelectItem key={country.id} value={country.id.toString()}>
                                                                {country.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* State Dropdown */}
                                    <FormField
                                        control={form.control}
                                        name="StateID"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <Select
                                                    onValueChange={(value) => field.onChange(Number(value))}
                                                    defaultValue={field.value?.toString()}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select state" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {states.map((state) => (
                                                            <SelectItem key={state.id} value={state.id.toString()}>
                                                                {state.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* City Dropdown */}
                                    <FormField
                                        control={form.control}
                                        name="CityID"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <Select
                                                    onValueChange={(value) => field.onChange(Number(value))}
                                                    defaultValue={field.value?.toString()}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select city" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {cities.map((city) => (
                                                            <SelectItem key={city.id} value={city.id.toString()}>
                                                                {city.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Landmark */}
                                <FormField
                                    control={form.control}
                                    name="Landmark"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Landmark</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter landmark..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter className="sm:justify-end gap-2 pt-4">
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit">
                                        Book Puja
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Authentication Required</DialogTitle>
                            <DialogDescription>
                                Please login to book a puja consultation.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center justify-center p-4 space-y-4">
                            <p className="text-center text-muted-foreground">
                                You need to be logged in to book a consultation.
                            </p>
                            <LoginSignupDialog />
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}