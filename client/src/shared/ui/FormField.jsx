import { useState } from "react";
import { ChevronDown, EyeIcon, EyeOffIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

const FormField = ({ name, type = "text", label, register, error, options = [], showPlaceholder, placeholder, className = "", icon: Icon, variant = "user", splitIcon = false, ...props }) => {
    const inputFieldType = ["text", "email", "password", "number", "search"];
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const baseStyle = "w-full px-4 py-2.5 rounded-lg text-sm transition-all duration-200 outline-none focus:ring-2 disabled:cursor-not-allowed  disabled:opacity-50";

    const variants = {
        user: "border border-gray-300 focus:ring-green-500/20 focus:border-green-600 hover:border-gray-400",
        admin: `h-10 rounded-2xl
        border border-gray-200
        bg-white/80
        backdrop-blur-sm
        px-4
        text-sm
        text-gray-700
        shadow-sm
        transition-all duration-200
        hover:border-gray-300
        hover:shadow-md
        focus:border-black/30
        focus:ring-4
        focus:ring-black/10
        outline-none`,
    };

    const errorStyle = error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "";

    return (
        <div className='flex flex-col gap-2 w-full'>
            {/* Label */}
            {label && type !== "checkbox" && <label className='text-sm font-semibold text-gray-700'>{label}</label>}
            <div className='relative'>
                {Icon && (
                    <div className={`absolute left-0 top-0 p-3 h-full z-20 w-10 text-gray-600 ${splitIcon ? "border-r border-gray-300" : ""}`}>
                        <Icon size={18} />
                    </div>
                )}
                {/* Input types */}
                {inputFieldType.includes(type) && (
                    <>
                        <input
                            id={name}
                            type={isPassword && showPassword ? "text" : type}
                            placeholder={placeholder}
                            {...register}
                            {...props}
                            className={twMerge(`
                            ${baseStyle}
                            ${variants[variant]}
                            ${Icon ? "pl-14" : ""}
                            ${errorStyle}
                            ${className}`)}
                        />
                        {isPassword && (
                            <button
                                type='button'
                                onClick={togglePasswordVisibility}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700'
                                aria-label={showPassword ? "Hide password" : "Show password"}>
                                {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
                            </button>
                        )}
                    </>
                )}
                {/* Textarea */}
                {type === "textarea" && (
                    <textarea
                        id={name}
                        {...register}
                        placeholder={placeholder}
                        className={twMerge(`
                        ${baseStyle} 
                        ${variants[variant]} 
                        ${errorStyle} 
                        ${className}`)}
                        {...props}
                    />
                )}
                {/* Checkbox */}
                {type === "checkbox" && (
                    <label className='flex items-center gap-2 text-sm text-gray-700 mt-1'>
                        <input
                            type='checkbox'
                            {...register}
                            className='w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500'
                        />
                        {label}
                    </label>
                )}
            </div>

            {/* Error */}
            {error && <p className='text-red-500 text-xs mt-0.5'>{error.message}</p>}
        </div>
    );
};

export default FormField;
