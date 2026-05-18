import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Store } from "lucide-react";
import { LinkButton } from "../shared/ui/Button";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='text-white bg-green-700'>
            <div className='grid grid-cols-1 max-w-6xl mx-auto px-4 py-10 gap-8 md:grid-cols-4'>
                {/* About */}
                <div>
                    <LinkButton
                        to='/'
                        className='text-orange-400 mb-2'
                        variant='plain'>
                        <Store className='w-8 h-8' />
                        <span className='text-3xl font-extrabold'>FreshMart</span>
                    </LinkButton>
                    <p className='text-center sm:text-start'>Your one-stop online store for fresh groceries, fruits, vegetables, and daily essentials.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className='mb-4 text-lg font-semibold'>Quick Links</h3>
                    <ul className='space-y-2'>
                        <li>
                            <Link
                                to='/'
                                className='hover:underline transition-colors'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/shop'
                                className='hover:underline transition-colors'>
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/about'
                                className='hover:underline transition-colors'>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/contact'
                                className='hover:underline transition-colors'>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className='mb-4 text-lg font-semibold'>Customer Service</h3>
                    <ul className='space-y-2'>
                        <li>
                            <Link
                                to='/faq'
                                className='hover:underline transition-colors'>
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/shipping'
                                className='hover:underline transition-colors'>
                                Shipping & Returns
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/privacy'
                                className='hover:underline transition-colors'>
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/terms'
                                className='hover:underline transition-colors'>
                                Terms & Conditions
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className='mb-4 text-lg font-semibold'>Contact Us</h3>
                    <ul className='space-y-2'>
                        <li className='flex items-center gap-2'>
                            <Mail size={18} />
                            <a
                                href='mailto:support@grocerystore.com'
                                className='hover:underline transition-colors'>
                                support@grocerystore.com
                            </a>
                        </li>
                        <li className='flex items-center gap-2'>
                            <Phone size={18} />
                            <a
                                href='tel:+919876543210'
                                className='hover:underline transition-colors'>
                                +91 98765 43210
                            </a>
                        </li>
                        <li className='flex items-center gap-2'>
                            <MapPin size={18} />
                            <address className='not-italic'>123 Market Street, Chennai, India</address>
                        </li>
                    </ul>
                    <div className='flex space-x-4 mt-4'>
                        <a
                            href='https://facebook.com'
                            aria-label='Visit our Facebook page'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:text-gray-300 transition-colors'>
                            <Facebook size={20} />
                        </a>
                        <a
                            href='https://instagram.com'
                            aria-label='Visit our Instagram page'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:text-gray-300 transition-colors'>
                            <Instagram size={20} />
                        </a>
                        <a
                            href='https://twitter.com'
                            aria-label='Visit our Twitter page'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:text-gray-300 transition-colors'>
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='mt-8 pt-4 text-center text-sm border-t border-green-600'>© {currentYear} GroceryStore. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
