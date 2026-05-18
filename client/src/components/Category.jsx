import { memo } from "react";
import { useCategoryStore } from "../store/useCategoryStore";
import { Skeleton } from "../shared/states/Skeletons";
import { Button } from "../shared/ui/Button";
import ProductImage from "../shared/ui/ProductImage";

const Category = memo(() => {
    const { categories, loading, error, setCategory, selectedCategory, hasFetchedCategories } = useCategoryStore();

    if (loading || (!hasFetchedCategories && categories.length === 0)) {
        return (
            <>
                <h2 className='text-2xl font-bold px-6 py-6'>Shop by category</h2>
                <div className='flex items-center gap-4 px-4'>
                    {Array(5)
                        .fill()
                        .map((_, i) => (
                            <Skeleton
                                key={i}
                                className='shrink-0 h-24 w-24 rounded-full'
                            />
                        ))}
                </div>
            </>
        );
    }
    const allCategories = [{ _id: "all", name: "All", slug: "all", image: null }, ...categories];

    return (
        <>
            <h2 className='text-2xl font-bold px-6 py-5'>Shop by category</h2>
            <div className='bg-white border-b border-stone-200 '>
                <div className='max-w-6xl md:max-w-full px-4 sm:px-6 '>
                    <div className='h-32 flex items-center gap-x-4 overflow-x-auto scroll-smooth scrollbar-hidden mb-3'>
                        {allCategories.map(({ _id, name, slug, image }) => {
                            const isActive = selectedCategory === slug;
                            return (
                                <Button
                                    key={_id}
                                    size='lg'
                                    variant='outlined'
                                    onClick={() => setCategory(slug)}
                                    aria-pressed={isActive}
                                    className={`shrink-0 flex flex-col justify-center gap-1 transition-all duration-200 hover:bg-transparent ${isActive && "text-emerald-600 scale-115"}`}>
                                    <ProductImage
                                        src={image}
                                        size='w-16 h-16'
                                        className={`rounded-full transition ${isActive ? "border-green-500" : "border-gray-300 hover:scale-105"}`}
                                    />
                                    <span className={`font-medium text-center ${isActive ? "text-green-600" : "text-gray-600"}`}>{name}</span>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
            {error && (
                <div
                    key='error'
                    className='text-center py-4 text-red-500'>
                    Error loading categories: {error}
                    <Button
                        onClick={fetchCategories}
                        variant='outline'
                        size='sm'
                        className='ml-4'>
                        Retry
                    </Button>
                </div>
            )}
        </>
    );
});

export default Category;
