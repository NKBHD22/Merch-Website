'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="brutalist-border brutalist-card-hover bg-white overflow-hidden group">
            <div className="relative h-64 w-full bg-gray-100 border-b-4 border-black overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 font-bold uppercase text-xs tracking-wider border-2 border-white">
                    {product.category}
                </div>
            </div>
            <div className="p-4 bg-white">
                <h3 className="text-xl font-black uppercase tracking-tight mb-2 leading-tight">
                    {product.name}
                </h3>
                <p className="text-sm font-mono mb-4 leading-relaxed border-l-4 border-black pl-2">
                    {product.description}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-3xl font-black tracking-tighter">
                        INR {product.price.toLocaleString('en-IN')}
                    </span>
                    <button
                        onClick={handleAdd}
                        className={`brutalist-button text-xs px-4 py-2 transition-colors ${added ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        {added ? 'ADDED!' : 'ADD'}
                    </button>
                </div>
            </div>
        </div>
    );
}

