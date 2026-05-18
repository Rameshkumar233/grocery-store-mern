import { useContext, useEffect, useRef, useState } from "react";
import { User, LogOut, Settings, ShoppingCart } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Button, LinkButton } from "../shared/ui/Button";

const ProfileMenu = () => {
    const { logout } = useContext(AuthContext);
    const menuRef = useRef(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const toggleDropdown = () => setOpen(!open);

    return (
        <div
            ref={menuRef}
            className='relative'>
            {/* Profile Icon */}
            <Button
                onClick={toggleDropdown}
                variant='plain'
                className='hover:text-green-600'>
                <User />
            </Button>

            {/* Dropdown Menu */}
            {open && (
                <div className='z-50 mt-2 w-52 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl absolute right-0 flex flex-col gap-y-2 ring-1 ring-black/40'>
                    <LinkButton
                        to='/profile'
                        onClick={() => setOpen(false)}
                        variant='plain'
                        size='sm'
                        className='hover:bg-gray-900/20 rounded-t-lg rounded-b-none w-full justify-start'>
                        <User />
                        My Profile
                    </LinkButton>
                    <LinkButton
                        to='/orders'
                        onClick={() => setOpen(false)}
                        variant='plain'
                        size='sm'
                        className='hover:bg-gray-900/20 rounded-none w-full justify-start'>
                        <ShoppingCart className='w-5 h-5' /> Orders
                    </LinkButton>
                    <LinkButton
                        to='/settings'
                        onClick={() => setOpen(false)}
                        variant='plain'
                        size='sm'
                        className='hover:bg-gray-900/20 rounded-none w-full justify-start'>
                        <Settings className='w-5 h-5' /> Settings
                    </LinkButton>
                    <Button
                        onClick={async () => await logout()}
                        variant='plain'
                        size='sm'
                        className='text-red-600 hover:bg-red-700/20 rounded-b-lg rounded-t-none w-full justify-start'>
                        <LogOut className='w-5 h-5' /> Logout
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
