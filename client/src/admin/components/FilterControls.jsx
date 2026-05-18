import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowUpDown, Filter, Search } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import useAdminCategoryStore from "../store/useAdminCategoryStore";
import FormField from "../../shared/ui/FormField";
import SelectField from "../../shared/ui/SelectField";

const FilterControls = ({ searchPlaceholder, filterConfig, sortConfig, defaultValues }) => {
    const { categories } = useAdminCategoryStore();
    const { register, handleSubmit, control } = useForm({ defaultValues });

    const [_, setSearchParams] = useSearchParams();

    const onApply = (data) => {
        const params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
            if (value && value !== "all" && value !== "latest") params.set(key, value);
            else params.delete(key);
        });
        setSearchParams(params);
    };

    return (
        <form
            onSubmit={handleSubmit(onApply)}
            className='grid gap-3 pb-3 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'>
            {/* SEARCH */}
            <FormField
                name='search'
                type='search'
                register={register("search")}
                placeholder={searchPlaceholder}
                variant='admin'
                icon={Search}
                className='pl-10 text-sm'
            />
            {/* FILTERS */}
            {filterConfig.map((field) => {
                let options = field.options;
                if (field.name === "category") {
                    options = [
                        { label: "All Categories", value: "all" },
                        ...(categories || []).map((cat) => ({
                            label: cat.name,
                            value: cat._id,
                        })),
                    ];
                }
                return (
                    <SelectField
                        key={field.name}
                        name={field.name}
                        control={control}
                        options={options}
                        icon={Filter}
                    />
                );
            })}
            {/* SORT */}
            {sortConfig.map((field) => (
                <SelectField
                    key={field.name}
                    name={field.name}
                    control={control}
                    options={field.options}
                    icon={ArrowUpDown}
                />
            ))}
            {/* APPLY BUTTON */}
            <Button
                type='submit'
                variant='primary'
                size='lg'
                className='py-1.5 rounded-lg'>
                Apply
            </Button>
        </form>
    );
};
export default FilterControls;
