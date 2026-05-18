const LoadingSpinner = ({ fullScreen = false, text = "Loading..." }) => {
    return (
        <div className={`flex items-center justify-center ${fullScreen ? "min-h-screen" : "h-40"}`}>
            <div className='flex flex-col items-center gap-2'>
                <div className='w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin'></div>
                <p className='text-sm text-gray-500'>{text}</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
