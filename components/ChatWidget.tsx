
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { ChatMessage } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface ChatWidgetProps {
    isOpen: boolean;
    onClose: () => void;
    messages: ChatMessage[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    onProductLinkClick: (productName: string) => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, messages, onSendMessage, isLoading, onProductLinkClick }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSend = () => {
        onSendMessage(input);
        setInput('');
    };
    
    const parseMessage = (text: string): ReactNode[] => {
        const parts = text.split(/(\[\[.*?\]\])/g);
        return parts.map((part, index) => {
            const match = part.match(/\[\[(.*?)\]\]/);
            if (match) {
                const productName = match[1];
                return (
                    <a 
                        key={index} 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); onProductLinkClick(productName); }}
                        className="text-indigo-600 font-bold hover:underline"
                    >
                        {productName}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div className={`fixed bottom-24 right-5 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col z-40 transition-all duration-300 ease-in-out ${isOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-4'}`}>
            <div className="bg-indigo-600 text-white p-3 rounded-t-lg flex justify-between items-center">
                <h3 className="font-semibold">Hỗ trợ bởi Gemini AI</h3>
                <button onClick={onClose} className="text-white hover:text-gray-200"><i className="fas fa-times"></i></button>
            </div>
            <div className="flex-grow p-3 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        <div className={`${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200'} p-2 rounded-lg max-w-[80%]`}>
                            <p className="text-sm">{msg.sender === 'bot' ? parseMessage(msg.text) : msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex mb-3">
                         <div className="bg-gray-200 p-2 rounded-lg">
                            <LoadingSpinner />
                         </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-2 border-t flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Nhập tin nhắn..."
                    className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button onClick={handleSend} className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700"><i className="fas fa-paper-plane"></i></button>
            </div>
        </div>
    );
};

export default ChatWidget;
