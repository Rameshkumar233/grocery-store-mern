import React from "react";
import { Button } from "./Button";

const Modal = ({ onClose, title, message, actionText, handleAction, error }) => {
    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center'>
            {/* Overlay */}
            <div
                className='absolute inset-0 bg-black/90'
                onClick={onClose}
            />
            {/* Modal */}
            <div className='relative bg-white rounded-xl w-full max-w-md p-4 z-10 space-y-6 '>
                {/* Header */}
                <h2 className='text-lg font-semibold pb-2 border-b border-b-slate-300 text-center uppercase tracking-wide'>{title}</h2>
                {/* Content */}
                <p className='text-[16px] text-gray-600'>{message}</p>
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                {/* Actions */}
                <div className='flex items-center justify-end gap-x-4'>
                    <Button
                        size='md'
                        variant='outline'
                        onClick={onClose}
                        className='border-gray-300 text-gray-900 hover:bg-gray-500'>
                        Cancel
                    </Button>
                    <Button
                        size='md'
                        variant='primary'
                        onClick={handleAction}
                        className='bg-red-600/90 hover:bg-red-800 border-red-100'>
                        {actionText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
