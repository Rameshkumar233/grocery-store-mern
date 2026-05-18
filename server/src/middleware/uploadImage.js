import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const categoryStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "grocery/categories",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

const productStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "grocery/products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

export const uploadCategoryImage = multer({ storage: categoryStorage }).single("image");
export const uploadProductImage = multer({ storage: productStorage }).single("image");
