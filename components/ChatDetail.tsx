import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MoreHorizontal, Phone, Video, Send, Smile, Plus } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatDetailProps {
  chat: ChatMessage;
  onBack: () => void;
}

export const ChatDetail: React.FC<ChatDetailProps> = ({ chat, onBack }) => {
  const [messageText, setMessageText] = useState('');
  const [history, setHistory] = useState([
    { id: 'h1', text: chat.content, isMe: false, time: chat.time },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = () => {
    if (!messageText.trim()) return;
    setHistory([...history, { id: Date.now().toString(), text: messageText, isMe: true, time: '刚刚' }]);
    setMessageText('');
    
    // Auto reply simulation
    setTimeout(() => {
        setHistory(prev => [...prev, { id: Date.now().toString(), text: '好的，没问题！👌', isMe: false, time: '刚刚' }]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-[#f0f4f8] z-[60] flex flex-col animate-[slideRight_0.3s_ease-out]">
      <style>{`
        @keyframes slideRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Navbar */}
      <div className="bg-white px-4 h-14 flex items-center justify-between border-b border-gray-100 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-700 hover:bg-gray-50 rounded-full">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="relative">
                <img src={chat.avatar} className="w-8 h-8 rounded-full border border-gray-200" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <span className="font-bold text-slate-800">{chat.sender}</span>
          </div>
        </div>
        <div className="flex gap-4 text-slate-600">
           <Phone size={20} />
           <Video size={20} />
           <MoreHorizontal size={20} />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        <div className="text-center text-xs text-gray-300 py-4">
           {chat.time}
        </div>
        {history.map(msg => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
             {!msg.isMe && <img src={chat.avatar} className="w-8 h-8 rounded-full mr-2 self-end border border-white" />}
             <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
               msg.isMe 
                 ? 'bg-sky-500 text-white rounded-tr-none' 
                 : 'bg-white text-slate-700 rounded-tl-none'
             }`}>
               {msg.text}
             </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white px-4 py-2 safe-area-bottom border-t border-gray-100 flex items-end gap-3">
        <button className="p-2 text-gray-400 mb-0.5">
           <Plus size={24} />
        </button>
        <div className="flex-1 bg-gray-100 rounded-2xl min-h-[40px] px-3 py-2 mb-1">
          <textarea 
            rows={1}
            className="w-full bg-transparent outline-none text-slate-700 text-sm resize-none"
            placeholder="发消息..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </div>
        <button className="p-2 text-gray-400 mb-0.5">
           <Smile size={24} />
        </button>
        {messageText.trim().length > 0 && (
           <button onClick={handleSend} className="p-2 bg-sky-500 text-white rounded-full mb-1 shadow-md animate-in zoom-in">
              <Send size={18} />
           </button>
        )}
      </div>
    </div>
  );
};