import { useEffect } from "react";
import { filter, sort } from "../constants/filters/order.filter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAdminOrderStore } from "../store/useAdminOrderStore";
import FilterControls from "../components/FilterControls";
import OrdersTable from "../components/OrdersTable";
import LoadingSpinner from "../../shared/states/LoadingSpinner";
import EmptyState from "../../shared/states/EmptyState";

const statusOptions = ["All", "Pending", "Shipped", "Delivered", "Cancelled"];

const Orders = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { orders, fetchOrders, loading } = useAdminOrderStore();

    const defaultValues = {
        search: "",
        status: "all",
        sort: "newest",
    };
    useEffect(() => {
        const query = Object.fromEntries([...searchParams]);
        fetchOrders(query);
    }, [searchParams]);

    return (
        <div className='p-6 space-y-5'>
            {/* 🔹 Header */}
            <div className='flex flex-col xs:flex-row xs:items-center justify-between mb-5 gap-y-5 xs:gap-y-0'>
                <div>
                    <h1 className='text-xl font-semibold text-gray-800'>Orders</h1>
                    <p className='text-sm text-gray-500'>Manage Orders</p>
                </div>
            </div>
            <FilterControls
                filterConfig={filter}
                sortConfig={sort}
                defaultValues={defaultValues}
                searchPlaceholder='Search Orders...'
            />
            {/* 🔹 Table */}
            <div className='bg-white border border-gray-200 shadow-sm rounded-xl w-full'>{loading ? <LoadingSpinner /> : orders.length === 0 ? <EmptyState /> : <OrdersTable orders={orders} />}</div>

            {/* 🔹 Pagination */}
            {/* <div className='flex justify-between items-center text-sm'>
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className='px-3 py-1 border rounded disabled:opacity-50'>
                    Prev
                </button>

                <span>
                    Page {page} of {pages}
                </span>

                <button
                    disabled={page === pages}
                    onClick={() => setPage(page + 1)}
                    className='px-3 py-1 border rounded disabled:opacity-50'>
                    Next
                </button>
            </div> */}
        </div>
    );
};

export default Orders;
