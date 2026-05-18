import { CheckCircle, Package, MapPin, XCircle } from "lucide-react";
import { useState } from "react";
import { Button, LinkButton } from "../shared/ui/Button";
import { useOrderStore } from "../store/useOrderStore";
import { Navigate } from "react-router-dom";

export default function OrderSuccess() {
    const [showCancel, setShowCancel] = useState(false);
    const { currentOrder: order } = useOrderStore();
    if (!order) return <Navigate to='/shop' />;

    const { fullName, phoneNo, address, city, zipcode, landmark } = order.shippingAddress;

    return (
        <>
            <div className='px-10 py-4 flex items-center gap-2 text-sm text-gray-500'>
                <Button
                    variant='plain'
                    className='hover:text-gray-700 px-0'
                    onClick={() => navigate("/")}>
                    Home
                </Button>
                <span>/</span>
                <Button
                    variant='plain'
                    className='hover:text-gray-700 px-0'
                    onClick={() => navigate("/profile")}>
                    My profile
                </Button>
                <span>/</span>
                <span className='font-medium text-gray-800'>Orders Success</span>
            </div>
            <div className='min-h-screen bg-[#f8fafc] flex items-center justify-center px-4'>
                <div className='w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8'>
                    {/* Success Icon */}
                    <div className='text-center mb-6'>
                        <CheckCircle
                            size={64}
                            className='text-emerald-500 mx-auto mb-3'
                        />
                        <h1 className='text-2xl font-bold text-slate-800'>Order Placed Successfully 🎉</h1>
                        <p className='text-sm text-slate-500 mt-1'>Your order is confirmed and will be delivered soon</p>
                    </div>

                    {/* Order Info */}
                    <div className='bg-slate-50 rounded-2xl p-4 mb-6 space-y-3 text-sm'>
                        <div className='flex justify-between'>
                            <span className='text-slate-500'>Order ID</span>
                            <span className='font-semibold'>{order.orderId}</span>
                        </div>

                        <div className='flex justify-between'>
                            <span className='text-slate-500'>Total Amount</span>
                            <span className='font-bold text-emerald-600'>₹{order.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-slate-500'>Payment Status</span>
                            <span className={`font-bold ${order.isPaid ? "text-emerald-600" : "text-red-600"}`}>{order.isPaid ? "Paid" : "Pending"}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-slate-500'>Payment Method</span>
                            <span className='font-bold text-emerald-600'>{order.paymentMethod}</span>
                        </div>

                        <div className='text-slate-600'>
                            <div className='flex flex-col gap-2'>
                                <h4 className='flex items-center gap-2 text-lg font-bold'>
                                    <MapPin size={16} />
                                    {fullName}
                                </h4>
                                <span className='text-md'>
                                    {address},{landmark && landmark}
                                </span>
                                <span className='text-md'>
                                    {city} - {zipcode}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className='flex gap-3'>
                        <LinkButton
                            to='/orders'
                            className='flex-1'
                            variant='outline'>
                            <Package size={16} /> View Orders
                        </LinkButton>
                        <Button
                            onClick={() => setShowCancel(true)}
                            className='flex-1 text-red-500 border border-red-200 hover:bg-red-50'>
                            <XCircle size={16} /> Cancel Order
                        </Button>
                    </div>

                    {/* Cancel Modal */}
                    {showCancel && (
                        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
                            <div className='bg-white rounded-2xl p-6 w-[90%] max-w-sm'>
                                <h2 className='font-bold text-lg mb-2'>Cancel Order?</h2>
                                <p className='text-sm text-slate-500 mb-4'>This action cannot be undone.</p>
                                <div className='flex gap-3'>
                                    <Button
                                        onClick={() => setShowCancel(false)}
                                        variant='outline'
                                        className='flex-1'>
                                        No
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            // TODO: call cancel API
                                        }}
                                        className='flex-1 bg-red-500 hover:bg-red-600'>
                                        Yes, Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
