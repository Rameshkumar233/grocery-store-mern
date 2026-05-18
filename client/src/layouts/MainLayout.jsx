import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import LocationModal from "../components/LocationModal";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <LocationModal />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
