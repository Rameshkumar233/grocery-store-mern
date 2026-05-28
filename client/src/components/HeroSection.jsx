import { ShoppingCart } from "lucide-react";
import { LinkButton } from "../shared/ui/Button";

const HeroSection = () => {
    return (
        <section className='bg-linear-to-br from-green-200/60 to-green-100/80'>
            <div className='container flex flex-col-reverse mx-auto px-6 py-16 items-center gap-8 lg:flex-row lg:px-20 lg:py-24'>
                {/* Text Content */}
                <div className='flex-1 text-center lg:text-left'>
                    <h1 className='mb-6 text-4xl font-bold text-green-900 leading-tight lg:text-5xl xl:text-6xl'>Fresh Groceries, Delivered To Your Door</h1>
                    <p className='mb-8 text-lg text-green-800 lg:text-xl'>Get daily essentials, fruits, veggies, and more with just a few clicks. Fast delivery guaranteed!</p>
                    <div className='flex flex-wrap mt-5 justify-center gap-4 lg:justify-start'>
                        <LinkButton
                            to={"/shop"}
                            variant='primary'
                            size='lg'
                            aria-label='Start shopping for groceries'>
                            <ShoppingCart />
                            Shop Now
                        </LinkButton>
                    </div>
                </div>
                {/* Image */}
                <div className='flex-1'>
                    <img
                        src={`${import.meta.env.BASE_URL}hero-image.png`}
                        alt='Colorful assortment of fresh fruits and vegetable'
                        className='w-full h-auto rounded-xl shadow-2xl'
                        loading='lazy'
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
