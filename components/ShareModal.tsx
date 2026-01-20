import React from 'react';
import { MessageCircle, Link, Image, MoreHorizontal, X } from 'lucide-react';

interface ShareModalProps {
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  const options = [
    { icon: MessageCircle, label: '微信好友', color: 'bg-green-500' },
    { icon: Image, label: '生成海报', color: 'bg-orange-500' },
    { icon: Link, label: '复制链接', color: 'bg-blue-500' },
    { icon: MoreHorizontal, label: '更多', color: 'bg-gray-500' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[80] animate-[fadeIn_0.2s_ease-out]" onClick={onClose}></div>
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[90] p-6 pb-10 animate-[slideUp_0.3s_ease-out]">
        <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
        
        <h3 className="text-center font-bold text-slate-700 mb-6">分享至</h3>
        
        <div className="flex justify-between px-4 mb-6">
           {options.map((opt, idx) => (
             <button key={idx} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
               <div className={`w-14 h-14 ${opt.color} rounded-2xl flex items-center justify-center text-white shadow-md`}>
                 <opt.icon size={28} />
               </div>
               <span className="text-xs text-gray-500">{opt.label}</span>
             </button>
           ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-gray-100 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-200"
        >
          取消
        </button>
      </div>
    </>
  );
};