import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { Button } from "../shared/ui/Button";
import ProductImage from "../shared/ui/ProductImage";

const ProductCard = ({ product, compact = false }) => {
    const navigate = useNavigate();
    const addToCart = useCartStore((state) => state.addToCart);
    const increaseQty = useCartStore((state) => state.increaseQty);
    const decreaseQty = useCartStore((state) => state.decreaseQty);
    const offerPrice = Math.floor(product.price - (product.price * product.offerPercent) / 100);

    const cartItem = useCartStore((state) => state.cart.find((item) => item.product._id === product._id));

    const hasDiscount = product.offerPercent > 0;
    // console.count("Product Card");

    return (
        <div
            className={`group bg-white border border-gray-200 rounded-2xl flex flex-col justify-center transition duration-300 hover:shadow-xl hover:border-stone-300 ${compact ? "w-40 p-2 shrink-0" : "p-4 min-w-45 mb-5 sm:min-w-0 sm:w-full"}`}>
            {/* IMAGE */}
            <div
                className={`relative aspect-square bg-gray-100 rounded-xl overflow-hidden ${compact ? "mb-2" : "mb-3"}`}
                onClick={() => navigate(`/products/${product._id}`)}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/products/${product._id}`)}>
                {hasDiscount && <span className='absolute top-2 left-2 font-bold bg-lime-700 text-white text-[10px] px-2 py-1 rounded z-10'>{product.offerPercent}% OFF</span>}
                <ProductImage
                    src={product.image}
                    size='w-full h-full'
                    style='border-stone-200 group-hover:border-stone-300'
                />
            </div>
            {/* INFO */}
            <div className={`flex-1 ${compact ? "space-y-0.5" : "space-y-1"}`}>
                <h3 className={`font-semibold text-gray-800 ${compact ? "line-clamp-1" : "line-clamp-2"}`}>{product.name}</h3>
                {!compact && <p className='text-sm text-gray-500'>{product.description}</p>}
                {!compact && (
                    <p className='text-sm text-gray-400 font-medium'>
                        Net: {product.packSize} {product.unit}
                    </p>
                )}
                {!compact && product.stock < 10 && <p className='text-[11px] text-red-500 font-semibold'>Only few left</p>}
            </div>
            {/* PRICE + CART */}
            <div className='flex items-center justify-between mt-3'>
                <div className='flex flex-col leading-tight'>
                    <span className='font-bold text-gray-900 text-sm'>₹{offerPrice}</span>
                    {!compact && hasDiscount && <span className='text-[11px] text-gray-400 line-through'>₹{product.price}</span>}
                </div>
                {!cartItem ? (
                    <Button
                        onClick={() => addToCart(product)}
                        variant='outline'
                        className='h-8 font-semibold'>
                        {!compact ? "Add" : <Plus size={16} />}
                    </Button>
                ) : (
                    <div className='flex items-center h-8 border-2 border-green-200 rounded-lg overflow-hidden'>
                        <Button
                            onClick={() => decreaseQty(product._id)}
                            className='px-2'>
                            <Minus size={14} />
                        </Button>
                        <span className='px-2 text-sm font-bold'>{cartItem.quantity}</span>
                        <Button
                            onClick={() => increaseQty(product._id)}
                            className='px-2'>
                            <Plus size={14} />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(ProductCard);
