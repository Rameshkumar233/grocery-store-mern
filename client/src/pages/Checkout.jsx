import { useContext, useEffect, useState } from "react";
import { ShoppingBag, CreditCard, Truck, ShieldCheck, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../validationSchemas/schema";
import { AuthContext } from "../context/AuthContext";
import { useCartStore } from "../store/useCartStore";
import { useOrderStore } from "../store/useOrderStore";
import { Button, LinkButton } from "../shared/ui/Button";
import { addressFieldConfig } from "../constants";
import FormField from "../shared/ui/FormField";
import ProductImage from "../shared/ui/ProductImage";

const Checkout = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { cart, clearCart } = useCartStore();
    const { placeOrder } = useOrderStore();
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const itemsPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const deliveryFee = itemsPrice > 199 ? 0 : 20;
    const totalPrice = itemsPrice + deliveryFee;
    const originalTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const discount = originalTotal - totalPrice;

    const hasSavedAddress = user?.address && user.address.length > 0;
    const defaultShippingAddress = Object.entries(addressFieldConfig.map((field) => [field.name, ""]));
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            shippingAddress: {
                ...defaultShippingAddress,
                state: "Tamilnadu",
                country: "India",
            },
            paymentMethod: "CARD",
        },
    });

    const selectedPayment = watch("paymentMethod");

    useEffect(() => {
        if (user) {
            reset({
                shippingAddress: {
                    fullName: user.name || "",
                    phone: user.phone || "",
                },
                paymentMethod: "CARD",
            });
        }
    }, [user, reset]);

    const handleSelectAddress = (addr) => {
        setSelectedAddressId(addr._id);
        reset({
            shippingAddress: {
                fullName: addr.fullName,
                phone: addr.phone,
                address: addr.street,
                city: addr.city,
                landmark: addr.landmark || "",
                state: addr.state,
                country: addr.country,
                postalCode: addr.zipCode,
            },
            paymentMethod: "CARD",
        });
    };

    const onPlaceOrder = async (data) => {
        try {
            const payload = {
                shippingAddress: {
                    ...data.shippingAddress,
                },
                paymentMethod: data.paymentMethod,
            };
            const success = await placeOrder(payload);
            if (success) {
                await clearCart();
                navigate("/order-success");
            }
        } catch (err) {
            console.error("Checkout failed", err);
        }
    };

    return (
        <div className='min-h-screen px-4 pt-6 pb-28 bg-gray-100'>
            <div className='flex items-center gap-2 mb-6 ml-4'>
                <ShoppingBag className='text-green-600' />
                <h1 className='text-3xl font-bold text-gray-800'>Checkout</h1>
            </div>
            <div className='flex items-center px-4 mb-6 text-sm text-gray-500'>
                <LinkButton
                    to='/'
                    className='transition hover:text-green-600'>
                    Home
                </LinkButton>
                <ChevronRight
                    size={16}
                    className='mx-2'
                />
                <LinkButton
                    to='/cart'
                    className='transition hover:text-green-600'>
                    Cart
                </LinkButton>
                <ChevronRight
                    size={16}
                    className='mx-2'
                />
                <span className='font-semibold text-gray-800'>Checkout</span>
            </div>
            <form
                onSubmit={handleSubmit(onPlaceOrder)}
                className='grid grid-cols-1 gap-10 lg:grid-cols-12'>
                {/* LEFT */}
                <div className='space-y-6 lg:col-span-8'>
                    <div className='p-8 bg-white border border-gray-100 shadow-sm rounded-3xl'>
                        <h2 className='flex items-center gap-2 mb-6 text-xl font-bold'>
                            <Truck
                                size={22}
                                className='text-green-600'
                            />
                            Shipping Information
                        </h2>
                        {/* Saved Address */}
                        {hasSavedAddress && (
                            <div className='mb-6'>
                                <h3 className='mb-3 font-semibold text-gray-700'>Select Saved Address</h3>
                                <div className='grid gap-3'>
                                    {user.address.map((addr, i) => (
                                        <div key={addr._id}>
                                            <h5 className='pb-2 font-bold'>Address {i + 1}</h5>
                                            <div
                                                onClick={() => handleSelectAddress(addr)}
                                                className={`p-4 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr._id ? "border-green-600 bg-green-50" : "border-gray-200 hover:bg-gray-50"}`}>
                                                <p className='font-bold text-gray-800 capitalize'>{addr.fullName}</p>
                                                <p className='text-gray-600 capitalize'>
                                                    {addr.street}, {addr.city}
                                                </p>
                                                <p className='text-gray-500 '>
                                                    {addr.phone} • {addr.zipCode}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className='mt-2 text-xs text-gray-400'>Or enter a new address below</p>
                            </div>
                        )}
                        {/* FORM */}
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            {addressFieldConfig.map((field) => (
                                <FormField
                                    key={`shippingAddress.${field.name}`}
                                    name={`shippingAddress.${field.name}`}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    error={errors?.shippingAddress?.[field.name]}
                                    register={register(`shippingAddress.${field.name}`)}
                                    icon={field.icon}
                                    {...field}
                                />
                            ))}
                        </div>
                    </div>
                    {/* PAYMENT */}
                    <div className='p-8 bg-white border border-gray-100 shadow-sm rounded-3xl'>
                        <h2 className='flex items-center gap-2 mb-6 text-xl font-bold'>
                            <CreditCard
                                size={22}
                                className='text-green-600'
                            />
                            Payment Method
                        </h2>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                            {["CARD", "UPI", "COD"].map((method) => (
                                <label
                                    key={method}
                                    className={`relative flex items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${selectedPayment === method ? "border-green-600 bg-green-50" : "border-gray-200 hover:bg-gray-50"}`}>
                                    <input
                                        type='radio'
                                        value={method}
                                        {...register("paymentMethod")}
                                        className='hidden'
                                    />
                                    <span className='font-bold text-gray-700'>{method === "COD" ? "Cash on Delivery" : method}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                {/* RIGHT */}
                <div className='lg:col-span-4'>
                    <div className='sticky p-8 bg-white border border-gray-100 shadow-xl rounded-3xl top-24'>
                        <h3 className='pb-4 mb-6 text-lg font-bold border-b'>Order Summary</h3>
                        <div className='pr-2 mb-6 space-y-4 overflow-y-auto max-h-64'>
                            {cart.map((item) => (
                                <div
                                    key={item.productId}
                                    className='flex items-center justify-between text-sm'>
                                    <div className='flex gap-3'>
                                        <ProductImage
                                            src={item.product.images?.[0]}
                                            size='w-12 h-12'
                                        />
                                        <div>
                                            <p className='font-bold text-gray-800'>{item.product.name}</p>
                                            <p className='text-gray-500'>Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className='font-bold'>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        {/* price breakup */}
                        <div className='space-y-3 text-sm border-b pb-5 mb-5'>
                            {/* MRP Total */}
                            <div className='flex justify-between'>
                                <span className='text-slate-500'>Items MRP</span>
                                <span>₹{originalTotal.toFixed(2)}</span>
                            </div>
                            {/* Discount */}
                            {discount > 0 && (
                                <div className='flex justify-between text-emerald-600'>
                                    <span>Discount</span>
                                    <span>-₹{discount.toFixed(2)}</span>
                                </div>
                            )}
                            {/* Items Total after discount */}
                            <div className='flex justify-between'>
                                <span className='text-slate-500'>Items Total</span>
                                <span className='font-semibold'>₹{itemsPrice.toFixed(2)}</span>
                            </div>
                            {/* Delivery */}
                            <div className='flex justify-between'>
                                <span className='text-slate-500'>Delivery Fee</span>
                                <span>{deliveryFee}</span>
                            </div>
                        </div>
                        {/* Final Total */}
                        <div className='flex justify-between text-lg font-bold'>
                            <span>Total Payable</span>
                            <span className='text-emerald-600'>₹{totalPrice.toFixed(2)}</span>
                        </div>
                        {/* Savings */}
                        {discount > 0 && <p className='text-xs text-emerald-600 mt-2'>You saved ₹{discount.toFixed(2)} on this order</p>}
                        {/* Trust */}
                        <p className='text-xs text-slate-400'>Inclusive of all taxes</p>
                        <Button
                            type='submit'
                            disabled={isSubmitting}
                            size='lg'
                            variant='primary'
                            className='w-full mt-5 disabled:opacity-70'>
                            {isSubmitting ? "Processing..." : "Place Order"}
                        </Button>
                        <p className='flex items-center justify-center gap-1 mt-4 text-xs text-center text-gray-400'>
                            <ShieldCheck size={14} /> Secure Encrypted Checkout
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
