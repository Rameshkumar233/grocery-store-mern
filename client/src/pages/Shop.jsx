import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";

import { useProductStore } from "../store/useProductStore";
import { useCategoryStore } from "../store/useCategoryStore";

import { Button } from "../shared/ui/Button";
import SelectField from "../shared/ui/SelectField";
import ProductImage from "../shared/ui/ProductImage";
import Products from "../components/Products";

const ShopPage = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterLoading, setFilterLoading] = useState(false);

    const { search, setSearch } = useProductStore();

    const { categories } = useCategoryStore();

    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get("category") || "all";

    const sort = searchParams.get("sort") || "latest";

    const { control, setValue } = useForm({
        defaultValues: {
            sort,
            category,
        },
    });

    const updateParams = (key, value) => {
        setFilterLoading(true);
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all" && value !== "latest") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        setSearchParams(params);
        setTimeout(() => {
            setFilterLoading(false);
        }, 300);
    };

    useEffect(() => {
        setValue("sort", sort);
        setValue("category", category);
    }, [sort, category, setValue]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setFilterOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const allCategories = useMemo(() => {
        return [
            {
                _id: "all",
                name: "All",
                slug: "all",
                image: null,
            },
            ...categories,
        ];
    }, [categories]);

    return (
        <div className='min-h-screen bg-gray-50 px-4 py-6 md:px-8'>
            {/* HEADER */}
            <div className='mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
                <div>
                    <h1 className='text-2xl font-semibold text-gray-800 md:text-3xl'>Shop</h1>
                    <p className='mt-1 text-sm text-gray-500'>Browse fresh grocery products</p>
                </div>
                {/* FILTERS */}
                <div className='flex flex-col gap-3 sm:flex-row lg:w-auto'>
                    {/* MOBILE FILTER BTN */}
                    <Button
                        onClick={() => setFilterOpen(true)}
                        className='
                            h-10 border border-gray-200 shadow-sm
                            bg-white px-4 transition hover:bg-gray-200
                            md:hidden'>
                        <SlidersHorizontal size={18} />
                    </Button>
                    {/* SORT */}
                    <SelectField
                        name='sort'
                        control={control}
                        options={[
                            { label: "Latest", value: "latest" },
                            { label: "Price: Low → High", value: "priceLow" },
                            { label: "Price: High → Low", value: "priceHigh" },
                        ]}
                        placeholder='Sort'
                        className='sm:w-55'
                        onChange={(value) => updateParams("sort", value)}
                    />
                    {/* SEARCH */}
                    <input
                        type='text'
                        placeholder='Search products...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='
                            h-10 w-full rounded-xl border border-gray-200
                            bg-white px-4 text-sm text-gray-700
                            shadow-sm outline-none transition-all
                            placeholder:text-gray-400
                            focus:border-green-500
                            focus:ring-2 focus:ring-green-500/20
                            sm:w-64'
                    />
                </div>
            </div>
            <div className='flex gap-6'>
                {/* SIDEBAR */}
                <aside
                    className='
                        sticky top-24 hidden h-fit w-56
                        rounded-2xl bg-white p-4
                        shadow-sm md:block'>
                    <h2 className='mb-4 text-lg font-semibold text-gray-800'>Categories</h2>
                    <div className='flex flex-col gap-2'>
                        {allCategories.map((cat) => (
                            <Button
                                key={cat._id}
                                size='lg'
                                variant={category === cat.slug ? "primary" : "plain"}
                                onClick={() => updateParams("category", cat.slug)}
                                className={`
                                    w-full justify-start gap-3 rounded-xl px-3 py-2
                                    ${category === cat.slug ? "bg-green-600 text-white hover:bg-green-700" : "hover:bg-green-50"}`}>
                                <ProductImage
                                    size='w-8 h-8'
                                    src={cat.image}
                                    className='rounded-full'
                                />
                                <span className='truncate'>{cat.name}</span>
                            </Button>
                        ))}
                    </div>
                </aside>
                {/* PRODUCTS */}
                <main className='flex-1'>
                    <Products
                        layout='shop'
                        category={category}
                        sort={sort}
                        loadingFilter={filterLoading}
                    />
                </main>
            </div>
            {/* MOBILE DRAWER */}
            {filterOpen && (
                <div className='fixed inset-0 z-50 flex bg-black/40 md:hidden'>
                    <div className='h-full w-72 overflow-y-auto bg-white p-4 shadow-xl'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h2 className='text-lg font-semibold'>Categories</h2>
                            <button
                                onClick={() => setFilterOpen(false)}
                                className='text-sm text-gray-500 hover:text-black'>
                                Close
                            </button>
                        </div>
                        <div className='flex flex-col gap-2'>
                            {allCategories.map((cat) => (
                                <Button
                                    key={cat._id}
                                    onClick={() => {
                                        updateParams("category", cat.slug);

                                        setFilterOpen(false);
                                    }}
                                    className={`w-full justify-start gap-3 rounded-xl px-3 py-2 ${category === cat.slug ? "bg-green-600 text-white hover:bg-green-700" : "hover:bg-green-50"}`}>
                                    <ProductImage
                                        size='w-8 h-8'
                                        src={cat.image}
                                        className='rounded-full'
                                    />
                                    <span className='truncate'>{cat.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div
                        className='flex-1'
                        onClick={() => setFilterOpen(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default ShopPage;
