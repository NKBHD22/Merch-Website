'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItems } = useCart();

    const categories = [
        { name: 'MEN', href: '/category/men' },
        { name: 'WOMEN', href: '/category/women' },
        { name: 'ACCESSORIES', href: '/category/accessories' },
    ];

    return (
        <>
            <nav className="bg-white border-b-8 border-black sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo with kinetic typography */}
                        <Link
                            href="/"
                            className="text-4xl font-black tracking-tighter text-black hover:kinetic-title transition-all uppercase flex-shrink-0"
                        >
                            MAVER<span className="inline-block rotate-12 text-red-600">ICKS</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-2 items-center">
                            {categories.map((category, index) => (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    className="hover:translate-y-[-2px] transition-transform font-black uppercase text-sm px-4"
                                >
                                    {category.name}
                                </Link>
                            ))}

                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="brutalist-button text-sm ml-4 kinetic-title"
                            >
                                CART ({totalItems})
                            </button>
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex md:hidden items-center space-x-2">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="brutalist-button text-xs px-3 py-2"
                            >
                                CART ({totalItems})
                            </button>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="brutalist-button text-xs px-3 py-2"
                            >
                                {isOpen ? 'X' : 'MENU'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden border-t-4 border-black bg-white p-4 space-y-3">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                href={category.href}
                                className="font-black border-2 border-black p-4 block text-center uppercase"
                                onClick={() => setIsOpen(false)}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
