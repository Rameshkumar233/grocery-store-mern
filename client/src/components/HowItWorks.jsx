import React from "react";
import { ShoppingCart, Truck, Package, Smile } from "lucide-react";

const steps = [
    {
        icon: (
            <ShoppingCart
                size={40}
                className='text-green-600'
            />
        ),
        title: "Browse Products",
        description: "Explore fresh groceries, fruits, vegetables, and daily essentials in one place.",
    },
    {
        icon: (
            <Package
                size={40}
                className='text-green-600'
            />
        ),
        title: "Add to Cart",
        description: "Select your items and add them to your shopping cart with ease.",
    },
    {
        icon: (
            <Truck
                size={40}
                className='text-green-600'
            />
        ),
        title: "Fast Delivery",
        description: "Get your order delivered quickly and safely to your doorstep.",
    },
    {
        icon: (
            <Smile
                size={40}
                className='text-green-600'
            />
        ),
        title: "Enjoy Freshness",
        description: "Enjoy fresh groceries and daily essentials without leaving home.",
    },
];

const HowItWorks = () => {
    return (
        <section className='py-16 bg-gray-50 '>
            <div className='max-w-6xl mx-auto px-4 text-center'>
                <h2 className='text-3xl font-bold mb-10'>How It Works</h2>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition hover:scale-105 hover:animate-pulse'>
                            <div className='mb-4 flex justify-center'>{step.icon}</div>
                            <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
                            <p className='text-gray-600'>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
