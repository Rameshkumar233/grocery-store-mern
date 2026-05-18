import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../validations/schemas";
import { Button, LinkButton } from "../../shared/ui/Button";
import useAdminCategoryStore from "../store/useAdminCategoryStore";
import FormField from "../../shared/ui/FormField";
import ImageUploadField from "../../shared/ui/ImageUploadField";

const CategoryForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();
    const { createCategory, updateCategory } = useAdminCategoryStore();
    const category = state || null;
    const isEdit = Boolean(id);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            isActive: true,
            image: null,
        },
    });
    useEffect(() => {
        if (isEdit && category) {
            reset({
                name: category.name,
                isActive: category.isActive,
                image: category.image,
            });
        }
    }, [isEdit, category]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("isActive", data.isActive);
        formData.append("image", data.image);
        console.log(Object.entries(formData));
        console.log("data", data);
        let success;
        if (isEdit && category) {
            success = await updateCategory(category._id, formData);
        } else {
            success = await createCategory(formData);
        }
        if (success) {
            navigate("/admin/categories");
            reset({
                name: "",
                isActive: true,
                image: null,
            });
        }
    };

    return (
        <div className='flex flex-col bg-white/90'>
            <div className='flex-1 p-4 sm:p-6 lg:p-8'>
                <Button
                    onClick={() => navigate(-1)}
                    className='text-lg p-0 mb-4  '>
                    <ArrowLeft
                        size={18}
                        className='hover:scale-125 hover:text-blue-500'
                    />
                    Go Back
                </Button>
                <div className='mb-6 text-center lg:text-start'>
                    <h1 className='text-xl sm:text-2xl font-semibold text-gray-800'>{isEdit ? "Update" : "Create"} Category</h1>
                    <p className='text-sm text-gray-500'>{!isEdit && "Create a new product category"}</p>
                </div>
                <div className='max-w-xl mx-auto lg:mx-0 min-w-md'>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='space-y-6 bg-white p-6 rounded-2xl border border-slate-400/60 shadow-xl'>
                        {/* NAME */}
                        <FormField
                            name='name'
                            label='Category Name'
                            placeholder='Enter category name'
                            error={errors.name}
                            register={register("name")}
                            variant='admin'
                        />
                        {/* IMAGE */}
                        <ImageUploadField
                            name='image'
                            label='Category Image'
                            setValue={setValue}
                            watch={watch}
                            error={errors.image}
                        />
                        {/* ACTIVE */}
                        <FormField
                            name='isActive'
                            type='checkbox'
                            label='Active'
                            register={register("isActive")}
                        />
                        {/* SUBMIT */}
                        <div className='flex items-center gap-5'>
                            <Button
                                size='lg'
                                type='submit'
                                variant='primary'
                                className='group w-full'
                                disabled={isSubmitting || (isEdit && !isDirty)}>
                                {isSubmitting ? <span className='group-hover:bg-green-700 tracking-wider'>{isEdit ? "Updating..." : "Creating..."}</span> : isEdit ? "Update Category" : "Create Category"}
                            </Button>
                            {isEdit && (
                                <Button
                                    onClick={() => navigate(-1)}
                                    size='lg'
                                    variant='primary'
                                    className=''>
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
