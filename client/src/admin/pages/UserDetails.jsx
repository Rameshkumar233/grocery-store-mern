import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Package, IndianRupee } from "lucide-react";
import useAdminUserStore from "../store/useAdminUserStore";

export default function UserDetails() {
    const { id, type } = useParams();

    const { selectedUser, loading, fetchUserDetails } = useAdminUserStore();

    useEffect(() => {
        fetchUserDetails(id);
    }, [id]);

    if (loading) {
        return (
            <div className='p-6'>
                <div className='h-40 rounded-3xl bg-gray-100 animate-pulse' />
            </div>
        );
    }

    if (!selectedUser) return null;

    const totalOrders = selectedUser.orders?.length || 0;

    const totalCartItems = selectedUser.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    const totalSpent = selectedUser.orders?.reduce((sum, order) => sum + order.totalPrice, 0) || 0;

    return (
        <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
            {/* Header */}
            <section className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                    <div className='flex items-center gap-5'>
                        <img
                            src={selectedUser.avatar || "https://ui-avatars.com/api/?name=selectedUser[0]"}
                            alt={selectedUser.name}
                            className='w-24 h-24 rounded-2xl object-cover border border-gray-200'
                        />

                        <div>
                            <h1 className='text-2xl font-bold text-gray-900'>{selectedUser.name}</h1>

                            <p className='text-gray-500 mt-1'>{selectedUser.email}</p>

                            <p className='text-gray-500'>{selectedUser.phone}</p>

                            <div className='flex items-center gap-3 mt-4'>
                                <span className='px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium capitalize'>{selectedUser.role}</span>

                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedUser.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>{selectedUser.status}</span>
                            </div>
                        </div>
                    </div>

                    <div className='text-sm text-gray-500'>Joined on {new Date(selectedUser.createdAt).toLocaleDateString()}</div>
                </div>
            </section>

            {/* Stats */}
            <section className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm text-gray-500'>Total Orders</p>

                            <h2 className='text-3xl font-bold text-gray-900 mt-2'>{totalOrders}</h2>
                        </div>

                        <div className='w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center'>
                            <Package className='text-blue-600' />
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm text-gray-500'>Cart Items</p>

                            <h2 className='text-3xl font-bold text-gray-900 mt-2'>{totalCartItems}</h2>
                        </div>

                        <div className='w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center'>
                            <ShoppingCart className='text-orange-600' />
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm text-gray-500'>Total Spent</p>

                            <h2 className='text-3xl font-bold text-gray-900 mt-2'>₹{totalSpent}</h2>
                        </div>

                        <div className='w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center'>
                            <IndianRupee className='text-green-600' />
                        </div>
                    </div>
                </div>
            </section>

            {/* Orders */}
            <section className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-xl font-semibold text-gray-900'>Orders</h2>
                    <span className='text-sm text-gray-500'>{totalOrders} Orders</span>
                </div>
                <div className='overflow-x-auto'>
                    <table className='w-full min-w-[700px]'>
                        <thead>
                            <tr className='border-b border-gray-100 text-left'>
                                <th className='py-4 text-sm font-semibold text-gray-500'>Order ID</th>

                                <th className='py-4 text-sm font-semibold text-gray-500'>Date</th>

                                <th className='py-4 text-sm font-semibold text-gray-500'>Items</th>

                                <th className='py-4 text-sm font-semibold text-gray-500'>Total</th>

                                <th className='py-4 text-sm font-semibold text-gray-500'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedUser.orders?.map((order) => (
                                <tr
                                    key={order._id}
                                    className='border-b border-gray-50 hover:bg-gray-50 transition'>
                                    <td className='py-4 font-medium text-gray-800'>#{order._id.slice(-6)}</td>
                                    <td className='py-4 text-gray-600'>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className='py-4 text-gray-600'>{order.orderItems.length}</td>
                                    <td className='py-4 font-semibold text-gray-800'>₹{order.totalPrice}</td>

                                    <td className='py-4'>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                order.status === "Delivered" ? "bg-green-50 text-green-600" : order.status === "Cancelled" ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Cart */}
            {selectedUser.cart && (
                <section className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-xl font-semibold text-gray-900'>Cart Items</h2>

                        <span className='text-sm text-gray-500'>{totalCartItems} Items</span>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
                        {selectedUser.cart?.items?.map((item) => (
                            <div
                                key={item._id}
                                className='border border-gray-100 rounded-2xl p-4 flex gap-4 hover:shadow-md transition'>
                                {/* <img
                                src={`http://localhost:5000${item.product.images[0]}`}
                                alt={item.product.name}
                                className='w-24 h-24 rounded-2xl object-cover bg-gray-100'
                            /> */}

                                <div className='flex-1'>
                                    <h3 className='font-semibold text-gray-900 line-clamp-1'>{item.product.name}</h3>

                                    <p className='text-sm text-gray-500 mt-1'>Qty: {item.quantity}</p>

                                    <p className='text-lg font-bold text-green-600 mt-3'>₹{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
