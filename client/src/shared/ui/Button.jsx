import { forwardRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const base = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";

const variants = {
    plain: "bg-transparent text-gray-700",
    primary: "bg-green-600 text-white hover:bg-green-700",
    outline: "border-2 border-green-600 text-green-600 hover:bg-green-700 hover:text-white",
};
const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
};

const getClassName = ({ variant, size, className }) => twMerge(base, variants[variant] ?? variants.plain, sizes[size] ?? sizes.sm, className);

export const LinkButton = forwardRef(({ children, to, nav = false, size = "sm", variant = "plain", className, ...props }, ref) => {
    if (nav) {
        return (
            <NavLink
                to={to}
                ref={ref}
                className={({ isActive }) => twMerge(base, sizes[size], isActive && "bg-green-600 text-white shadow-inner scale-95", className(isActive))}
                {...props}>
                {children}
            </NavLink>
        );
    }

    return (
        <Link
            ref={ref}
            to={to}
            className={getClassName({ variant, size, className })}
            {...props}>
            {children}
        </Link>
    );
});

export const Button = forwardRef(({ children, onClick, variant = "plain", size = "sm", className = "", type = "button", disabled = false, ...props }, ref) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            ref={ref}
            className={getClassName({ variant, size, className })}
            {...props}>
            {children}
        </button>
    );
});

Button.displayName = "Button";
LinkButton.displayName = "LinkButton";
