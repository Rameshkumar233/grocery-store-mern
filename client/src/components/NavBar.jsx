import { useContext, useEffect, useState } from "react";
import { Menu, X, ShoppingCart, Store, Package, Flame, Search, LogIn, MapPin, Home } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Button, LinkButton } from "../shared/ui/Button";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [showSearchbar, setShowSearchbar] = useState(false);
    const { search, setSearch } = useProductStore();
    const { user, location, setIsLocationModalOpen, setLocation } = useContext(AuthContext);
    const { cart } = useCartStore();

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
                setShowSearchbar(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("userLocation");
        if (saved) setLocation(saved);
    }, [setLocation]);

    const navLinks = [
        { path: "/", name: "Home", icon: Home },
        { path: "/shop", name: "Shop", icon: Package },
        { path: "/offers", name: "Deals", icon: Flame },
    ];

    return (
        <>
            <nav className='z-50 bg-white border-b border-gray-300 shadow-sm sticky top-0'>
                <div className='flex items-center justify-between px-4 h-16 gap-3'>
                    {/* Left */}
                    <div className='flex items-center gap-2'>
                        <Button
                            onClick={() => setIsOpen(true)}
                            className='lg:hidden'>
                            <Menu className='w-6 h-6' />
                        </Button>
                        <LinkButton
                            to='/'
                            className='flex items-center gap-1 hover:bg-transparent'>
                            <Store className='text-blue-600 w-6 h-6' />
                            <span className='text-xl font-bold text-green-600'>FreshMart</span>
                        </LinkButton>
                        <Button
                            onClick={() => setIsLocationModalOpen(true)}
                            className='hidden md:flex items-center hover:bg-gray-200'>
                            <MapPin className='w-5 h-5 text-green-600' />
                            <span className='text-sm font-semibold ml-1 truncate max-w-28'>{location || "Select Location"}</span>
                        </Button>
                    </div>
                    {/* CENTER (Search for large) */}
                    <div className='hidden lg:flex flex-1 max-w-xl mx-4 relative'>
                        <input
                            type='text'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search products...'
                            className='w-full h-9 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                        <Search className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
                    </div>
                    {/* Right */}
                    <div className='flex items-center gap-4'>
                        {/* Desktop Links */}
                        <div className='hidden lg:flex gap-2'>
                            {navLinks.map((link) => (
                                <LinkButton
                                    key={link.name}
                                    to={link.path}
                                    nav
                                    className={() => `hover:bg-green-300/40 hover:text-green-700`}>
                                    {link.name}
                                </LinkButton>
                            ))}
                        </div>
                        {/* Mobile Search Button */}
                        <Button
                            className='lg:hidden'
                            onClick={() => setShowSearchbar((prev) => !prev)}>
                            <Search />
                        </Button>
                        {/* Cart */}
                        <LinkButton
                            to='/cart'
                            className='relative hover:text-green-600'>
                            <ShoppingCart />
                            <span className='absolute -top-1 -right-1 w-5 h-5 text-xs bg-green-800 text-white rounded-full flex items-center justify-center font-bold'>{totalItems}</span>
                        </LinkButton>
                        {/* Auth */}
                        {user ? (
                            <ProfileMenu />
                        ) : (
                            <LinkButton
                                to='/login'
                                variant='outline'>
                                Log in
                            </LinkButton>
                        )}
                    </div>
                </div>
                {/* Mobile Search Bar (below navbar) */}
                {showSearchbar && (
                    <div className='lg:hidden px-4 pb-3'>
                        <div className='relative'>
                            <input
                                type='text'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search products...'
                                className='w-full h-9 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500'
                            />
                            <Search className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
                        </div>
                    </div>
                )}
            </nav>
            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className='z-40 bg-black/40 fixed inset-0'
                />
            )}
            {/* Drawer */}
            <div className={`z-50 h-full w-72 bg-white shadow-lg fixed top-0 left-0 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='flex p-4 border-b items-center justify-between'>
                    <LinkButton
                        to='/'
                        className='flex gap-2 items-center'>
                        <Store className='text-blue-600 w-6 h-6' />
                        <span className='text-xl font-bold text-green-800'>FreshMart</span>
                    </LinkButton>
                    <button onClick={() => setIsOpen(false)}>
                        <X className='w-5 h-5 hover:text-red-600 hover:scale-110 transition' />
                    </button>
                </div>
                <div className='flex flex-col p-4 gap-4'>
                    <Button
                        onClick={() => setIsLocationModalOpen(true)}
                        className='justify-start'>
                        <MapPin className='w-5 h-5 text-green-600' />
                        Select Location
                    </Button>
                    {navLinks.map((link) => (
                        <LinkButton
                            key={link.name}
                            to={link.path}
                            className='justify-start'>
                            <link.icon /> {link.name}
                        </LinkButton>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;
