
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onAddToCart: (id: number) => void;
}

const formatCurrency = (number: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden group relative">
            <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
                <p className="text-indigo-600 font-bold text-xl">{formatCurrency(product.price)}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <button
                    onClick={() => onAddToCart(product.id)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
