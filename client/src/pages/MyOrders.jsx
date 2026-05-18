import { useEffect } from "react";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { useOrderStore } from "../store/useOrderStore";
import { LinkButton } from "../shared/ui/Button";
import ProductImage from "../shared/ui/ProductImage";

const MyOrders = () => {
    const { orders, loading, fetchMyOrders } = useOrderStore();

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <Clock className='w-4 h-4 text-yellow-500' />;
            case "shipped":
                return <Truck className='w-4 h-4 text-blue-500' />;
            case "delivered":
                return <CheckCircle2 className='w-4 h-4 text-green-500' />;
            default:
                return <Package className='w-4 h-4 text-gray-500' />;
        }
    };

    if (loading) {
        return <div className='p-6 text-gray-500 animate-pulse'>Loading your orders...</div>;
    }

    return (
        <div className='w-full px-10 py-6'>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
                <LinkButton
                    variant='plain'
                    className='hover:text-gray-700 px-0'
                    to='/profile'>
                    My profile
                </LinkButton>
                <span>/</span>
                <span className='font-medium text-gray-800'>Orders</span>
            </div>
            {/* Header */}
            <div className='flex items-center gap-2 my-6'>
                <Package className='w-5 h-5 text-gray-700' />
                <h1 className='text-xl font-semibold text-gray-800'>My Orders</h1>
            </div>

            {/* Empty state */}
            {orders?.length === 0 ? (
                <div className='p-44 text-center text-gray-500  bg-stone-100 dow-2xl border border-gray-100 flex flex-col items-center gap-4 rounded-lg justify-center'>
                    <p>You haven’t placed any orders yet</p>
                    <LinkButton
                        size='lg'
                        variant='primary'
                        className='py-2'
                        to='/shop'>
                        Go to Shop
                    </LinkButton>
                </div>
            ) : (
                <div className='space-y-4'>
                    {orders?.map((order) => (
                        <div
                            key={order._id}
                            className='border border-gray-400 rounded-xl p-4 bg-white shadow-xl'>
                            {/* Top row */}
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p className='text-sm text-gray-700 font-bold'>Order ID: {order.orderId}</p>
                                    <span className='text-xs text-gray-600 font-medium'>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm font-medium'>
                                    {getStatusIcon(order.status)}
                                    <span className='capitalize'>{order.status}</span>
                                </div>
                            </div>
                            {/* Items */}
                            <div className='mt-3 space-y-1'>
                                {order.orderItems?.map((item) => (
                                    <div
                                        key={item.productId}
                                        className='flex justify-between text-sm text-gray-700 font-medium space-y-4'>
                                        <div className='flex items-center gap-3'>
                                            <ProductImage
                                                size='w-10 h-10'
                                                src={item.image}
                                            />
                                            {item.name} × {item.quantity}
                                        </div>
                                        <span>₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Footer */}
                            <div className='mt-3 flex justify-between border-t pt-2'>
                                <span className='text-sm text-gray-700 font-medium'>Payment: {order.paymentMethod || "COD"}</span>
                                <span className='font-bold'>Total: ₹{order.totalPrice}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
