
import React from 'react';

const Contact: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ sớm phản hồi.');
    };

    return (
        <section id="contact" className="py-16">
             <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10">Liên Hệ Với Chúng Tôi</h2>
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input type="text" placeholder="Tên của bạn" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <input type="email" placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <textarea placeholder="Nội dung tin nhắn..." rows={5} required className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">Gửi Tin Nhắn</button>
                    </form>
                </div>
             </div>
        </section>
    );
};

export default Contact;
