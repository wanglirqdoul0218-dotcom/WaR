import React from 'react';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';

interface MessageListDetailProps {
  type: 'LIKES' | 'COMMENTS';
  onBack: () => void;
}

export const MessageListDetail: React.FC<MessageListDetailProps> = ({ type, onBack }) => {
  const isLike = type === 'LIKES';

  return (
    <div className="fixed inset-0 bg-[#f8fafc] z-[60] flex flex-col animate-[slideRight_0.3s_ease-out]">
      <style>{`@keyframes slideRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
      
      {/* Header */}
      <div className="bg-white px-4 h-14 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-50 rounded-full">
           <ArrowLeft size={24} className="text-slate-700" />
        </button>
        <span className="font-bold text-slate-800 text-lg">{isLike ? '收到的赞' : '评论回复'}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
         {/* Mock List */}
         {[1, 2, 3].map((i) => (
           <div key={i} className="bg-white p-4 rounded-2xl mb-3 shadow-sm flex gap-3">
              <img src={`https://picsum.photos/50/${50 + i}`} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                 <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-700 text-sm">某同学 {i}</span>
                    <span className="text-xs text-gray-400">10:2{i}</span>
                 </div>
                 <div className="text-sm text-gray-600 mb-2">
                    {isLike ? '赞了你的帖子' : '回复了你：确实，我也觉得学校食堂的饭挺好吃的！'}
                 </div>
                 {/* Source Content Preview */}
                 <div className="bg-gray-50 p-2 rounded-lg flex items-center gap-2">
                    {isLike && <div className="w-8 h-8 bg-gray-200 rounded-md flex-shrink-0"></div>}
                    <div className="text-xs text-gray-400 truncate">
                      {isLike ? '帖子内容预览...' : '你的评论：二食堂的红烧肉一绝...'}
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};