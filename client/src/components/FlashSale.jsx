import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "./ProductCard";

const FlashSale = () => {
    const { products } = useProductStore();
    const flashProducts = products.filter((item) => item.isFlashSale || item.offerPercent > 20);
    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setShowLeft(el.scrollLeft > 0);
    };
    const scroll = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({
            left: dir === "left" ? -200 : 200,
            behavior: "smooth",
        });
    };

    return (
        <section className='my-4 px-4 '>
            <div className='flex items-center justify-between'>
                <h2 className='flex items-center gap-2 text-2xl font-bold mb-4'>
                    <span className='flex items-center gap-1 text-yellow-600 tracking-tighter'>
                        <Zap size={20} />
                        Flash
                    </span>
                    <span className='text-gray-800'>Sale</span>
                </h2>
                <div className='flex items-center gap-4'>
                    {showLeft && (
                        <>
                            <button
                                onClick={() => scroll("left")}
                                className='z-20 text-gray-400 shadow p-2'>
                                <ArrowLeft />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className='z-20 text-gray-400 shadow p-2'>
                                <ArrowRight />
                            </button>
                        </>
                    )}

                    {/* RIGHT ARROW */}
                </div>
            </div>

            <div className='relative'>
                {/* right fade hint */}
                {showLeft && <div className='pointer-events-none absolute right-0 top-0 h-full w-8 bg-linear-to-l from-gray-200 via-white/80 rounded-l-full to-transparent z-10 ' />}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className='flex gap-4 overflow-x-auto pb-2 pr-4 scrollbar-hidden'>
                    {flashProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            compact
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;
