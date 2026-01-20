import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Clock, MapPin } from 'lucide-react';
import { Post, PostType } from '../types';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
  onShare?: () => void;
  onOptions?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick, onShare, onOptions }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const isErrand = post.type === PostType.ERRAND;
  const isTrade = post.type === PostType.TRADE;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikesCount(p => p - 1);
    } else {
      setLikesCount(p => p + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 mb-3 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-3xl mx-3 active:scale-[0.99] transition-transform duration-200 cursor-pointer border border-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            {post.isAnonymous ? (
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-300 to-indigo-300 flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-sm">
                🤫
              </div>
            ) : (
              <img src={post.user.avatar} alt={post.user.name} className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm" />
            )}
            {!post.isAnonymous && post.user.verified && (
               <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white text-[8px] p-0.5 rounded-full border-2 border-white">
                 V
               </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-[15px] ${post.isAnonymous ? 'text-gray-600' : 'text-slate-800'}`}>
                {post.isAnonymous ? "匿名同学" : post.user.name}
              </span>
              {post.user.department && !post.isAnonymous && (
                 <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 rounded-full">{post.user.department}</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
               <span>{post.timestamp}</span>
               {post.viewCount && <span>· {post.viewCount} 阅读</span>}
            </div>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onOptions && onOptions(); }} 
          className="text-gray-300 bg-gray-50 p-1.5 rounded-full hover:bg-gray-100"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content Body */}
      <div className="pl-1">
        {/* Special Tags/Price */}
        {(isErrand || isTrade) && (
          <div className="inline-flex items-center gap-2 mb-2 bg-slate-50 px-3 py-1.5 rounded-2xl">
             <span className={`text-xs font-bold ${isErrand ? 'text-orange-500' : 'text-emerald-500'}`}>
               {isErrand ? '#跑腿求助' : '#闲置回血'}
             </span>
             {post.price && (
               <span className="text-rose-500 font-extrabold text-base">
                  <span className="text-xs mr-0.5">¥</span>{post.price}
               </span>
             )}
          </div>
        )}

        {/* Text */}
        <p className="text-slate-700 text-[15px] leading-relaxed mb-3 whitespace-pre-wrap tracking-wide">
          {post.content}
        </p>

        {/* Deadline Highlight */}
        {isErrand && post.deadline && (
          <div className="flex items-center text-xs text-orange-500 mb-3 bg-orange-50 w-fit px-2 py-1 rounded-lg">
            <Clock size={14} className="mr-1.5" />
            <span>截止: {post.deadline}</span>
          </div>
        )}

        {/* Images Grid */}
        {post.images && post.images.length > 0 && (
          <div className={`grid gap-1.5 mb-3 rounded-2xl overflow-hidden ${post.images.length === 1 ? 'grid-cols-1 max-w-[80%]' : 'grid-cols-3'}`}>
            {post.images.map((img, idx) => (
              <div key={idx} className={`relative overflow-hidden bg-gray-100 ${post.images?.length === 1 ? 'aspect-video' : 'aspect-square'}`}>
                  <img 
                    src={img} 
                    alt="post attachment" 
                    className="w-full h-full object-cover" 
                  />
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-sky-500 bg-sky-50 px-2.5 py-1 rounded-full font-medium">#{tag}</span>
            ))}
          </div>
        )}
        
        {/* Location (optional) */}
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
           <MapPin size={12} />
           <span>学校生活区</span>
        </div>
      </div>

      {/* Weibo Style Bottom Bar */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-1">
        <button 
           onClick={(e) => { e.stopPropagation(); onShare && onShare(); }}
           className="flex-1 flex items-center justify-center gap-1.5 text-gray-500 hover:text-slate-700 active:scale-95 transition-all border-r border-gray-100"
        >
          <Share2 size={18} />
          <span className="text-xs font-medium">{post.shares || '转发'}</span>
        </button>

        <button 
           onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
           className="flex-1 flex items-center justify-center gap-1.5 text-gray-500 hover:text-slate-700 active:scale-95 transition-all border-r border-gray-100"
        >
          <MessageCircle size={18} />
          <span className="text-xs font-medium">{post.comments || '评论'}</span>
        </button>

        <button 
           onClick={handleLike}
           className={`flex-1 flex items-center justify-center gap-1.5 active:scale-95 transition-all ${isLiked ? 'text-rose-500' : 'text-gray-500 hover:text-slate-700'}`}
        >
          <Heart size={18} className={`${isLiked ? 'fill-current animate-like' : ''}`} />
          <span className="text-xs font-medium">{likesCount || '赞'}</span>
        </button>
      </div>
    </div>
  );
};