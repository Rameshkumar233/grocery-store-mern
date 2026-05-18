import { memo, useEffect, useMemo, useState } from "react";
import { ImageOff } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ar } from "zod/v4/locales";

const ProductImage = ({ src, alt, size = "w-32 h-32", className = "" }) => {
    const imagePath = src ? src.trim() : null;
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(!!imagePath);
    return (
        <div className={twMerge("bg-slate-50 rounded-xl shrink-0 flex items-center justify-center overflow-hidden border-2 border-gray-300/70 relative", size, className)}>
            {imagePath && !hasError ? (
                <>
                    {isLoading && (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='rounded-full h-8 w-8 border-b-2 border-gray-400 animate-spin'></div>
                        </div>
                    )}
                    <img
                        loading='lazy'
                        src={imagePath}
                        alt={alt}
                        onError={() => {
                            setHasError(true);
                            setIsLoading(false);
                        }}
                        onLoad={() => setIsLoading(false)}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
                    />
                </>
            ) : (
                <div className='flex items-center justify-center w-full h-full text-gray-400'>
                    <ImageOff size={28} />
                </div>
            )}
        </div>
    );
};

export default memo(ProductImage);
