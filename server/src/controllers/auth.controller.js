import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser?.email === email) {
            return res.status(409).json({ message: "User already exists" });
        }
        if (existingUser?.phone) {
            return res.status(409).json({ message: "Mobile number already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
        });
        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                    role: newUser.role,
                },
                message: "User registered Successfully ",
            });
        } else {
            res.status(400).json({ success: false, message: "Invalid user data" });
        }
    } catch (err) {
        console.log("Signup error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "All fields are required" });
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        if (user.status === "deleted") {
            return res.status(403).json({
                message: "Account has been deleted",
            });
        }
        if (user.status === "blocked") {
            return res.status(403).json({
                message: "Account is blocked by admin",
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        await User.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });
        generateToken(user._id, res);
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
            message: "Logged In Successfully",
        });
    } catch (err) {
        console.log("Login error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true });
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (err) {
        console.log("Logout error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        if (req.user.role === "admin") {
            return res.status(403).json({
                message: "Admin account cannot be deleted",
            });
        }
        await Cart.findOneAndDelete({ user: userId });

        await User.findByIdAndUpdate(userId, { status: "deleted" });
        res.clearCookie("token");
        res.json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (err) {
        console.log("Failed to delete account:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const checkAuth = (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (err) {
        console.log("Checking auth error:", err.message);
        res.status(500).json({ message: "Internal server Error" });
    }
};
