import { create } from "zustand";

const useUIStore = create((set) => ({
    isSidebarOpen: false,
    setSidebarOpen: (val) => set({ isSidebarOpen: val }),
    modal: { type: null },
    setModal: (val) => set({ modal: { type: val } }),
}));

export default useUIStore;
