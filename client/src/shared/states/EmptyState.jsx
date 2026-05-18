const EmptyState = ({ title = "No Data Found", description = "Try adjusting filters or come back later", action }) => {
    return (
        <div className='flex flex-col items-center justify-center flex-1 w-full text-center p-30'>
            <p className='text-xl font-semibold text-gray-700'>{title}</p>
            <p className='text-lg text-gray-500 mt-1'>{description}</p>

            {action && <div className='mt-4'>{action}</div>}
        </div>
    );
};

export default EmptyState;
