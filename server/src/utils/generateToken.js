import jwt from "jsonwebtoken";

isProduction = process.env.NODE_ENV === "production";
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("jwt", token, { httpOnly: true, secure: isProduction, sameSite: isProduction ? "none" : "lax", maxAge: 24 * 60 * 60 * 1000 });
    return token;
};
