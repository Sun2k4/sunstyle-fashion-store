
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CartItem, ChatMessage, ToastState, Product } from './types';
import { PRODUCTS } from './constants';
import { getOutfitSuggestion, getChatResponse } from './services/geminiService';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import SuggestionModal from './components/SuggestionModal';
import ChatWidget from './components/ChatWidget';
import ChatToggleButton from './components/ChatToggleButton';
import Toast from './components/Toast';

const App: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
    const [suggestion, setSuggestion] = useState('');
    const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        { sender: 'bot', text: 'Chào bạn! Tôi là Sunny, trợ lý AI của SunStyle. Tôi có thể giúp gì cho bạn?' }
    ]);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', visible: false });

    const productSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedCart = localStorage.getItem('sunstyle_cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sunstyle_cart', JSON.stringify(cart));
    }, [cart]);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type, visible: true });
        setTimeout(() => {
            setToast(prev => ({ ...prev, visible: false }));
        }, 3000);
    };

    const handleAddToCart = useCallback((productId: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { id: productId, quantity: 1 }];
        });
        showToast('Đã thêm sản phẩm vào giỏ!');
    }, []);

    const handleQuantityChange = useCallback((productId: number, change: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + change } : item
            );
            return updatedCart.filter(item => item.quantity > 0);
        });
    }, []);

    const handleRemoveFromCart = useCallback((productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        showToast('Đã xóa sản phẩm khỏi giỏ.', 'error');
    }, []);
    
    const handleCheckout = useCallback(() => {
        if (cart.length > 0) {
            alert('Chức năng thanh toán đang được phát triển. Cảm ơn bạn đã ghé thăm SunStyle!');
            setCart([]);
            setIsCartOpen(false);
        }
    }, [cart]);

    const handleGetSuggestion = useCallback(async () => {
        if (cart.length === 0) return;
        
        setIsSuggestionModalOpen(true);
        setIsSuggestionLoading(true);
        setSuggestion('');

        const cartProductNames = cart.map(item => {
            const product = PRODUCTS.find(p => p.id === item.id);
            return product ? product.name : '';
        }).filter(name => name).join(', ');

        try {
            const response = await getOutfitSuggestion(cartProductNames);
            setSuggestion(response);
        } catch (error) {
            console.error(error);
            setSuggestion('Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setIsSuggestionLoading(false);
        }
    }, [cart]);
    
    const handleSearchForProduct = useCallback((productName: string) => {
        // This is a dummy function to illustrate how to trigger search from chat.
        // The actual search state is managed within ProductSection.
        // To make this work, we'd need to lift state up or use a more complex method.
        // For now, we scroll and can manually update a search term if we lift state.
        if (productSectionRef.current) {
            const searchInput = productSectionRef.current.querySelector('#search-input') as HTMLInputElement;
            if (searchInput) {
                 searchInput.value = productName;
                 // Dispatch an input event to trigger the filter in ProductSection
                 const event = new Event('input', { bubbles: true });
                 searchInput.dispatchEvent(event);
            }
            productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            showToast(`Đang hiển thị: ${productName}`);
            setIsChatOpen(false);
        }
    }, []);

    const handleSendChatMessage = useCallback(async (message: string) => {
        if (!message.trim()) return;

        setChatMessages(prev => [...prev, { sender: 'user', text: message }]);
        setIsChatLoading(true);

        const productList = PRODUCTS.map(p => p.name).join(', ');

        try {
            const response = await getChatResponse(message, productList);
            setChatMessages(prev => [...prev, { sender: 'bot', text: response }]);
        } catch (error) {
            console.error(error);
            setChatMessages(prev => [...prev, { sender: 'bot', text: 'Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại sau.' }]);
        } finally {
            setIsChatLoading(false);
        }
    }, []);

    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
            <main>
                <Hero />
                <div ref={productSectionRef}>
                    <ProductSection onAddToCart={handleAddToCart} />
                </div>
                <About />
                <Contact />
            </main>
            <Footer />
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cart}
                products={PRODUCTS}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveFromCart}
                onCheckout={handleCheckout}
                onGetSuggestion={handleGetSuggestion}
            />
            <SuggestionModal
                isOpen={isSuggestionModalOpen}
                onClose={() => setIsSuggestionModalOpen(false)}
                suggestion={suggestion}
                isLoading={isSuggestionLoading}
            />
            <ChatWidget
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                messages={chatMessages}
                onSendMessage={handleSendChatMessage}
                isLoading={isChatLoading}
                onProductLinkClick={handleSearchForProduct}
            />
            <ChatToggleButton onToggle={() => setIsChatOpen(prev => !prev)} />
            <Toast message={toast.message} type={toast.type} isVisible={toast.visible} />
        </>
    );
};

export default App;
