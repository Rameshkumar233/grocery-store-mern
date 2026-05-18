import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, phone } = req.body;
        const existingUser = await User.findOne({ phone });
        if (!existingUser && existingUser._id.toString() !== userId) return res.status(400).json({ message: "Phone already in use" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (name) user.name = name;
        if (phone) user.phone = phone;

        await user.save();

        res.status(200).json({ message: "Profile updated", user });
    } catch (err) {
        console.log("Failed to update profile", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const saveAddress = async (req, res) => {
    try {
        const { addressId, ...addressData } = req.body;

        let user;
        if (!addressId) {
            user = await User.findByIdAndUpdate(
                req.user?._id,
                {
                    $push: { addresses: addressData },
                },
                { returnDocument: "after" },
            );
        } else {
            const setObject = {};
            for (let key in addressData) {
                setObject[`addresses.$.${key}`] = addressData[key];
            }
            user = await User.findOneAndUpdate({ _id: req.user._id, "addresses._id": addressId }, { $set: setObject }, { returnDocument: "after" });
        }
        if (!user) return res.status(404).json({ message: "User or address not found" });
        res.status(200).json({ message: "Address saved", user });
    } catch (err) {
        console.log("Failed to save address", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(req.user?._id, { $pull: { addresses: { _id: id } } }, { returnDocument: "after" });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Address deleted successfully", updatedUser });
    } catch (err) {
        console.log("Failed to delete address", err.message);
        res.status(500).json({ message: "Server error" });
    }
};
