import React from 'react';
import { Flag, EyeOff, Copy, Trash2 } from 'lucide-react';

interface ActionSheetProps {
  onClose: () => void;
  isOwner?: boolean;
  onDelete?: () => void;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({ onClose, isOwner, onDelete }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[80] animate-[fadeIn_0.2s_ease-out]" onClick={onClose}></div>
      <div className="fixed bottom-0 left-0 right-0 bg-[#f0f4f8] rounded-t-3xl z-[90] overflow-hidden animate-[slideUp_0.3s_ease-out]">
        <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
        
        <div className="p-2 space-y-2">
           <div className="bg-white rounded-2xl overflow-hidden">
             {isOwner ? (
                <button 
                  onClick={onDelete}
                  className="w-full py-4 text-center font-bold text-rose-500 active:bg-gray-50 border-b border-gray-50 flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  删除帖子
                </button>
             ) : (
               <>
                 <button className="w-full py-4 text-center font-bold text-rose-500 active:bg-gray-50 border-b border-gray-50 flex items-center justify-center gap-2">
                    <Flag size={18} />
                    举报该内容
                 </button>
                 <button className="w-full py-4 text-center font-medium text-slate-700 active:bg-gray-50 border-b border-gray-50 flex items-center justify-center gap-2">
                    <EyeOff size={18} />
                    不感兴趣
                 </button>
               </>
             )}
             
             <button className="w-full py-4 text-center font-medium text-slate-700 active:bg-gray-50 flex items-center justify-center gap-2">
                <Copy size={18} />
                复制内容
             </button>
           </div>

           <button 
             onClick={onClose}
             className="w-full bg-white py-4 rounded-2xl font-bold text-slate-700 active:bg-gray-50"
           >
             取消
           </button>
        </div>
      </div>
    </>
  );
};