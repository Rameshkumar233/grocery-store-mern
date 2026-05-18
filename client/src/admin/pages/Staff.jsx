import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { filter, sort } from "../constants/filters/user.filter";
import useUserAdminStore from "../store/useAdminUserStore";
import FilterControls from "../components/FilterControls";
import LoadingSpinner from "../../shared/states/LoadingSpinner";
import EmptyState from "../../shared/states/EmptyState";
import UsersTable from "../components/UsersTable";
import { UserCog } from "lucide-react";
import PageHeader from "../components/PageHeader";

const Staff = () => {
    const { users, fetchUsers, loading } = useUserAdminStore();

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
    const adminList = users.filter((user) => user.role === "admin");
    return (
        <div className='p-6 sm:p-5 bg-gray-50 min-w-lg'>
            <PageHeader
                icon={UserCog}
                title='Staff Members'
                subtitle='Manage staff and permissions'
            />

            <FilterControls
                filterConfig={filter}
                sortConfig={sort}
                defaultValues={defaultValues}
                searchPlaceholder='Search Users...'
            />
            {adminList.length > 0 && <p className='text-slate-500 py-3 text-sm font-medium'>{`Showing ${adminList.length} admin`}</p>}

            <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-w-md w-full'>
                {loading ? (
                    <LoadingSpinner />
                ) : users.length === 0 ? (
                    <EmptyState />
                ) : (
                    <UsersTable
                        users={adminList}
                        role='admin'
                    />
                )}
            </div>
        </div>
    );
};

export default Staff;
