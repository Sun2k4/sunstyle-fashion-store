
import React from 'react';

const Hero: React.FC = () => {
    const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="h-[60vh] text-white flex items-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')" }}>
            <div className="container mx-auto px-6 text-center md:text-left">
                <div className="bg-black bg-opacity-40 p-8 rounded-lg inline-block">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Bộ Sưu Tập Mùa Hè</h1>
                    <p className="text-lg md:text-xl mb-6">Khám phá phong cách mới, thể hiện cá tính của bạn.</p>
                    <a href="#products" onClick={handleScrollToProducts} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">Mua Ngay</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
