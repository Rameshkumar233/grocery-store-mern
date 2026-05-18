import { useEffect, useState } from "react";
import { Package, Users, ShoppingCart, IndianRupee } from "lucide-react";
import { useAdminStore } from "../store/useAdminStore";
import LoadingSpinner from "../../shared/states/LoadingSpinner";
import CategoryChart from "../components/charts/CategoryCharts";
import CountUp from "../utils/CountUp";

export default function Dashboard() {
    const { dashboard, fetchDashboard, loadingDashboard } = useAdminStore();

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loadingDashboard) {
        return <LoadingSpinner fullscreen />;
    }

    const stats = dashboard
        ? [
              {
                  label: "Total Categories",
                  value: dashboard.stats.totalCategories,
                  icon: Package,
                  color: "blue",
              },
              {
                  label: "Total Products",
                  value: dashboard.stats.totalProducts,
                  icon: Package,
                  color: "blue",
              },
              {
                  label: "Users",
                  value: dashboard.stats.totalUsers,
                  icon: Users,
                  color: "purple",
              },
              {
                  label: "Orders",
                  value: dashboard.stats.totalOrders,
                  icon: ShoppingCart,
                  color: "green",
              },
              //   {
              //       label: "Revenue",
              //       value: `₹${dashboard.totalRevenue}`,
              //       icon: IndianRupee,
              //       color: "orange",
              //   },
          ]
        : [];

    return (
        <div className='p-6 space-y-8 w-full bg-gray-50 min-h-screen'>
            {/* Header */}
            <div>
                <h1 className='text-2xl font-semibold text-gray-800'>Dashboard</h1>
                <p className='text-sm text-gray-500'>Overview of your store performance</p>
            </div>
            {/* Stats */}
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
                {stats.map((item) => {
                    const Icon = item.icon;
                    const colorMap = {
                        green: "from-green-400/20 to-green-100 text-green-600",
                        blue: "from-blue-400/20 to-blue-100 text-blue-600",
                        red: "from-red-400/20 to-red-100 text-red-600",
                        yellow: "from-yellow-400/20 to-yellow-100 text-yellow-600",
                        purple: "from-purple-400/20 to-purple-100 text-purple-600",
                    };
                    return (
                        <div
                            key={item.label}
                            className='group relative rounded-2xl p-px bg-linear-to-br from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200 transition'>
                            {/* Card */}
                            <div className='relative h-full w-full rounded-2xl bg-white p-5 flex items-center justify-between shadow-sm hover:shadow-xl transition duration-300'>
                                {/* LEFT */}
                                <div>
                                    <p className='text-xs font-medium text-gray-500 uppercase tracking-wide'>{item.label}</p>
                                    <h2 className='text-3xl font-semibold text-gray-900 mt-2'>
                                        <CountUp target={item.value} />
                                    </h2>
                                </div>
                                {/* RIGHT ICON */}
                                <div className={`relative p-4 rounded-2xl bg-linear-to-br ${colorMap[item.color]} shadow-inner`}>
                                    {/* glow */}
                                    <div className='absolute inset-0 rounded-2xl blur-xl opacity-30 bg-current'></div>
                                    <Icon className='relative w-6 h-6' />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* BIG CHART */}
                <div className='lg:col-span-2'>{dashboard?.categoryStats?.length > 0 && <CategoryChart data={dashboard.categoryStats} />}</div>
                {/* SIDE PANEL */}
                <div className='bg-white rounded-2xl border border-gray-300 shadow-sm p-5 space-y-4'>
                    <h2 className='font-semibold text-gray-800'>Quick Insights</h2>

                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-500'>Top Category</span>
                        <span className='font-medium'>{dashboard?.categoryStats?.[0]?.name || "-"}</span>
                    </div>

                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-500'>Low Stock Items</span>
                        <span className='font-medium'>{dashboard?.lowStockProducts.length || 0}</span>
                    </div>

                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-500'>Out of Stock</span>
                        <span className='font-medium'>{dashboard?.outOfStock || 0}</span>
                    </div>
                </div>
            </div>
            <div className='bg-white p-5 rounded-xl border border-gray-300 shadow-sm'>
                <h3 className='text-lg font-semibold mb-4'>Low Stock</h3>
                <div className='space-y-3'>
                    {dashboard?.lowStockProducts.map((item) => (
                        <div
                            key={item.name}
                            className='flex justify-between text-sm'>
                            <span>{item.name}</span>
                            <span className='text-red-500 font-medium'>{item.stock} left</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Recent Orders */}
            <div className='bg-white rounded-2xl border border-gray-400 shadow-sm'>
                <div className='flex items-center justify-between px-5 py-4 border-b border-b-gray-400'>
                    <h2 className='font-semibold text-gray-800'>Recent Orders</h2>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-sm'>
                        <thead className='bg-gray-50'>
                            <tr className='text-left text-gray-600'>
                                <th className='py-3 px-5 font-medium'>Order ID</th>
                                <th className='px-5 font-medium'>User</th>
                                <th className='px-5 font-medium'>Amount</th>
                                <th className='px-5 font-medium'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboard?.recentOrders?.length > 0 ? (
                                dashboard.recentOrders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className='border-t border-t-gray-400 hover:bg-gray-50 transition'>
                                        <td className='py-3 px-5 font-medium text-gray-700'>#{order?.orderId || order._id}</td>
                                        <td className='px-5 text-gray-600'>{order.user?.name}</td>
                                        <td className='px-5 font-medium text-gray-800'>₹{order.totalPrice}</td>
                                        <td className='px-5'>
                                            <span className='px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium'>{order.status}</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan='4'
                                        className='text-center py-6 text-gray-400'>
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='bg-white p-5 rounded-xl border shadow-sm'>
                <h3 className='text-lg font-semibold mb-4'>Order Status</h3>
                <div className='space-y-3'>
                    {[
                        { label: "Pending", key: "pending", color: "yellow" },
                        { label: "Shipped", key: "shipped", color: "blue" },
                        { label: "Delivered", key: "delivered", color: "green" },
                        { label: "Cancelled", key: "cancelled", color: "red" },
                    ].map((item) => (
                        <div
                            key={item.key}
                            className='flex justify-between items-center'>
                            <span className='text-sm text-gray-600'>{item.label}</span>
                            <span
                                className={`px-2 py-1 rounded text-xs font-medium
            ${item.color === "yellow" ? "bg-yellow-100 text-yellow-600" : item.color === "blue" ? "bg-blue-100 text-blue-600" : item.color === "green" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                {dashboard?.orderStatus?.[item.key] || 0}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
