
import React from 'react';

interface ChatToggleButtonProps {
    onToggle: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ onToggle }) => {
    return (
        <button 
            onClick={onToggle}
            className="fixed bottom-5 right-5 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-indigo-700 transition-transform transform hover:scale-110"
        >
            <i className="fas fa-comment-dots fa-2x"></i>
        </button>
    );
};

export default ChatToggleButton;
