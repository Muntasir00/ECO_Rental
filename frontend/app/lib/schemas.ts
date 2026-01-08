import { z } from "zod";

export const personalDataSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export const bookingInfoSchema = z.object({
    checkIn: z.date(),
    checkOut: z.date(),
    totalRoom: z.string().min(1, "Select at least 1 room"),
    totalGuest: z.string().min(1, "Select at least 1 guest"),
    referralCode: z.string().optional(),
}).refine((data) => data.checkOut > data.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
});

// Helper type for the aggregated data
export type BookingFormData = z.infer<typeof personalDataSchema> & z.infer<typeof bookingInfoSchema>;