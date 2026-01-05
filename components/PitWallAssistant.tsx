
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Terminal, HelpCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const PitWallAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([
    { role: 'bot', content: "Mentor Bot active. Telemetry checks out. How can I help you optimize your hack today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // Create new instance with existing API_KEY as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        // Using Pro model for complex technical assistance and F1-themed reasoning
        model: 'gemini-3-pro-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are the 'HackX Mentor AI'. You help hackers participating in the HACKX F1-themed hackathon. Be helpful, technically astute, and use F1 analogies for problem-solving (e.g., 'Let's optimize this function like a pit stop', 'Your frontend needs more aerodynamic styling'). Focus on speed, efficiency, and innovation.",
          temperature: 0.8,
        },
      });

      // Extract text directly from response.text property
      setMessages(prev => [...prev, { role: 'bot', content: response.text || "Connection blackout. Re-transmitting..." }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Mentorship signal lost. Check your local firewall." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 40, scale: 0.9, rotateX: 20 }}
            className="mb-6 w-[400px] bg-white/95 backdrop-blur-3xl border border-white shadow-[0_30px_100px_rgba(0,0,0,0.2)] rounded-[40px] overflow-hidden flex flex-col h-[600px] perspective-1000"
          >
            <div className="p-6 bg-black flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20">
                  <Terminal size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Mentor AI</h3>
                  <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Innovation Support</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#fcfcfc]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[28px] text-[12px] leading-relaxed font-medium shadow-sm border ${
                    m.role === 'user' 
                      ? 'bg-red-600 text-white rounded-br-none border-red-600' 
                      : 'bg-white text-black/80 rounded-bl-none border-black/5'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-black/5 p-4 rounded-full flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border-t border-black/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Need debugging help?"
                  className="w-full bg-black/5 border border-transparent rounded-[24px] py-4 pl-6 pr-14 text-xs font-bold focus:outline-none focus:bg-white focus:border-red-600/20 transition-all placeholder:text-black/20"
                />
                <button 
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                >
                  <Send size={16} className="text-white" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center space-x-4 opacity-30">
                <div className="flex items-center space-x-1">
                  <HelpCircle size={10} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">AI Documentation</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-black rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center text-white border-2 border-white/10 relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
        <MessageSquare size={32} />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center border-4 border-[#f8f9fa]">
            <span className="w-2 h-2 bg-white rounded-full animate-ping" />
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default PitWallAssistant;
