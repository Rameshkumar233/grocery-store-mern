import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../validations/schemas";
import { Button } from "../../shared/ui/Button";
import useAdminCategoryStore from "../store/useAdminCategoryStore";
import useAdminProductStore from "../store/useAdminProductStore";
import FormField from "../../shared/ui/FormField";
import ImageUploadField from "../../shared/ui/ImageUploadField";
import SelectField from "../../shared/ui/SelectField";

function ProductForm() {
    const { categories } = useAdminCategoryStore();
    const { createProduct, updateProduct, fetchProductById } = useAdminProductStore();
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const options = categories.map((cat) => ({
        label: cat.name,
        value: cat._id,
    }));
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            price: "",
            category: "",
            stock: "",
            packSize: "",
            unit: "",
            offerPercent: 0,
            description: "",
            image: null,
            isActive: true,
            isFlashSale: false,
        },
    });
    useEffect(() => {
        const loadProduct = async () => {
            if (!isEdit) return;
            const res = await fetchProductById(id);
            const product = res?.product;
            if (!product) return;
            reset({
                ...product,
                category: product.category?._id || "",
                image: null,
            });
        };
        loadProduct();
    }, [id, isEdit, reset]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });
        const success = isEdit ? await updateProduct(id, formData) : await createProduct(formData);

        if (!success) return;
        reset();
        navigate("/admin/products");
    };

    return (
        <div className='flex flex-col bg-gray-50'>
            <div className='flex-1 p-4 sm:p-6 lg:p-8'>
                <div className='mb-6 text-center lg:text-start'>
                    <h1 className='text-xl sm:text-2xl font-semibold text-gray-800'>{isEdit ? "Update" : "Create"} Product</h1>
                    <p className='text-sm text-gray-500'>{!isEdit && "Create a new Product"} </p>
                </div>
                <div className='max-w-2xl mx-auto lg:mx-0 min-w-md'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='bg-white p-6 rounded-2xl grid md:grid-cols-3 gap-5 w-full mb-4 border border-slate-300 shadow-2xl shadow-gray-300'>
                            <FormField
                                name='name'
                                label='Product Name'
                                placeholder='Name of the product'
                                error={errors.name}
                                register={register("name")}
                                variant='admin'
                            />
                            <FormField
                                name='price'
                                type='number'
                                label='Price'
                                error={errors.price}
                                register={register("price", { valueAsNumber: true })}
                                placeholder='Enter a product price'
                                variant='admin'
                            />
                            <SelectField
                                name='category'
                                control={control}
                                label='Select Category'
                                options={options}
                                showPlaceholder={true}
                            />
                            <FormField
                                name='stock'
                                type='number'
                                label='Stock Size'
                                placeholder='Enter a stock size'
                                error={errors.stock}
                                register={register("stock", { valueAsNumber: true })}
                                variant='admin'
                            />
                            <FormField
                                name='offerPercent'
                                type='number'
                                label='Offer Percentage'
                                placeholder='Enter a percentage of offer'
                                error={errors.offerPercent}
                                register={register("offerPercent", { valueAsNumber: true })}
                                variant='admin'
                            />
                            <FormField
                                name='packSize'
                                type='number'
                                label='Weight or Unit'
                                placeholder='Enter weight or unit of the product'
                                error={errors.packSize}
                                register={register("packSize", { valueAsNumber: true })}
                                variant='admin'
                            />
                            <SelectField
                                name='unit'
                                label='Select Unit'
                                control={control}
                                options={[
                                    { label: "Gram", value: "g" },
                                    { label: "Kilogram", value: "kg" },
                                    { label: "Millilitre", value: "ml" },
                                    { label: "Litre", value: "l" },
                                    { label: "Piece", value: "pc" },
                                    { label: "Dozen", value: "dozen" },
                                ]}
                            />
                            <div className='col-span-3 space-y-4'>
                                <ImageUploadField
                                    name='image'
                                    label='Product Image'
                                    setValue={setValue}
                                    watch={watch}
                                    error={errors.image}
                                />
                                <FormField
                                    name='description'
                                    type='textarea'
                                    label='Description'
                                    placeholder='Add Description'
                                    error={errors.description}
                                    register={register("description")}
                                    className='h-32'
                                    cols={15}
                                    variant='admin'
                                />
                            </div>
                            <FormField
                                name='isActive'
                                type='checkbox'
                                label='Active'
                                register={register("isActive")}
                            />
                            <FormField
                                name='isFlashSale'
                                type='checkbox'
                                label='Flash Sale'
                                register={register("isFlashSale")}
                            />
                        </div>
                        <div className='flex items-center gap-5'>
                            <Button
                                variant='primary'
                                size='lg'
                                type='submit'
                                disabled={isSubmitting || (isEdit && !isDirty)}
                                className='group w-full'>
                                {isSubmitting ? <span className='group-hover:bg-green-700 tracking-wider'>{isEdit ? "Updating..." : "Creating..."}</span> : isEdit ? "Update Product" : "Create Product"}
                            </Button>
                            {isEdit && (
                                <Button
                                    onClick={() => navigate(-1)}
                                    size='lg'
                                    variant='primary'>
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ProductForm;
