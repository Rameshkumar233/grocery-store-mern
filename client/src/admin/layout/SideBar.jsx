import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X, ChevronDown, Store } from "lucide-react";
import useUIStore from "../store/useUIStore";
import { navigation } from "../constants";
import { Button, LinkButton } from "../../shared/ui/Button";

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const [activeMenu, setActiveMenu] = useState(location.pathname === "/admin" ? "Dashboard" : null);

    const handleNavigation = (name) => setActiveMenu((prev) => (prev === name ? null : name));

    const activeItem = "bg-blue-900/10 text-blue-600 border-l-6 border-blue-600 font-semibold";
    const inactiveItem = "text-slate-600 hover:bg-slate-300 hover:text-slate-950";

    return (
        <>
            {/* overlay */}
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black/40 z-40 lg:hidden'
                    onClick={() => setIsOpen(false)}
                />
            )}
            {/* Sidebar */}
            <aside
                className={`w-72 lg:w-64 fixed top-0 left-0 h-full z-60 bg-slate-100 border-r border-gray-200 transition-transform duration-300 ease-in-out shadow-inner ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 opacity-20 lg:opacity-100"} lg:sticky`}>
                <div className='flex flex-col h-screen'>
                    {/* Header */}
                    <div className='h-16 flex items-center justify-between px-4'>
                        <h1 className='inline-flex items-center gap-x-2 text-lg font-bold text-green-500'>
                            <Store size={18} />
                            <span className="uppercase tracking-tighter font-['verdana']">Freshmart</span>
                            <span className='text-gray-800 tracking-normal capitalize'>Admin</span>
                        </h1>
                        <Button
                            onClick={() => setIsOpen(false)}
                            className='lg:hidden'>
                            <X size={18} />
                        </Button>
                    </div>
                    <div className='border border-gray-300 mx-15' />

                    {/* Nav links */}
                    <nav className='flex-1 px-2 py-4 space-y-1 overflow-y-auto'>
                        {navigation.map(({ name, path, icon: Icon, children }) => {
                            const isParentActive = children?.some((child) => location.pathname.startsWith(child.path));
                            const isOpen = activeMenu === name;
                            if (!children) {
                                return (
                                    <LinkButton
                                        key={name}
                                        to={path}
                                        end={path === "/admin"}
                                        nav
                                        onClick={() => handleNavigation(name)}
                                        className={(isActive) => `w-full transition bg-transparent justify-start text-md text-slate-600 ${isActive ? activeItem : inactiveItem}`}>
                                        <Icon size={20} />
                                        <span>{name}</span>
                                    </LinkButton>
                                );
                            }
                            return (
                                <div key={name}>
                                    <Button
                                        onClick={() => handleNavigation(name)}
                                        className={`w-full justify-between text-md transition ${isParentActive ? activeItem : inactiveItem}`}>
                                        <div className='flex items-center gap-3'>
                                            <Icon size={18} />
                                            <span>{name}</span>
                                        </div>
                                        <ChevronDown
                                            size={16}
                                            className={`transition ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </Button>
                                    {/* Dropdown */}
                                    {isOpen && (
                                        <div className='flex flex-col justify-center ml-6 mt-1 space-y-1 border-l border-l-slate-300'>
                                            {children.map((child) => (
                                                <LinkButton
                                                    key={child.name}
                                                    to={child.path}
                                                    end
                                                    nav
                                                    onClick={() => setIsOpen(false)}
                                                    className={(isActive) => `w-full bg-transparent text-md justify-start ${isActive ? "text-blue-600" : inactiveItem}`}>
                                                    {child.name}
                                                </LinkButton>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
