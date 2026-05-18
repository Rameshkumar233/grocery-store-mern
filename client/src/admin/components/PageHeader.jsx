import { Button } from "../../shared/ui/Button";

const PageHeader = ({ icon: Icon, title, subtitle, buttonText, buttonIcon: ButtonIcon, onClick }) => {
    return (
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6'>
            {/* Left */}
            <div className='flex items-start gap-4'>
                {Icon && (
                    <div className='p-3 rounded-2xl bg-green-100 text-green-700 shadow-sm'>
                        <Icon
                            size={26}
                            strokeWidth={2.2}
                        />
                    </div>
                )}
                <div>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-2xl font-bold tracking-tight text-gray-900'>{title}</h1>
                    </div>
                    {subtitle && <p className='text-sm text-gray-500 mt-1'>{subtitle}</p>}
                </div>
            </div>
            {/* Right */}
            <div className='flex items-center gap-3'>
                {buttonText && (
                    <Button
                        size='md'
                        variant='primary'
                        onClick={onClick}
                        className='shrink-0'>
                        {ButtonIcon && <ButtonIcon size={18} />}
                        {buttonText}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
