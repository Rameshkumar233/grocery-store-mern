import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
    {
        packSize: {
            type: Number, // 500, 1, etc.
            required: true,
        },

        unit: {
            type: String, // g, kg, ml, piece
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        offerPrice: {
            type: Number,
            required: true,
        },

        stock: {
            type: Number,
            default: 0,
        },
    },
    { _id: true },
);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        description: { type: String, required: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        // variant: [variantSchema],
        price: { type: Number, required: true, default: 0 },
        stock: { type: Number, required: true, default: 0 },
        packSize: { type: Number, required: true },
        unit: { type: String, required: true },
        image: { type: String, default: "" },
        isActive: { type: Boolean, default: true },
        isFlashSale: { type: Boolean, default: false },
        offerPercent: { type: Number, default: 0 },
    },
    { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
