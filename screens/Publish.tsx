import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, MapPin, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { Tab, PostType, Post } from '../types';

interface PublishProps {
  onCancel: () => void;
  onSubmit: (post: Partial<Post>) => void;
  initialType?: PostType;
}

export const Publish: React.FC<PublishProps> = ({ onCancel, onSubmit, initialType }) => {
  const [postType, setPostType] = useState<PostType>(initialType || PostType.SOCIAL);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit({
        type: postType,
        content: content,
        isAnonymous: isAnonymous,
        price: price ? Number(price) : undefined,
        deadline: deadline,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white animate-[slideUp_0.3s_ease-out]">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-white">
        <button 
          onClick={onCancel} 
          className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        <button 
          onClick={handleSubmit}
          className={`px-6 py-2 rounded-full text-sm font-bold text-white transition-all shadow-md ${
            content.length > 0 
              ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 active:scale-95' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          }`}
          disabled={content.length === 0}
        >
          发布
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10">
        {/* Type Selector Pills */}
        <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar py-1">
          {[
            { id: PostType.SOCIAL, label: '日常动态' },
            { id: PostType.LOST_FOUND, label: '失物招领' },
            { id: PostType.TRADE, label: '闲置转让' },
            { id: PostType.ERRAND, label: '跑腿求助' }
          ].map((type) => (
            <button 
              key={type.id}
              onClick={() => setPostType(type.id)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-2xl text-sm font-bold border transition-all duration-200 ${
                postType === type.id 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Text Area */}
        <div className="relative mb-6">
          <textarea
            className="w-full min-h-[160px] text-lg text-gray-800 placeholder-gray-300 focus:outline-none resize-none leading-relaxed"
            placeholder={
              postType === PostType.ERRAND ? "需要帮忙带什么？送到哪里？..." : 
              postType === PostType.TRADE ? "描述一下宝贝的成色、入手渠道..." :
              "分享当下的新鲜事..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          ></textarea>
        </div>

        {/* Dynamic Fields */}
        {(postType === PostType.TRADE || postType === PostType.ERRAND) && (
          <div className="bg-gray-50 p-5 rounded-3xl mb-6 space-y-4 border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">
                {postType === PostType.TRADE ? '出售价格' : '悬赏金额'}
              </label>
              <div className="flex items-center bg-white rounded-xl px-3 py-2 border border-gray-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <span className="text-gray-900 font-bold mr-1">¥</span>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-20 text-right bg-transparent outline-none font-bold text-gray-900 placeholder-gray-300"
                />
              </div>
            </div>
            {postType === PostType.ERRAND && (
              <div className="flex items-center justify-between pt-2 border-t border-gray-200/50">
                <label className="text-sm font-bold text-gray-700">截止时间</label>
                <input 
                  type="datetime-local" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}
          </div>
        )}

         {/* Media Uploader */}
        <div className="flex gap-3 mb-8 overflow-x-auto">
          <div className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 active:bg-gray-100 transition-colors flex-shrink-0">
            <ImageIcon size={24} />
            <span className="text-[10px] font-medium mt-1">照片/视频</span>
          </div>
        </div>

        {/* Settings List */}
        <div className="space-y-1">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl active:bg-gray-100 transition-colors">
             <div className="flex items-center gap-3">
               <div className="bg-indigo-100 p-2 rounded-full text-indigo-600">
                 <MapPin size={18} />
               </div>
               <span className="text-sm font-medium text-gray-700">所在位置</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-xs text-indigo-500 font-medium">生活区</span>
                <ChevronRight size={16} className="text-gray-300" />
             </div>
          </button>
          
          <button 
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl active:bg-gray-100 transition-colors"
            onClick={() => setIsAnonymous(!isAnonymous)}
          >
             <div className="flex items-center gap-3">
               <div className={`p-2 rounded-full transition-colors ${isAnonymous ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-500'}`}>
                  {isAnonymous ? <EyeOff size={18} /> : <Eye size={18} />}
               </div>
               <span className="text-sm font-medium text-gray-700">匿名发布</span>
             </div>
             <div className={`w-11 h-6 rounded-full transition-colors relative ${isAnonymous ? 'bg-purple-500' : 'bg-gray-300'}`}>
               <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${isAnonymous ? 'left-6' : 'left-1'}`}></div>
             </div>
          </button>
        </div>
      </div>
    </div>
  );
};