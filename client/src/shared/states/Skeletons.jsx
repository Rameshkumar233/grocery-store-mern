import { twMerge } from "tailwind-merge";

export const Skeleton = ({ className = "" }) => {
    return <div className={twMerge(`animate-pulse bg-gray-300 rounded-xl ${className}`)} />;
};

export const SkeletonGrid = ({ count = 8, layout }) => {
    return (
        <div className={`grid gap-4 px-4 ${layout === "home" ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-5" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className='bg-white border border-gray-300 rounded-2xl p-4 shadow-sm animate-pulse'>
                    <Skeleton className='w-full h-36 mb-3' />
                    <Skeleton className='w-full h-5 mb-2' />
                    <Skeleton className='h-4 w-5/6 mb-2' />
                    <Skeleton className='h-4 w-3/4 mb-1' />
                    <Skeleton className='h-4 w-3/5 mb-1' />
                </div>
            ))}
        </div>
    );
};
