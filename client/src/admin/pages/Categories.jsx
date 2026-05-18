import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutGrid, Plus } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { filter, sort } from "../constants/filters/category.filter";
import FilterControls from "../components/FilterControls";
import EmptyState from "../../shared/states/EmptyState";
import LoadingSpinner from "../../shared/states/LoadingSpinner";
import CategoriesTable from "../components/CategoriesTable";
import PageHeader from "../components/PageHeader";
import useAdminCategoryStore from "../store/useAdminCategoryStore";

const Categories = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { categories, totalCount, loading, fetchCategories } = useAdminCategoryStore();

    const defaultValues = {
        search: "",
        isActive: "all",
        sort: "latest",
    };
    useEffect(() => {
        const query = Object.fromEntries([...searchParams]);
        fetchCategories(query);
    }, [searchParams]);

    return (
        <div className='p-6 sm:p-5 bg-slate-50 min-w-lg'>
            {/* HEADER */}
            <PageHeader
                icon={LayoutGrid}
                title='Categories'
                subtitle='Manage all product categories'
                buttonText='Add Category'
                buttonIcon={Plus}
                onClick={() => navigate("/admin/categories/add")}
            />
            <FilterControls
                filterConfig={filter}
                sortConfig={sort}
                defaultValues={defaultValues}
                searchPlaceholder='Search Users...'
            />
            {totalCount > 0 && <p className='text-slate-500 py-3 text-sm font-medium'>{`Showing ${totalCount} Category`}</p>}
            <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-w-md w-full'>
                {loading ? <LoadingSpinner /> : categories.length === 0 ? <EmptyState /> : <CategoriesTable categories={categories} />}
            </div>
        </div>
    );
};

export default Categories;
