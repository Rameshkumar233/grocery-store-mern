import React from "react";
import { useAdminOrderStore } from "../store/useAdminOrderStore";

const OrdersTable = ({ orders }) => {
    return (
        <div className='bg-white rounded-xl border shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                    <thead className='bg-gray-50 text-gray-600'>
                        <tr>
                            <th className='p-3 text-left'>Order</th>
                            <th className='p-3 text-left'>Customer</th>
                            <th className='p-3 text-left'>Items</th>
                            <th className='p-3 text-left'>Total</th>
                            <th className='p-3 text-left'>Payment</th>
                            <th className='p-3 text-left'>Status</th>
                            <th className='p-3 text-left'>Date</th>
                            <th className='p-3 text-left'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                className='border-t hover:bg-gray-50'>
                                <td className='p-3 font-medium'>#{order._id.slice(-6)}</td>

                                <td className='p-3 font-medium'>
                                    <div className='font-medium'>{order.user?.name}</div>
                                    <div className='text-xs text-gray-500'>{order.user?.email}</div>
                                </td>

                                <td className='p-3 font-medium'>{order.orderItems.length} items</td>

                                <td className='p-3 font-medium'>₹{order.totalPrice}</td>

                                <td className='p-3 font-medium'>
                                    <div className='text-xs'>{order.paymentMethod}</div>
                                    <div className={`text-xs font-medium ${order.isPaid ? "text-green-600" : "text-red-500"}`}>{order.isPaid ? "Paid" : "Unpaid"}</div>
                                </td>

                                <td className='p-3 font-medium'>
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${order.status === "Pending" ? "bg-yellow-100 text-yellow-600" : order.status === "Shipped" ? "bg-blue-100 text-blue-600" : order.status === "Delivered" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                        {order.status}
                                    </span>
                                </td>

                                <td className='p-3 font-medium'>{new Date(order.createdAt).toLocaleDateString()}</td>

                                <td className='p-3 font-medium'>
                                    <button className='text-blue-600 text-xs font-medium hover:underline'>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;
