import { useState, useRef, useEffect, useContext } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import useUIStore from "../store/useUIStore";
import { Button } from "../../shared/ui/Button";

const Header = ({ setIsOpen }) => {
    const { setSidebarOpen, isSidebarOpen } = useUIStore();
    const { logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className='h-16 bg-white backdrop-blur-md border-b border-gray-200 flex shadow-xs items-center justify-between px-4 sticky top-0 z-50 min-w-lg'>
            {/* Left */}
            <div className='flex items-center gap-3'>
                <Button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition'>
                    <Menu size={18} />
                </Button>
                <h2 className='text-lg font-semibold text-gray-800'>Dashboard</h2>
            </div>
            {/* Right*/}
            <div
                className='relative'
                ref={menuRef}>
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className='flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition'>
                    <div className='w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-sm font-semibold text-white'>A</div>
                    <span className='text-sm text-gray-700 hidden sm:block'>Admin</span>
                    <ChevronDown
                        size={16}
                        className={`transition ${open ? "rotate-180" : ""}`}
                    />
                </button>
                {/* Dropdown*/}
                {open && (
                    <div className='absolute right-0 mt-2 w-40 bg-white border border-black/30 rounded-lg shadow-md py-2'>
                        <Button
                            onClick={handleLogout}
                            className='text-left hover:bg-gray-200'>
                            Logout
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
