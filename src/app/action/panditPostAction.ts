"use server";

import { z } from "zod";

// Only export the server action function
export async function panditPostAction(formData: FormData) {
    // Define Zod schema inside the function (cannot export object)
    const panditFormSchema = z.object({
        FirstName: z.string().min(1, "First name is required"),
        LastName: z.string().min(1, "Last name is required"),
        // EmailAddress: z.string().email("Invalid email address"),
        // Country: z.string().min(1, "Country is required"),
        // State: z.string().min(1, "State is required"),
        // City: z.string().min(1, "City is required"),
        // Experience: z
        //     .string()
        //     .regex(/^\d+$/, "Experience must be a number")
        //     .transform(Number),
        // Add fields for other steps if needed
    });

    try {
        const data = Object.fromEntries(formData.entries());
        const parsedData = panditFormSchema.parse(data);

        // Save to database here if needed
        // e.g., await prisma.pandit.create({ data: parsedData });

        return { success: true, message: "Form submitted successfully", data: parsedData };
    } catch (err) {
        if (err instanceof z.ZodError) {
            return {
                success: false,
                message: "Validation failed",
                errors: err.flatten().fieldErrors,
            };
        }
        return { success: false, message: "Something went wrong" };
    }
}
