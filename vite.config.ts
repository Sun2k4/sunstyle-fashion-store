import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
        // ✨ Dòng này rất quan trọng để deploy đúng trên Render ✨
        base: './',

        // Cần có plugin này để chạy React
        plugins: [react()], 

        // Cấu hình biến môi trường của bạn
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },

        // Cấu hình alias đường dẫn của bạn
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});
