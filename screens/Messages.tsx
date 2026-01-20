import React from 'react';
import { ChatMessage } from '../types';
import { Bell, MessageCircle, Heart } from 'lucide-react';

interface MessagesProps {
  onChatClick?: (chat: ChatMessage) => void;
  onViewLikes?: () => void;
  onViewComments?: () => void;
}

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: '系统通知',
    content: '恭喜！您的“寻物启事”帖子已通过审核。',
    time: '09:41',
    unread: true,
    avatar: 'https://ui-avatars.com/api/?name=System&background=6366f1&color=fff&bold=true'
  },
  {
    id: '2',
    sender: '张伟',
    content: '同学你好，请问那个键盘还在吗？',
    time: '昨天',
    unread: false,
    avatar: 'https://picsum.photos/101/101'
  }
];

export const Messages: React.FC<MessagesProps> = ({ onChatClick, onViewLikes, onViewComments }) => {
  return (
    <div className="pb-4 min-h-full">
      <div className="bg-white sticky top-0 z-40 px-5 py-4 shadow-sm/50 rounded-b-3xl">
        <h1 className="font-extrabold text-xl text-gray-900">消息中心</h1>
      </div>

      {/* Top Action Bar */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-4 mb-6">
         <button 
           onClick={onViewLikes}
           className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center">
               <Heart size={24} className="fill-current" />
            </div>
            <div className="text-left">
               <div className="font-bold text-gray-800 text-sm">收到的赞</div>
               <div className="text-[10px] text-gray-400">查看详情</div>
            </div>
         </button>
         <button 
           onClick={onViewComments}
           className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center">
               <MessageCircle size={24} className="fill-current" />
            </div>
             <div className="text-left">
               <div className="font-bold text-gray-800 text-sm">评论回复</div>
               <div className="text-[10px] text-gray-400">查看详情</div>
            </div>
         </button>
      </div>

      {/* Chat List */}
      <div className="px-4 space-y-3">
        {MOCK_MESSAGES.map(msg => (
          <div 
            key={msg.id} 
            onClick={() => onChatClick && onChatClick(msg)}
            className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 active:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="relative flex-shrink-0">
               <img src={msg.avatar} alt={msg.sender} className="w-14 h-14 rounded-full object-cover border border-gray-100" />
               {msg.unread && <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white"></div>}
            </div>
            <div className="flex-1 min-w-0">
               <div className="flex justify-between items-center mb-1">
                 <h3 className="font-bold text-gray-900 truncate text-sm">{msg.sender}</h3>
                 <span className={`text-[10px] ${msg.unread ? 'text-indigo-500 font-bold' : 'text-gray-400'}`}>{msg.time}</span>
               </div>
               <p className={`text-xs truncate ${msg.unread ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};