import { useEffect, useState } from "react";
import { UploadCloud, X } from "lucide-react";

const ImageUploadField = ({ name, setValue, watch, error, label }) => {
    const file = watch(name);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        setValue(name, file, {
            shouldValidate: true,
            shouldDirty: true,
        });
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const handleRemove = () => {
        setValue(name, null, {
            shouldValidate: true,
            shouldDirty: true,
        });
        setPreview(null);
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(file);
        };
    }, [preview]);

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>{label}</label>

            <label className='relative cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center hover:border-green-500 transition'>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleChange}
                    className='hidden'
                />
                {preview ? (
                    <div className='flex flex-wrap gap-3'>
                        <div className='relative'>
                            <img
                                src={preview}
                                alt='preview'
                                className='w-32 h-32 object-cover rounded-lg'
                            />
                            <button
                                type='button'
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRemove();
                                }}
                                className='absolute -top-2 -right-2 bg-white shadow p-1 rounded-full'>
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center gap-2 text-gray-500'>
                        <UploadCloud size={28} />
                        <p className='text-xs'>Upload image</p>
                    </div>
                )}
            </label>

            {error && <p className='text-xs text-red-500'>{error.message}</p>}
        </div>
    );
};

export default ImageUploadField;
