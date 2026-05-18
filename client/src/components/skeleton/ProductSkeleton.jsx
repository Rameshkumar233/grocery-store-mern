const ProductCardSkeleton = () => {
    return (
        <div className='bg-white border border-gray-200 rounded-2xl p-4 shadow-sm animate-pulse'>
            <div className='h-36 bg-gray-200 rounded-xl mb-3' />

            <div className='h-4 bg-gray-200 rounded w-3/4 mb-2' />

            <div className='h-3 bg-gray-200 rounded w-full mb-1' />
            <div className='h-3 bg-gray-200 rounded w-5/6 mb-2' />

            <div className='h-3 bg-gray-200 rounded w-1/3 mb-3' />

            <div className='flex items-center justify-between mt-4'>
                <div className='h-5 bg-gray-200 rounded w-1/4' />
                <div className='h-8 bg-gray-200 rounded w-16' />
            </div>
        </div>
    );
};

const ProductSkeleton = ({ count = 10, layout = "home" }) => {
    return (
        <div className='bg-linear-to-br from-gray-100 via-green-50 to-gray-200 min-h-screen py-6'>
            <div className={`grid gap-4 px-4 ${layout === "home" ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-5" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
                {Array.from({ length: count }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default ProductSkeleton;
