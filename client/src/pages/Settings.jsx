import { useContext, useState } from "react";
import { Button, LinkButton } from "../shared/ui/Button";
import { AuthContext } from "../context/AuthContext";
import Modal from "../shared/ui/Modal";

const SettingsPage = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { user, deleteAccount } = useContext(AuthContext);
    const handleDeleteAccount = async () => {
        await deleteAccount();
        setShowDeleteModal(false);
    };
    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        promotions: false,
        deliveryReminders: true,
    });

    return (
        <div className='min-h-screen p-4 bg-gray-50 md:p-8'>
            <div className='max-w-3xl mx-auto'>
                <h1 className='mb-2 text-2xl font-bold text-gray-800'>Account Settings</h1>
                <p className='mb-8 text-gray-500'>Manage your profile, delivery addresses, and preferences.</p>
                <div className='space-y-6'>
                    {/* Profile Section */}
                    <section className='p-6 bg-white border border-gray-200 shadow-sm rounded-xl'>
                        <div className='flex items-center justify-between mb-4 border-b pb-2'>
                            <h2 className='text-lg font-semibold text-gray-800'>Personal Information</h2>
                            <LinkButton
                                to='/profile'
                                className='py-0 font-medium text-green-600 hover:underline'>
                                Edit
                            </LinkButton>
                        </div>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            {/* Name */}
                            <div>
                                <p className='text-xs font-bold text-gray-500 uppercase mb-1'>Full Name</p>
                                <p className='p-2 border rounded-lg bg-gray-50 text-gray-500'>{user?.name || "-"}</p>
                            </div>
                            {/* Email */}
                            <div>
                                <p className='text-xs font-bold text-gray-500 uppercase mb-1'>Mobile Number</p>
                                <p className='p-2 border rounded-lg bg-gray-50 text-gray-500'>{user?.phone || "-"}</p>
                            </div>
                            {/* Address */}
                            <div className='md:col-span-2'>
                                <p className='text-xs font-bold text-gray-500 uppercase mb-1'>Emails</p>
                                <p className='p-2 border rounded-lg bg-gray-50 text-gray-500'>{user?.email || "-"}</p>
                            </div>
                        </div>
                    </section>
                    {/* Preferences Section */}
                    <section className='p-6 bg-white border border-gray-200 shadow-sm rounded-xl'>
                        <h2 className='pb-2 mb-4 text-lg font-semibold text-gray-800 border-b'>Preferences</h2>
                        <div className='space-y-4'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='font-medium text-gray-700'>Order Status Updates</p>
                                    <p className='text-xs text-gray-500'>Get notified when your groceries are packed or out for delivery.</p>
                                </div>
                                <input
                                    type='checkbox'
                                    checked={notifications.orderUpdates}
                                    onChange={() => setNotifications({ ...notifications, orderUpdates: !notifications.orderUpdates })}
                                    className='w-5 h-5 accent-green-600'
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='font-medium text-gray-700'>Newsletter & Offers</p>
                                    <p className='text-xs text-gray-500'>Receive weekly discounts and seasonal grocery deals.</p>
                                </div>
                                <input
                                    type='checkbox'
                                    checked={notifications.promotions}
                                    onChange={() => setNotifications({ ...notifications, promotions: !notifications.promotions })}
                                    className='w-5 h-5 accent-green-600'
                                />
                            </div>
                        </div>
                    </section>
                    {/* Danger Zone */}
                    <section className='p-6 border border-red-100 bg-red-50 rounded-xl mb-5'>
                        <h2 className='mb-1 text-lg font-semibold text-red-800'>Danger Zone</h2>
                        <p className='mb-4 text-sm text-red-600'>Deleting your account is permanent and cannot be undone.</p>
                        <Button
                            variant='primary'
                            size='sm'
                            disabled={user?.role === "admin"}
                            className='bg-red-600 hover:bg-red-700'
                            onClick={() => setShowDeleteModal(true)}>
                            Delete Account
                        </Button>
                        {user?.role !== "user" && <p className='text-sm text-gray-500 mt-4 font-semibold'>Admin account cannot be deleted</p>}
                        {showDeleteModal && (
                            <Modal
                                onClose={() => setShowDeleteModal(false)}
                                title='Delete Account'
                                message={
                                    <>
                                        <span>Are you sure? You want to delete your account. This action cannot be undone.</span>
                                    </>
                                }
                                actionText='Confirm'
                                handleAction={handleDeleteAccount}
                            />
                        )}
                    </section>
                    {/* Save Button */}
                    {/* <div className='flex justify-end'>
                        <Button
                            variant='primary'
                            size='lg'>
                            Save Changes
                        </Button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
