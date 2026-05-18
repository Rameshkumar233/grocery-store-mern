import { useEffect, useMemo, useState } from "react";
import { useCategoryStore } from "../store/useCategoryStore";
import { useProductStore } from "../store/useProductStore";
import { SkeletonGrid } from "../shared/states/Skeletons";
import { LinkButton } from "../shared/ui/Button";
import ProductCard from "./ProductCard";
import EmptyState from "../shared/states/EmptyState";

const Products = ({ layout = "home", sort, category, loadingFilter }) => {
    const { products, loading, error, hasFetchedProducts, search } = useProductStore();

    const [visibleCount, setVisibleCount] = useState(10);
    const isHome = layout === "home";
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // CATEGORY
        if (category && category !== "all") {
            filtered = filtered.filter((p) => p.category?.slug === category);
        }

        // SEARCH
        if (search) {
            filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
        }

        // SORT
        const getFinalPrice = (p) => {
            return p.price - (p.price * p.offerPercent) / 100;
        };

        if (sort === "priceLow") {
            filtered.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
        } else if (sort === "priceHigh") {
            filtered.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
        } else {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return filtered;
    }, [products, category, search, sort]);

    const visibleProducts = filteredProducts.length > 10 ? filteredProducts.slice(0, visibleCount) : filteredProducts;

    const loadMore = () => setVisibleCount((prev) => prev + 10);

    if (loading || (!hasFetchedProducts && products.length === 0)) {
        return (
            <div className='mt-6'>
                <SkeletonGrid
                    layout
                    count={layout !== "home" && 6}
                />
            </div>
        );
    }

    if (error) {
        return (
            <div
                key='error'
                className='text-center py-4 text-red-500'>
                Error loading products: {error}
                <Button
                    onClick={fetchProducts}
                    variant='outline'
                    size='sm'
                    className='ml-4'>
                    Retry
                </Button>
            </div>
        );
    }
    if (filteredProducts.length === 0) {
        return;
    }

    return (
        <div className={`bg-linear-to-br from-gray-100 via-green-50 to-gray-200  py-5 rounded-xl ${loadingFilter ? "opacity-30 scale-95" : "opacity-100 scale-100"}`}>
            {visibleProducts.length === 0 ? (
                <EmptyState description={`No products found ${category !== "all" && "on this category"}`} />
            ) : (
                <>
                    <div
                        className={`gap-4 px-6 sm:px-4  ${isHome ? "flex sm:grid sm:grid-cols-4 lg:grid-cols-6 sm:overflow-visible overflow-x-scroll snap-x snap-mandatory custom-scrollbar" : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
                        {visibleProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                        {isHome && (
                            <LinkButton
                                to={`/shop?category=${category ?? category.slug}`}
                                className='min-w-45 shrink-0 sm:hidden'>
                                View All
                            </LinkButton>
                        )}
                    </div>
                    <div className='text-center'>
                        <LinkButton
                            variant='outline'
                            onClick={() => !isHome && loadMore()}
                            to={`/shop?category=${category ?? category.slug}`}
                            className='hidden sm:inline-flex'>
                            {isHome ? "View More" : "Load More"}
                        </LinkButton>
                    </div>
                </>
            )}
        </div>
    );
};
export default Products;
