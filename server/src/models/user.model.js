import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String },
    landmark: { type: String },
});
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        status: {
            type: String,
            enum: ["active", "blocked", "deleted"],
            default: "active",
        },
        lastLogin: {
            type: Date,
            default: null,
        },
        addresses: [addressSchema],
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
