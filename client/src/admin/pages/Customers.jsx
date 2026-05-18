import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Users } from "lucide-react";
import { filter, sort } from "../constants/filters/user.filter";
import useAdminUserStore from "../store/useAdminUserStore";
import FilterControls from "../components/FilterControls";
import EmptyState from "../../shared/states/EmptyState";
import LoadingSpinner from "../../shared/states/LoadingSpinner";
import UsersTable from "../components/UsersTable";
import PageHeader from "../components/PageHeader";

const Customers = ({ totalCount }) => {
    const { users, fetchUsers, loading } = useAdminUserStore();

    const [searchParams] = useSearchParams();
    const defaultValues = {
        search: "",
        status: "all",
        sort: "newest",
    };
    useEffect(() => {
        const query = Object.fromEntries([...searchParams]);
        fetchUsers(query);
    }, [searchParams]);
    const customerList = users.filter((user) => user.role === "user");
    return (
        <div className='p-6 sm:p-5 bg-gray-50 min-h-screen flex flex-col'>
            <PageHeader
                icon={Users}
                title='Customers'
                subtitle='Manage all customers'
            />
            <div className='flex-none'>
                <FilterControls
                    filterConfig={filter}
                    sortConfig={sort}
                    defaultValues={defaultValues}
                    searchPlaceholder='Search Users...'
                />
                {customerList.length > 0 && <p className='text-slate-500 py-3 text-sm font-medium'>{`Showing ${customerList.length} customers`}</p>}
            </div>
            <div className='flex flex-col grow overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm'>
                {loading ? (
                    <LoadingSpinner />
                ) : users.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className='flex-1 min-h-0 overflow-auto custom-scrollbar'>
                        <UsersTable
                            users={customerList}
                            role='user'
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default Customers;
