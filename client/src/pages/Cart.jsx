import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Truck, ShieldCheck, ChevronRight } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { Button, LinkButton } from "../shared/ui/Button";
import ProductImage from "../shared/ui/ProductImage";

const Cart = () => {
    const { cart, increaseQty, decreaseQty, removeItem } = useCartStore();
    if (!cart) {
        return <div className='p-10 text-center'>Loading cart...</div>;
    }

    const itemsPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const deliveryFee = itemsPrice > 199 ? 0 : 20;
    const totalPrice = itemsPrice + deliveryFee;

    return (
        <div className='min-h-screen bg-[#f8fafc] pb-28'>
            {/*  Top Nav */}
            <nav className='p-6 mx-auto max-w-7xl'>
                <LinkButton
                    to='/shop'
                    className='inline-flex items-center gap-2 text-sm transition text-slate-500 hover:text-emerald-600'>
                    <ArrowLeft size={16} />
                    Continue Shopping
                </LinkButton>
            </nav>
            <div className='flex items-end justify-between mb-6 px-12'>
                <h1 className='flex items-center gap-3 text-2xl font-bold text-slate-800'>
                    Your Cart
                    <span className='text-xl text-emerald-600'>
                        ({cart.length} {cart.length === 1 ? "item" : "items"})
                    </span>
                </h1>
            </div>
            <div className='grid grid-cols-1 gap-8 px-6 mx-auto max-w-7xl lg:grid-cols-3'>
                {/* LEFT: CART ITEMS */}
                <div className='lg:col-span-2'>
                    <div className='space-y-4'>
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <div
                                    key={item.productId}
                                    className='flex items-center gap-4 p-3 bg-white border shadow-sm rounded-2xl border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all'>
                                    {/* Image */}
                                    <ProductImage
                                        src={item.product.images?.[0]}
                                        size='w-28 h-28'
                                    />
                                    {/* Info */}
                                    <div className='grow'>
                                        <h3 className='text-base font-semibold text-slate-800 line-clamp-1'>{item.product.name}</h3>
                                        <p className='text-sm text-slate-400'>
                                            {item.product.packSize}
                                            {item.product.unit}
                                        </p>
                                        <div className='flex items-center gap-6 mt-3'>
                                            {/* Qty */}
                                            <div className='flex items-center overflow-hidden bg-white border rounded-full border-slate-200'>
                                                <Button
                                                    onClick={() => decreaseQty(item.productId)}
                                                    disabled={item.quantity === 1}
                                                    className='p-2 transition hover:bg-slate-200'>
                                                    <Minus size={14} />
                                                </Button>
                                                <span className='px-4 font-bold text-slate-700'>{item.quantity}</span>
                                                <Button
                                                    onClick={() => increaseQty(item.productId)}
                                                    className='p-2 transition hover:bg-slate-200'>
                                                    <Plus size={14} />
                                                </Button>
                                            </div>
                                            {/* Remove */}
                                            <Button
                                                onClick={() => removeItem(item.productId)}
                                                className='flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition'>
                                                <Trash2 size={16} /> Remove
                                            </Button>
                                        </div>
                                    </div>
                                    {/* Price */}
                                    <div className='flex flex-col justify-between h-full items-end'>
                                        <p className='text-xl font-extrabold text-slate-800'>₹{(item.price * item.quantity).toFixed(2)}</p>
                                        <p className='text-xs font-medium text-slate-400'>₹{item.price} / unit</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex items-center justify-center min-w-xs px-4 md:px-0'>
                                <div className='py-20 text-center bg-white border-2 border-dashed rounded-3xl w-full border-slate-200'>
                                    <ShoppingBag
                                        size={64}
                                        className='mx-auto mb-4 text-slate-300'
                                    />
                                    <h2 className='text-2xl font-bold text-slate-400'>Your cart is empty</h2>
                                    <LinkButton
                                        to='/shop'
                                        className='inline-block px-6 py-2 mt-4 text-white rounded-full bg-emerald-600'>
                                        Start Shopping
                                    </LinkButton>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* RIGHT: SUMMARY */}
                {cart.length > 0 && (
                    <aside className='lg:col-span-1'>
                        <div className='sticky p-6 bg-white border shadow-lg rounded-2xl top-8 border-slate-200'>
                            <h2 className='mb-6 text-xl font-bold text-slate-800'>Order Summary</h2>
                            {/* Free Delivery Progress */}
                            {cart && itemsPrice < 199 && (
                                <div className='mb-4'>
                                    <p className='mb-2 text-xs text-center text-orange-600'>Add ₹{(199 - itemsPrice).toFixed(2)} more for FREE delivery</p>
                                    <div className='w-full h-2 mt-3 overflow-hidden rounded-full bg-slate-100'>
                                        <div
                                            className='h-full bg-linear-to-r from-emerald-300 to-emerald-600 transition-all duration-500'
                                            style={{
                                                width: `${Math.min((itemsPrice / 199) * 100, 100)}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                            {/* Price Breakdown */}
                            <div className='space-y-3 text-sm border-b pb-5 mb-5'>
                                {/* Items Total (already discounted) */}
                                <div className='flex justify-between'>
                                    <span className='text-slate-500'>Items Total</span>
                                    <span className='font-semibold text-slate-800'>₹{itemsPrice.toFixed(2)}</span>
                                </div>
                                {/* Delivery */}
                                <div className='flex justify-between'>
                                    <span className='text-slate-500 flex items-center gap-2'>
                                        Delivery <Truck size={14} />
                                    </span>
                                    <span className={deliveryFee === 0 ? "text-emerald-600 font-semibold" : ""}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                                </div>
                            </div>
                            {/* Total */}
                            <div className='flex justify-between text-lg font-bold'>
                                <span>Total</span>
                                <span className='text-emerald-600'>₹{totalPrice.toFixed(2)}</span>
                            </div>
                            <LinkButton
                                to='/checkout'
                                className='hidden w-full mt-5 bg-blue-600 lg:flex hover:bg-blue-500'
                                variant='primary'
                                size='lg'>
                                Go to Checkout <ChevronRight size={20} />
                            </LinkButton>
                            {/* Trust Badge */}
                            <div className='flex items-center gap-3 p-3 mt-6 text-xs text-blue-700 bg-blue-50 rounded-xl'>
                                <ShieldCheck size={18} />
                                <span>Secure payment & quality guarantee</span>
                            </div>
                        </div>
                    </aside>
                )}
            </div>
            {cart.length > 0 && (
                <div className='fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:hidden'>
                    <LinkButton
                        to='/checkout'
                        className='w-full font-bold'
                        variant='primary'
                        size='lg'
                        aria-label={`Checkout and pay ₹${totalPrice.toFixed(2)}`}>
                        Checkout • ₹{totalPrice.toFixed(2)}
                    </LinkButton>
                </div>
            )}
        </div>
    );
};

export default Cart;
