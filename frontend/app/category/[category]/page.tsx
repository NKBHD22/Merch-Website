import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

async function getProductsByCategory(category: string): Promise<Product[]> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/products`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }

        const products: Product[] = await res.json();

        return products.filter(
            (product) => product.category.toLowerCase() === category.toLowerCase()
        );
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    const products = await getProductsByCategory(categoryName);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Brutalist Category Header */}
                <div className="mb-12 border-8 border-black p-8 bg-white brutalist-border">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none kinetic-title">
                        {categoryName.toUpperCase()}
                    </h1>
                    <p className="text-2xl font-mono mt-4 border-l-8 border-black pl-4 uppercase tracking-wide">
                        {products.length} {products.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 border-8 border-black brutalist-border">
                        <p className="text-4xl font-black uppercase mb-4">NO PRODUCTS</p>
                        <p className="text-lg font-mono uppercase tracking-wider">IN THIS CATEGORY</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <div key={product._id} className="stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Brutalist Footer */}
            <footer className="border-t-8 border-black bg-white mt-20 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-2xl font-black uppercase tracking-wider">
                        MAVERICKS © 2026
                    </p>
                </div>
            </footer>
        </div>
    );
}
