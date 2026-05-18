import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Building2, Compass, Globe, Hash, Layers, MapPin, Phone, Save, User, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "../validationSchemas/schema";
import { useUserProfileStore } from "../store/useUserProfileStore";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../shared/ui/Button";
import { addressFieldConfig } from "../constants";
import FormField from "../shared/ui/FormField";

const AddressForm = ({ onClose, address, setAddress, isEdit }) => {
    const { user, setUser } = useContext(AuthContext);
    const { saveAddress } = useUserProfileStore();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            country: "India",
        },
    });

    useEffect(() => {
        if (address && isEdit) {
            reset(address);
        }
        reset();
    }, [user, reset, address]);

    const onSubmit = async (data) => {
        const payload = {
            addressId: address?._id || null,
            ...data,
        };
        try {
            const res = await saveAddress(payload);
            if (isEdit && address) {
                setUser((prev) => ({
                    ...prev,
                    addresses: prev.addresses.map((addr) => (addr._id === address?._id ? { ...addr, ...data } : addr)),
                }));
            } else {
                setUser((prev) => ({ ...prev, addresses: res.user.addresses }));
            }

            onClose();
            setAddress(null);
            reset();
            toast.success(res.message);
        } catch (error) {
            setUser((prev) => ({
                ...prev,
                addresses: prev.addresses,
            }));
        }
    };

    return (
        <div className='bg-white rounded-3xl shadow-lg border-2 border-gray-500/80 overflow-hidden p-8 space-y-4'>
            <div className='flex items-center justify-between'>
                <h3 className='text-gray-800 font-bold text-2xl'>{isEdit ? "Edit Address" : "Add New Address"}</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>
                    {addressFieldConfig.map((field) => (
                        <FormField
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            placeholder={field.placeholder}
                            error={errors[field.name]}
                            register={register(field.name)}
                            icon={field.icon}
                            splitIcon
                            {...field}
                        />
                    ))}
                </div>
                <div className='flex items-center justify-end gap-x-4 mt-5'>
                    <Button
                        className='text-red-600/80'
                        size='lg'
                        onClick={() => {
                            onClose();
                            if (address && isEdit) setAddress(null);
                        }}>
                        <X size={18} /> Cancel
                    </Button>
                    <Button
                        type='submit'
                        size='lg'
                        variant='primary'
                        disabled={!isDirty || isSubmitting}
                        className=''>
                        {isSubmitting ? (
                            <span className='tracking-wider'>Saving...</span>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Address
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm;
