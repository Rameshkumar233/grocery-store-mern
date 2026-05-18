import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { ChevronDown, Check } from "lucide-react";

const SelectField = ({ name, control, options = [], label, placeholder = "Select option", className = "", onChange, icon: Icon }) => {
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const selected = options.find((item) => item.value === field.value);
                return (
                    <div
                        ref={wrapperRef}
                        className={`relative min-w-50 ${className}`}>
                        {/* TRIGGER */}
                        {label && <label className='text-sm font-semibold text-gray-700'>{label}</label>}
                        <button
                            type='button'
                            onClick={() => setOpen(!open)}
                            className='
                                flex h-10 w-full items-center justify-between
                                rounded-2xl border border-gray-200
                                bg-white px-4 text-sm text-gray-700
                                shadow-sm transition-all duration-200
                                hover:border-gray-300 hover:shadow-md
                                focus:outline-none focus:ring-2
                                focus:ring-black/20
                            '>
                            <div className='flex gap-x-2 items-center'>
                                {Icon && (
                                    <Icon
                                        size={18}
                                        className='text-blue-600'
                                    />
                                )}
                                <span>{selected?.label || placeholder}</span>
                            </div>

                            <ChevronDown className={`size-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>

                        {/* OPTIONS */}
                        {open && (
                            <div className='absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl'>
                                {options.map((option) => (
                                    <button
                                        key={option.value}
                                        type='button'
                                        onClick={() => {
                                            field.onChange(option.value);
                                            onChange?.(option.value);
                                            setOpen(false);
                                        }}
                                        className={`
                                            flex w-full items-center
                                            justify-between px-4 py-3
                                            text-left text-sm transition-colors
                                            hover:bg-gray-100
                                            ${field.value === option.value ? "bg-gray-100 font-semibold text-green-500" : ""}
                                        `}>
                                        {option.label}
                                        {field.value === option.value && <Check className='size-4' />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default SelectField;
