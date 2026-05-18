import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../shared/ui/Button";

const LocationModal = () => {
    const { isLocationModalOpen, setIsLocationModalOpen, setLocation } = useContext(AuthContext);
    const [tempLocation, setTempLocation] = useState("");

    if (!isLocationModalOpen) {
        return null;
    }

    const handleSelect = (city) => {
        setLocation(city);
        setIsLocationModalOpen(false);
    };

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4'>
            {/* Backdrop */}
            <div
                className='absolute inset-0 bg-gray-900/60 backdrop-blur-sm'
                onClick={() => setIsLocationModalOpen(false)}></div>

            {/* Modal Content */}
            <div className='relative bg-white w-full max-w-md rounded-4xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-black text-gray-900'>Change Location</h2>
                    <button
                        onClick={() => setIsLocationModalOpen(false)}
                        className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors'>
                        ✕
                    </button>
                </div>

                {/* FormField Area */}
                <div className='space-y-4'>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Enter area or pincode...'
                            className='w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all'
                            onChange={(e) => setTempLocation(e.target.value)}
                        />
                        <Button
                            onClick={() => handleSelect(tempLocation)}
                            className='absolute right-2 top-2'>
                            Set
                        </Button>
                    </div>

                    {/* Quick Select Cities */}
                    <div className='pt-4'>
                        <p className='text-xs font-black text-gray-400 uppercase tracking-widest mb-3'>Popular Cities</p>
                        <div className='flex flex-wrap gap-2'>
                            {["Mumbai", "Delhi", "Bangalore", "Pune"].map((city) => (
                                <button
                                    key={city}
                                    onClick={() => handleSelect(city)}
                                    className='px-4 py-2 rounded-full border border-gray-200 text-sm font-bold hover:border-green-500 hover:text-green-600 transition-all'>
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LocationModal;
