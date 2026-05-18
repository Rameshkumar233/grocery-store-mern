import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import { AlertTriangle, ArrowLeft, Minus, Plus } from "lucide-react";
import { Button, LinkButton } from "../shared/ui/Button";
import ProductImage from "../shared/ui/ProductImage";

const ProductDetails = () => {
    const { id } = useParams();
    const { selectedProduct, fetchProductById, loading, error } = useProductStore();
    const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();

    useEffect(() => {
        if (id) fetchProductById(id);
    }, [id]);

    const cartItem = cart.find((item) => item.productId === selectedProduct?._id);

    if (loading) {
        return (
            <div className='max-w-6xl p-4 mx-auto animate-pulse'>
                <div className='grid gap-8 md:grid-cols-2'>
                    <div className='bg-gray-200 h-80 rounded-xl' />
                    <div>
                        <div className='w-3/4 h-8 mb-4 bg-gray-200' />
                        <div className='w-1/2 h-6 mb-2 bg-gray-200' />
                        <div className='w-full h-4 mb-4 bg-gray-200' />
                        <div className='w-32 h-10 bg-gray-200' />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='p-4 text-center'>
                <p className='text-red-500'>Error loading product: {error}</p>
                <Button
                    onClick={() => fetchProductById(id)}
                    className='mt-4'>
                    Retry
                </Button>
            </div>
        );
    }

    if (!selectedProduct) {
        return (
            <div className='p-4 text-center'>
                <p>Product not found</p>
                <Link to='/shop'>
                    <Button className='mt-4'>Back to Shop</Button>
                </Link>
            </div>
        );
    }

    const { _id, name, image, price, stock, description } = selectedProduct;
    return (
        <div className='max-w-6xl p-4 mx-auto md:p-8'>
            <Link
                to='/shop'
                className='inline-flex items-center mb-4 text-green-600 hover:underline'>
                <ArrowLeft
                    size={16}
                    className='mr-2'
                />
                Back to Shop
            </Link>
            <div className='grid gap-8 md:grid-cols-2'>
                {/* 🖼 Image Section */}
                <div className='p-4 bg-gray-100 rounded-2xl'>
                    <ProductImage
                        size='w-80 h-80'
                        src={image}
                        alt={name}
                        className='object-cover w-full h-87 md:h-105 rounded-xl'
                    />
                </div>

                {/* 📦 Details Section */}
                <div className='flex flex-col justify-between'>
                    <div>
                        <h1 className='text-2xl font-semibold md:text-3xl'>{name}</h1>
                        <p className='mt-2 text-2xl font-bold text-green-600'>₹{price}</p>
                        <div className='mt-2'>
                            {stock > 0 ? <p className='text-sm text-green-600'>In Stock ({stock})</p> : <p className='text-sm text-red-500'>Out of Stock</p>}
                            {stock > 0 && stock <= 10 && (
                                <p className='flex items-center gap-2 mt-3 text-sm text-red-500 '>
                                    <AlertTriangle size={16} /> Only few left!
                                </p>
                            )}
                        </div>
                        <p className='mt-4 leading-relaxed text-gray-600'>{description}</p>
                    </div>
                    {/* Action Section */}
                    <div className='mt-6'>
                        {stock === 0 ? (
                            <p className='text-red-500'>Out of stock</p>
                        ) : cartItem ? (
                            <div className='flex items-center gap-3 h-8 border-2 border-green-500 rounded-lg overflow-hidden w-fit'>
                                <Button
                                    onClick={() => decreaseQty(_id)}
                                    className='px-2'>
                                    <Minus size={16} />
                                </Button>
                                <span>{cartItem.quantity}</span>
                                <Button
                                    onClick={() => increaseQty(_id)}
                                    disabled={cartItem.quantity >= stock}
                                    className='px-2'>
                                    <Plus size={16} />
                                </Button>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-3 '>
                                <Button
                                    onClick={() => addToCart(selectedProduct)}
                                    variant='primary'
                                    className='py-2.5'
                                    disabled={stock === 0}>
                                    Add to Cart
                                </Button>
                                <LinkButton
                                    onClick={() => addToCart(selectedProduct)}
                                    to='/cart'
                                    variant='outline'
                                    className='py-2.5'
                                    disabled={stock === 0}>
                                    Buy Now
                                </LinkButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
