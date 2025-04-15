import { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  received: boolean;
  read: boolean;
}

interface ChatContextType {
  messages: Message[];
  unreadCount: number;
  sendMessage: (text: string) => void;
  markAllAsRead: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const unreadCount = messages.filter(m => m.received && !m.read).length;

  const sendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'Você',
      text,
      time: format(new Date(), 'HH:mm'),
      received: false,
      read: true
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulated response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'Cazé tv',
        text: generateResponse(text),
        time: format(new Date(), 'HH:mm'),
        received: true,
        read: false
      };
      setMessages(prev => [...prev, response]);
    }, 1000 + Math.random() * 2000);
  };

  const markAllAsRead = () => {
    setMessages(prev =>
      prev.map(msg => msg.received ? { ...msg, read: true } : msg)
    );
  };

  return (
    <ChatContext.Provider value={{
      messages,
      unreadCount,
      sendMessage,
      markAllAsRead
    }}>
      {children}
    </ChatContext.Provider>
  );
}

function generateResponse(text: string): string {
  const responses = [
    "E aí, tudo bem? Que legal você falar sobre isso!",
    "O que você achou do último jogo?",
    "To preparando um vídeo novo sobre isso, vai ficar incrível!",
    "Valeu pela mensagem! Vou abordar esse tema em breve.",
    "Show! Continue acompanhando que vem mais conteúdo por aí!"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};