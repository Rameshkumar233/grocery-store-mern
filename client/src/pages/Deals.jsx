import { useEffect, useMemo } from "react";
import { Zap } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";

const Deals = () => {
    const { products, loading, fetchProducts } = useProductStore();

    useEffect(() => {
        if (!products || products.length === 0) {
            fetchProducts();
        }
    }, []);

    const deals = useMemo(() => {
        if (!products) return [];

        return products.filter((p) => (p.offerPercent && p.offerPercent >= 20) || p.isFlashSale);
    }, [products]);

    if (loading) {
        return <div className='p-6 text-gray-500 animate-pulse'>Loading deals...</div>;
    }

    return (
        <div className='w-full px-4 py-6'>
            {/* 🔥 Header (replaces SectionTitle) */}
            <div className='flex items-center gap-2 mb-6'>
                <Zap className='w-5 h-5 text-yellow-500' />
                <h1 className='text-xl font-semibold text-gray-800'>Hot Deals</h1>
            </div>
            {/* Empty state */}
            {deals.length === 0 ? (
                <div className='text-center text-gray-500 mt-10'>No deals available right now</div>
            ) : (
                /* Grid */
                <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4'>
                    {deals.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            isFlash={product.isFlashSale}
                            isFeatured={product.offerPercent >= 30}
                            variant='compact'
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Deals;
