import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    password: z.string().min(8, "Password must be 8 characters").regex(/[A-Z]/, "Include at least one uppercase letter").regex(/[0-9]/, "Include at least one number"),
});

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password is required"),
});

export const profileSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    phone: z.string().min(10, "Invalid phone number"),
});

export const addressSchema = z.object({
    fullName: z.string().min(3, "Full name required"),
    phone: z.string().min(10, "Phone must be 10 digits").max(10, "Phone must be 10 digits"),
    address: z.string().min(5, "Address or street name required"),
    city: z.string().min(2, "City required"),
    state: z.string().min(4, "State required"),
    zipCode: z.string().max(6, "ZIP must be 6 digits").regex(/^\d+$/, "Only numbers allowed"),
    country: z.string().min(2, "Country required"),
    landmark: z.string().optional(),
});
export const checkoutSchema = z.object({
    shippingAddress: z.object({
        fullName: z.string().min(3, "Full name required"),
        phone: z.string().min(10, "Phone must be 10 digits").max(10, "Phone must be 10 digits"),
        address: z.string().min(5, "Address or street name required"),
        city: z.string().min(2, "City required"),
        state: z.string().min(4, "State required"),
        zipCode: z.string().min(6, "Zip or postal code required"),
        country: z.string().min(2, "Country required"),
        landmark: z.string().optional(),
    }),

    paymentMethod: z.enum(["CARD", "UPI", "COD"], {
        errorMap: () => ({ message: "Select payment method" }),
    }),
});
