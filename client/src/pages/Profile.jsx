import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User, MapPin, Package, LogOut, Edit2, CreditCard, X, Save, UserCircle, Plus, Mail, Phone, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../validationSchemas/schema";
import { AuthContext } from "../context/AuthContext";
import { useUserProfileStore } from "../store/useUserProfileStore";
import { Button } from "../shared/ui/Button";
import AddressForm from "../components/AddressForm";
import FormField from "../shared/ui/FormField";

const Profile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const { deleteAddress, updateProfile } = useUserProfileStore();
    // Form states
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [isProfileEdit, setIsProfileEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    // Form hooks
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: user,
    });
    // Handle profile update
    const handleProfileUpdate = async (data) => {
        try {
            const res = await updateProfile(data);
            setUser(res.user);
            setIsProfileEdit(false);
            toast.success(res.message);
        } catch (error) {
            setUser(res.user);
        }
    };
    // Handle address deletion
    const handleConfirmDelete = async (addressId) => {
        try {
            const success = await deleteAddress(addressId);
            setUser((prev) => ({
                ...prev,
                addresses: prev.addresses.filter((addr) => addr._id !== addressId),
            }));
            setIsOpen(false);
            setSelectedAddressId(null);
            toast.success("Address deleted successfully");
        } catch (error) {
            console.error("Address deletion failed", error);
            setUser((prev) => ({
                ...prev,
                addresses: prev.addresses,
            }));
        }
    };

    // Sidebar navigation links
    const sidebarLinks = [
        { label: "My Orders", icon: <Package size={18} />, action: () => navigate("/orders") },
        { label: "Manage Address", icon: <MapPin size={18} />, action: () => {} },
        { label: "Payments", icon: <CreditCard size={18} />, action: () => {} },
    ];
    // Profile form fields
    const userFieldConfig = [
        { name: "name", label: "Full Name", type: "text", icon: User },
        { name: "email", label: "Email Address", type: "email", disabled: true, icon: Mail },
        { name: "phone", label: "Mobile Number", type: "number", icon: Phone },
    ];

    return (
        <div className='max-w-full min-h-screen p-4 mx-auto md:p-8 bg-slate-100'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
                {/* Sidebar */}
                <aside className='md:col-span-4 lg:col-span-3'>
                    <div className='p-5 text-center bg-white border shadow-md rounded-2xl border-gray-800/20'>
                        <div className='relative inline-block'>
                            <UserCircle size={80} />
                            <Button
                                size='xs'
                                className='absolute bottom-0 right-0 p-2 text-white bg-green-600 rounded-full'>
                                <Edit2 size={14} />
                            </Button>
                        </div>
                        <h2 className='mt-4 text-xl font-semibold text-gray-800'>{user.name}</h2>
                        <nav className='mt-6 space-y-2'>
                            {sidebarLinks.map((link, i) => (
                                <Button
                                    key={i}
                                    onClick={link.action}
                                    variant='plain'
                                    className='justify-start w-full hover:bg-gray-100'>
                                    {link.icon}
                                    <span>{link.label}</span>
                                </Button>
                            ))}
                            <Button
                                variant='plain'
                                className='w-full mt-4 text-red-500 hover:bg-red-100'>
                                <LogOut size={18} />
                                <span>Logout</span>
                            </Button>
                        </nav>
                    </div>
                </aside>
                {/* Main Content */}
                <main className='space-y-6 md:col-span-8 lg:col-span-9'>
                    {/* Profile Section */}
                    <section className='bg-white border shadow-lg rounded-2xl border-gray-800/20'>
                        <div className='flex items-center justify-between px-6 py-4 border-b border-b-gray-800/20'>
                            <h3 className='flex items-center gap-2 font-semibold text-gray-800'>
                                <User
                                    size={18}
                                    className='text-green-600'
                                />
                                Account Details
                            </h3>
                            {!isProfileEdit ? (
                                <Button
                                    onClick={() => setIsProfileEdit(true)}
                                    size='sm'
                                    className='rounded-full hover:bg-transparent hover:text-green-500'>
                                    <Edit2 size={18} />
                                </Button>
                            ) : (
                                <div className='flex items-center justify-end gap-x-3'>
                                    <Button
                                        onClick={() => {
                                            setIsProfileEdit(false);
                                            reset();
                                        }}
                                        size='sm'
                                        className='bg-gray-300 hover:bg-gray-400/70'>
                                        <X size={18} />
                                        Cancel
                                    </Button>
                                    <Button
                                        form='profileForm'
                                        type='submit'
                                        variant='primary'
                                        size='sm'
                                        disabled={isSubmitting || !isDirty}>
                                        <Save size={18} />
                                        {isSubmitting ? "Saving..." : "Update Profile"}
                                    </Button>
                                </div>
                            )}
                        </div>
                        <form
                            id='profileForm'
                            onSubmit={handleSubmit(handleProfileUpdate)}
                            className='p-6 space-y-6'>
                            <div className='grid gap-4 md:grid-cols-2'>
                                {userFieldConfig.map((field) => (
                                    <FormField
                                        key={field.name}
                                        {...field}
                                        splitIcon
                                        register={register(field.name)}
                                        error={errors[field.name]}
                                        disabled={field.disabled || !isProfileEdit}
                                        className='disabled:bg-gray-100 disabled:cursor-not-allowed'
                                    />
                                ))}
                            </div>
                            {/* Address Section */}
                            {user.addresses.length > 0 && (
                                <div>
                                    <h4 className='flex items-center gap-2 mb-3 font-medium text-gray-700'>
                                        <MapPin size={16} />
                                        Saved Address
                                    </h4>
                                    <div className='grid gap-4 sm:grid-cols-2'>
                                        {user.addresses.map((addr) => (
                                            <div
                                                key={addr._id}
                                                className='relative p-4 border border-gray-400 rounded-xl bg-gray-50'>
                                                <h2 className='text-lg font-bold uppercae'>{addr.fullName}</h2>
                                                <div className='text-gray-700 text-sm mt-1'>
                                                    <p>{addr.address},</p>
                                                    <p>
                                                        {addr.city} - {addr.zipCode}
                                                    </p>
                                                    <p>{addr.landmark}</p>
                                                    <p>{addr.phone}</p>
                                                </div>
                                                <div className='absolute flex gap-2 top-2 right-2'>
                                                    <Button
                                                        size='sm'
                                                        className='hover:text-blue-500'
                                                        onClick={() => {
                                                            setIsAddressFormOpen(true);
                                                            setEditingAddress(addr);
                                                        }}>
                                                        <Edit2 size={16} />
                                                    </Button>
                                                    <div className='relative'>
                                                        <Button
                                                            size='sm'
                                                            className='hover:text-red-500'
                                                            onClick={() => {
                                                                setSelectedAddressId(addr._id);
                                                                setIsOpen(true);
                                                            }}>
                                                            <Trash2 size={16} />
                                                        </Button>
                                                        {selectedAddressId === addr._id && (
                                                            <div className='absolute z-50 w-64 p-4  mt-2 bg-slate-200 shadow-2xl -right-5 ring-2 ring-black/20 rounded-lg'>
                                                                <div className='absolute w-4 h-4 rotate-45 bg-gray-200 border-t border-l -top-2 right-8 border-black/20' />
                                                                <h2 className='mb-6 font-semibold text-md'>Confirm delete?</h2>
                                                                <div className='flex justify-end gap-2'>
                                                                    <Button
                                                                        className=' py-1 bg-white ring rounded-md ring-black/20 hover:bg-gray-300 hover:text-black'
                                                                        onClick={() => setSelectedAddressId(null)}>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button
                                                                        className='py-1 text-white bg-red-800 ring ring-red-700 rounded-md hover:bg-red-700'
                                                                        onClick={handleConfirmDelete}>
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <Button
                                type='button'
                                variant='outline'
                                onClick={() => setIsAddressFormOpen(true)}>
                                <Plus size={16} />
                                Add Address
                            </Button>
                        </form>
                    </section>
                    {/* Address Form Modal */}
                    {isAddressFormOpen && (
                        <AddressForm
                            isEdit={editingAddress !== null}
                            address={editingAddress}
                            setAddress={setEditingAddress}
                            onClose={() => setIsAddressFormOpen(false)}
                        />
                    )}

                    {/* Orders */}
                    {/* <section className='p-6 bg-white border shadow rounded-2xl'>
                        <h3 className='flex items-center gap-2 mb-4 font-semibold'>
                            <Package
                                size={18}
                                className='text-green-600'
                            />
                            Recent Orders
                        </h3>

                        <div className='grid gap-4 sm:grid-cols-2'>
                            {orders.slice(0, 2).map((order) => (
                                <div
                                    key={order.id}
                                    className='flex justify-between p-4 border rounded-xl hover:bg-gray-50'>
                                    <div>
                                        <p className='font-semibold'>#{order.id}</p>
                                        <p className='text-xs text-gray-400'>{order.date}</p>
                                    </div>

                                    <div className='text-right'>
                                        <p className='font-semibold'>{order.total}</p>
                                        <span className='px-2 py-1 text-xs text-green-700 bg-green-100 rounded'>{order.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section> */}
                </main>
            </div>
        </div>
    );
};

export default Profile;
