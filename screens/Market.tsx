import React, { useState } from 'react';
import { ShieldCheck, Zap, ShoppingBag, ChevronRight } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { Post, PostType } from '../types';

interface MarketProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  onQuickPublish: (type: PostType) => void;
  onShare: (post: Post) => void;
  onOptions: (post: Post) => void;
}

export const Market: React.FC<MarketProps> = ({ posts, onPostClick, onQuickPublish, onShare, onOptions }) => {
  const [viewType, setViewType] = useState<'ALL' | 'TRADE' | 'ERRAND'>('ALL');

  return (
    <div className="pb-24 min-h-screen bg-[#f0f4f8]">
      {/* Header */}
      <div className="bg-white px-5 py-3 sticky top-0 z-40 shadow-sm rounded-b-3xl">
        <div className="flex items-center justify-between mb-4 mt-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">校友集市</h1>
          
          <div className="flex bg-slate-100 p-1 rounded-full">
             <button 
                onClick={() => setViewType('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${viewType === 'ALL' ? 'bg-white shadow text-slate-800' : 'text-gray-400'}`}
             >
               全部
             </button>
             <button 
                onClick={() => setViewType('TRADE')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${viewType === 'TRADE' ? 'bg-emerald-400 text-white shadow shadow-emerald-200' : 'text-gray-400'}`}
             >
               闲置
             </button>
             <button 
                onClick={() => setViewType('ERRAND')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${viewType === 'ERRAND' ? 'bg-orange-400 text-white shadow shadow-orange-200' : 'text-gray-400'}`}
             >
               跑腿
             </button>
          </div>
        </div>

        {/* Action Cards (Click triggers publish) */}
        <div className="grid grid-cols-2 gap-3 mb-2">
           <button 
             onClick={() => onQuickPublish(PostType.TRADE)}
             className="bg-[#ecfdf5] p-3 rounded-2xl flex items-center gap-3 active:scale-95 transition-transform border border-emerald-100"
           >
              <div className="bg-white p-2.5 rounded-full text-emerald-500 shadow-sm">
                <ShoppingBag size={20} />
              </div>
              <div className="text-left">
                <div className="font-extrabold text-slate-700 text-sm">发布闲置</div>
                <div className="text-[10px] text-emerald-600/70 font-medium">宿舍好物回血</div>
              </div>
           </button>
           <button 
             onClick={() => onQuickPublish(PostType.ERRAND)}
             className="bg-[#fff7ed] p-3 rounded-2xl flex items-center gap-3 active:scale-95 transition-transform border border-orange-100"
           >
              <div className="bg-white p-2.5 rounded-full text-orange-500 shadow-sm">
                <Zap size={20} />
              </div>
              <div className="text-left">
                <div className="font-extrabold text-slate-700 text-sm">发布跑腿</div>
                <div className="text-[10px] text-orange-600/70 font-medium">代拿/代买/急送</div>
              </div>
           </button>
        </div>
      </div>

      <div className="mx-4 mt-3 bg-indigo-50/80 border border-indigo-100 rounded-xl p-2.5 flex items-center gap-2">
         <ShieldCheck size={16} className="text-indigo-500" />
         <span className="text-xs text-indigo-800 font-medium">交易请优先选择<span className="font-bold underline">线下当面</span>方式</span>
      </div>

      {/* List */}
      <div className="pt-3">
        {posts.filter(p => {
          if (viewType === 'ALL') return p.type === PostType.TRADE || p.type === PostType.ERRAND;
          if (viewType === 'TRADE') return p.type === PostType.TRADE;
          if (viewType === 'ERRAND') return p.type === PostType.ERRAND;
          return true;
        }).map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onClick={() => onPostClick(post)} 
            onShare={() => onShare(post)}
            onOptions={() => onOptions(post)}
          />
        ))}
        {posts.filter(p => p.type === PostType.TRADE || p.type === PostType.ERRAND).length === 0 && (
           <div className="text-center py-20 text-gray-400 text-sm">集市空空如也</div>
        )}
      </div>
    </div>
  );
};