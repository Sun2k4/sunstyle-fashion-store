
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from './ProductCard';

interface ProductSectionProps {
    onAddToCart: (productId: number) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ onAddToCart }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    const filteredProducts = useMemo(() => {
        let filtered = [...PRODUCTS];
        if (activeCategory !== 'Tất cả') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return filtered;
    }, [searchTerm, activeCategory]);

    return (
        <section id="products" className="py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-4">Tất Cả Sản Phẩm</h2>
                <p className="text-center text-gray-500 mb-10">Tìm kiếm và lựa chọn sản phẩm phù hợp với bạn</p>
                <div className="mb-10 p-4 bg-white rounded-lg shadow">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full md:w-auto">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><i className="fas fa-search"></i></span>
                            <input
                                type="text"
                                id="search-input"
                                placeholder="Tìm kiếm tên sản phẩm..."
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 border rounded-lg transition ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-100'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">Không tìm thấy sản phẩm nào phù hợp.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
