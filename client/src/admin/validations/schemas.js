import { File } from "lucide-react";
import { z } from "zod";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const categorySchema = z.object({
    name: z.string().min(3, "Category name must be at least 3 characters"),
    image: z
        .any()
        .optional()
        .refine((file) => {
            if (!file) return true;
            if (typeof File === "undefined") return true;
            return file?.type?.startsWith("image/");
        }, "Invalid File")
        .refine((file) => {
            if (!file) return true;
            return ACCEPTED_TYPES.includes(file.type);
        }, "Only JPEG, JPG, PNG, WEBP allowed")
        .refine((file) => {
            if (!file) return true;
            return file.size <= MAX_FILE_SIZE;
        }, "Max file size is 4MB"),
    isActive: z.boolean().optional(),
});

export const productSchema = z.object({
    name: z.string().min(4, "Name is too short"),
    category: z.string().min(1, "Category is required"),
    price: z.coerce.number({ invalid_type_error: "Price must be a number" }).min(1, "Price is required"),
    packSize: z.coerce.number({ invalid_type_error: "Pack size must be number" }).min(1, "Pack size required"),
    unit: z.string().min(1, "Unit is required"),
    stock: z.coerce.number({ invalid_type_error: "Stock must be a number" }).min(0, "Stock cannot be negative"),
    description: z.string().min(10, "Describe more than 20 characters"),
    offerPercent: z.coerce.number().min(0).max(60).optional().default(0),
    isActive: z.boolean().optional(),
    isFlashSale: z.boolean().optional(),
    image: z
        .any()
        .optional()
        .refine((file) => {
            if (!file) return true;
            if (typeof File === "undefined") return true;
            return file?.type?.startsWith("image/");
        }, "Invalid File")
        .refine((file) => {
            if (!file) return true;
            return ACCEPTED_TYPES.includes(file.type);
        }, "Only JPEG, JPG, PNG, WEBP allowed")
        .refine((file) => {
            if (!file) return true;
            return file.size <= MAX_FILE_SIZE;
        }, "Max file size is 4MB"),
});
