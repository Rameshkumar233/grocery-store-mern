import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus, ShoppingBag, ShoppingBasket } from "lucide-react";
import { filter, sort } from "../constants/filters/product.filter";
import { Button } from "../../shared/ui/Button";
import useAdminProductStore from "../store/useAdminProductStore";
import useAdminCategoryStore from "../store/useAdminCategoryStore";
import FilterControls from "../components/FilterControls";
import EmptyState from "../../shared/states/EmptyState";
import LoadingSpinner from "../../shared/states/LoadingSpinner";
import ProductsTable from "../components/ProductsTable";
import PageHeader from "../components/PageHeader";

const Products = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { categories, fetchCategories } = useAdminCategoryStore();
    const { loading, products, totalCount, fetchProducts } = useAdminProductStore();

    const defaultValues = {
        search: "",
        filter: "all",
        category: "all",
        sort: "latest",
    };
    useEffect(() => {
        const query = Object.fromEntries([...searchParams]);
        fetchProducts(query);
    }, [searchParams]);

    useEffect(() => {
        if (!categories.length) fetchCategories();
    }, []);

    return (
        <div className='p-6 sm:p-5 bg-slate-50 min-w-lg'>
            {/* Header */}
            <PageHeader
                title='Products Inventory'
                subtitle='Manage all products'
                icon={ShoppingBasket}
                buttonText='Add Product'
                buttonIcon={Plus}
                onClick={() => navigate("/admin/products/add")}
            />
            {/* Filters */}
            <FilterControls
                filterConfig={filter}
                sortConfig={sort}
                defaultValues={defaultValues}
                searchPlaceholder='Search Products...'
            />
            {totalCount > 0 && <p className='text-sm font-medium text-gray-500 py-3'>Showing {totalCount} Products</p>}
            {/* Table */}
            <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-w-md'>{loading ? <LoadingSpinner /> : products.length === 0 ? <EmptyState /> : <ProductsTable products={products} />}</div>
        </div>
    );
};

export default Products;
