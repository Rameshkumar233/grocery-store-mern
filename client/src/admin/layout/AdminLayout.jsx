import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./SideBar";
import { useState } from "react";

export default function AdminLayout() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='flex min-w-0 bg-white'>
            <Sidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <div className='flex-1 flex flex-col min-w-0'>
                {/* Header */}
                <Header setIsOpen={setIsOpen} />

                {/* Content */}
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
