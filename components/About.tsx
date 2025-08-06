
import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="bg-white py-16">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop" alt="Về chúng tôi" className="rounded-lg shadow-xl" />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">Về Sun<span className="text-indigo-600">Style</span></h2>
                    <p className="text-gray-600 mb-4">SunStyle không chỉ là một thương hiệu thời trang, mà còn là nguồn cảm hứng cho những ai yêu thích sự tự do, phóng khoáng và luôn muốn thể hiện chất riêng. Chúng tôi tin rằng trang phục là cách bạn kể câu chuyện về chính mình.</p>
                    <p className="text-gray-600">Với những thiết kế độc đáo, chất liệu cao cấp và sự tỉ mỉ trong từng đường may, SunStyle cam kết mang đến cho bạn những trải nghiệm mua sắm tuyệt vời nhất.</p>
                </div>
            </div>
        </section>
    );
};

export default About;
