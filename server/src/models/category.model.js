import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            lowercase: true,
            unique: true,
        },
        image: {
            type: String,
            default: "",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

// Auto-generate slug from name
// categorySchema.pre("save", function (next) {
//     if (!this.slug && this.name) {
//         this.slug = this.name
//             .toLowerCase()
//             .replace(/ /g, "-")
//             .replace(/[^\w-]+/g, "");
//     }
//     next();
// });

const Category = mongoose.model("Category", categorySchema);

export default Category;
