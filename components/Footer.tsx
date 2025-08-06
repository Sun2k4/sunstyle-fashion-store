
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; 2025 SunStyle. Mọi quyền được bảo lưu.</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="hover:text-indigo-400 transition duration-300"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="hover:text-indigo-400 transition duration-300"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="hover:text-indigo-400 transition duration-300"><i className="fab fa-tiktok"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
