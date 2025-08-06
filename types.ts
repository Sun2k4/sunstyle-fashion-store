
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  id: number;
  quantity: number;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface ToastState {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}
