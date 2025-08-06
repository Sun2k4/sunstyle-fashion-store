
import React from 'react';
import { CartItem, Product } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    products: Product[];
    onQuantityChange: (productId: number, change: number) => void;
    onRemoveItem: (productId: number) => void;
    onCheckout: () => void;
    onGetSuggestion: () => void;
}

const formatCurrency = (number: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, products, onQuantityChange, onRemoveItem, onCheckout, onGetSuggestion }) => {
    const total = cartItems.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-[60] transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-md bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out"
                onClick={(e) => e.stopPropagation()}
                style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
            >
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-6 border-b">
                        <h3 className="text-2xl font-bold">Giỏ Hàng</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><i className="fas fa-times fa-lg"></i></button>
                    </div>
                    <div className="flex-grow p-6 overflow-y-auto">
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500 text-center">Giỏ hàng của bạn đang trống.</p>
                        ) : (
                            cartItems.map(item => {
                                const product = products.find(p => p.id === item.id);
                                if (!product) return null;
                                return (
                                    <div key={item.id} className="flex items-center justify-between mb-4 pb-4 border-b last:border-b-0">
                                        <div className="flex items-center gap-4">
                                            <img src={product.image} alt={product.name} className="w-16 h-20 object-cover rounded-md"/>
                                            <div>
                                                <h4 className="font-semibold">{product.name}</h4>
                                                <p className="text-sm text-gray-500">{formatCurrency(product.price)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border rounded">
                                                <button onClick={() => onQuantityChange(product.id, -1)} className="quantity-change-btn decrease-btn px-2 py-1">-</button>
                                                <span className="px-2">{item.quantity}</span>
                                                <button onClick={() => onQuantityChange(product.id, 1)} className="quantity-change-btn increase-btn px-2 py-1">+</button>
                                            </div>
                                            <button onClick={() => onRemoveItem(product.id)} className="remove-btn text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div className="p-6 border-t">
                        <div className="mb-4">
                             <button onClick={onGetSuggestion} disabled={cartItems.length === 0} className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                ✨ Gợi ý phối đồ AI
                            </button>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium">Tổng cộng:</span>
                            <span className="text-xl font-bold text-indigo-600">{formatCurrency(total)}</span>
                        </div>
                        <button onClick={onCheckout} disabled={cartItems.length === 0} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300 disabled:bg-gray-400">Thanh Toán</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
