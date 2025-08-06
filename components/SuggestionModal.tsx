
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SuggestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    suggestion: string;
    isLoading: boolean;
}

const SuggestionModal: React.FC<SuggestionModalProps> = ({ isOpen, onClose, suggestion, isLoading }) => {
    if (!isOpen) return null;

    const formattedSuggestion = suggestion
      .replace(/### (.*)/g, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[70] p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col transform transition-transform duration-300 ease-in-out"
                onClick={(e) => e.stopPropagation()}
                style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800">✨ Gợi Ý Từ Stylist AI</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><i className="fas fa-times fa-lg"></i></button>
                </div>
                <div className="p-6 overflow-y-auto markdown-content">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-48">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: formattedSuggestion }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuggestionModal;
