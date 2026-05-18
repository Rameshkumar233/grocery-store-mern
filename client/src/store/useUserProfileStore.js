import { create } from "zustand";
import { deleteAddressAPI, saveAddressAPI, updateProfileAPI } from "../services/userProfileService";

export const useUserProfileStore = create((get, set) => ({
    updateProfile: async (payload) => {
        try {
            const data = await updateProfileAPI(payload);
            return data;
        } catch (error) {
            console.error("Failed updating profile", error);
        }
    },

    saveAddress: async (payload) => {
        try {
            const data = await saveAddressAPI(payload);
            return data;
        } catch (error) {
            console.error("Updating address failed", error);
        }
    },
    deleteAddress: async (id) => {
        try {
            const data = await deleteAddressAPI(id);
            return data;
        } catch (error) {
            console.error("Deleting address failed", error);
        }
    },
}));
