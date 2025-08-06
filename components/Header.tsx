
import React, { useState } from 'react';

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { href: 'home', text: 'Trang Chủ' },
        { href: 'products', text: 'Sản Phẩm' },
        { href: 'about', text: 'Về Chúng Tôi' },
        { href: 'contact', text: 'Liên Hệ' },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-3xl font-bold text-gray-900">Sun<span className="text-indigo-600">Style</span></a>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                         <a key={link.href} href={`#${link.href}`} onClick={(e) => handleNavClick(e, link.href)} className="text-gray-600 hover:text-indigo-600 transition duration-300">{link.text}</a>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={onCartClick} className="relative text-gray-600 hover:text-indigo-600 transition duration-300">
                        <i className="fas fa-shopping-cart fa-lg"></i>
                        <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItemCount}</span>
                    </button>
                    <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <i className="fas fa-bars fa-lg"></i>
                    </button>
                </div>
            </nav>
            {isMobileMenuOpen && (
                 <div className="md:hidden bg-white py-2">
                    {navLinks.map(link => (
                        <a key={link.href} href={`#${link.href}`} onClick={(e) => handleNavClick(e, link.href)} className="block px-6 py-2 text-sm text-gray-600 hover:bg-indigo-50">{link.text}</a>
                    ))}
                 </div>
            )}
        </header>
    );
};

export default Header;
