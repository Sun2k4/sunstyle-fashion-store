
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the key is always present.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

async function generateContentWithRetry(prompt: string, retries = 3, delay = 1000): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Gemini API call failed, retrying in ${delay}ms... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, delay));
            return generateContentWithRetry(prompt, retries - 1, delay * 2);
        } else {
            console.error("Gemini API call failed after multiple retries:", error);
            throw new Error("Failed to get response from AI service.");
        }
    }
}

export const getOutfitSuggestion = async (cartProductNames: string): Promise<string> => {
    const prompt = `Là một stylist thời trang cho cửa hàng SunStyle, hãy tạo 2-3 gợi ý phối đồ dựa trên các sản phẩm sau trong giỏ hàng của khách: ${cartProductNames}. Đối với mỗi gợi ý, hãy đặt cho nó một cái tên thật kêu (ví dụ: 'Dạo Phố Năng Động'). Mô tả cách phối các món đồ với nhau và gợi ý MỘT loại sản phẩm khác từ cửa hàng (ví dụ: 'một đôi giày sneaker trắng', 'một chiếc vòng cổ ấn tượng', hoặc 'một chiếc thắt lưng da') để hoàn thiện bộ trang phục. Trả lời bằng tiếng Việt. Định dạng đầu ra bằng Markdown với tiêu đề ### cho mỗi bộ đồ và bôi đậm tên gợi ý. Hãy sáng tạo và khích lệ khách hàng.`;
    return generateContentWithRetry(prompt);
};

export const getChatResponse = async (userMessage: string, productList: string): Promise<string> => {
    const prompt = `Bạn là Sunny, một trợ lý thời trang thân thiện của cửa hàng SunStyle.
    Danh sách sản phẩm của cửa hàng: ${productList}.
    Khi bạn nhắc đến một sản phẩm, hãy bọc tên chính xác của nó trong dấu ngoặc vuông kép, ví dụ: "Bên mình có mẫu [[Áo Thun Basic Cotton]] rất hợp với bạn đó.".
    Hãy trả lời ngắn gọn, hữu ích bằng tiếng Việt.
    Câu hỏi của khách hàng: "${userMessage}"`;
    return generateContentWithRetry(prompt);
};
