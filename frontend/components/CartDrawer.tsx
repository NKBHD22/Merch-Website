'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white border-l-8 border-black h-full flex flex-col slide-in shadow-[-20px_0_0_0_rgba(0,0,0,1)]">
                <div className="p-6 border-b-4 border-black flex justify-between items-center bg-white">
                    <h2 className="text-3xl font-black uppercase tracking-tighter">YOUR CART ({totalItems})</h2>
                    <button
                        onClick={onClose}
                        className="brutalist-button text-xs px-4 py-2"
                    >
                        CLOSE
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="text-center py-20 border-4 border-dashed border-black">
                            <p className="font-black uppercase text-xl">EMPTY CART</p>
                            <p className="font-mono text-sm uppercase mt-2">GO GET SOME STUFF</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item._id} className="brutalist-border-sm p-3 bg-white flex gap-4">
                                <div className="relative w-20 h-20 border-2 border-black flex-shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black uppercase truncate text-sm">{item.name}</h3>
                                    <p className="font-black text-lg">INR {item.price.toLocaleString('en-IN')}</p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="w-8 h-8 border-2 border-black flex items-center justify-center font-black hover:bg-black hover:text-white"
                                        >
                                            -
                                        </button>
                                        <span className="font-black w-6 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="w-8 h-8 border-2 border-black flex items-center justify-center font-black hover:bg-black hover:text-white"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="ml-auto text-[10px] font-black uppercase underline hover:text-red-500"
                                        >
                                            REMOVE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t-8 border-black bg-white">
                    <div className="flex justify-between items-end mb-6">
                        <span className="font-mono uppercase text-sm">TOTAL</span>
                        <span className="font-black text-4xl tracking-tighter">INR {totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                        className="brutalist-button w-full text-xl py-4 kinetic-title"
                        disabled={cart.length === 0}
                        onClick={() => alert('Brutalist Checkout Not Implemented - This is a Demo!')}
                    >
                        CHECKOUT NOOOOW
                    </button>
                </div>
            </div>
        </div>
    );
}
