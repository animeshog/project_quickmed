
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  isTyping?: boolean;
};

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your QuickMED assistant. Please describe your symptoms in detail, and I'll help you find the right solution.",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add typing indicator
    const typingIndicator: Message = {
      id: "typing",
      content: "",
      isUser: false,
      isTyping: true,
    };
    
    setTimeout(() => {
      setMessages((prev) => [...prev, typingIndicator]);
    }, 500);

    // Simulate AI response (this would be replaced with actual backend call)
    setTimeout(() => {
      setIsLoading(false);
      
      // Remove typing indicator
      setMessages((prev) => prev.filter(msg => msg.id !== "typing"));
      
      // Add AI response
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for sharing that. Could you tell me more about when the symptoms started? Have you noticed any other symptoms like nausea, dizziness, or changes in appetite?",
        isUser: false,
      };
      
      setMessages((prev) => [...prev, botResponse]);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <h1 className="text-xl font-bold text-blue-600">QuickMED Chat</h1>
      </header>
      
      <main className="flex-1 flex flex-col p-4 md:p-6 max-w-4xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <Card
                className={`px-4 py-3 max-w-[80%] ${
                  message.isUser
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {message.isTyping ? (
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                ) : (
                  <p className="text-sm md:text-base">{message.content}</p>
                )}
              </Card>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            placeholder="Describe your symptoms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 resize-none"
            rows={2}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="h-auto bg-blue-600 hover:bg-blue-700"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Chat;
