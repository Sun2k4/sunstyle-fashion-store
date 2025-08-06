
import React, { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    
    return (
        <div 
            className={`fixed top-20 right-5 text-white py-2 px-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out z-[80] ${bgColor} ${isVisible ? 'translate-x-0' : 'translate-x-[120%]'}`}
        >
            <p>{message}</p>
        </div>
    );
};

export default Toast;
