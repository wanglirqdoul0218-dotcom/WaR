import React, { useState } from 'react';
import { Search, Bell, Sparkles, X, History } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { Post } from '../types';

interface HomeProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  onNotificationClick: () => void;
  onShare: (post: Post) => void;
  onOptions: (post: Post) => void;
  onBannerClick: () => void;
}

export const Home: React.FC<HomeProps> = ({ posts, onPostClick, onNotificationClick, onShare, onOptions, onBannerClick }) => {
  const [activeCategory, setActiveCategory] = useState('推荐');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  const categories = ['推荐', '关注', '失物', '表白', '问答', '活动', '社团'];

  // Filter Logic
  const filteredPosts = posts.filter(post => {
      // 1. Search Filter
      if (isSearchOpen && searchText) {
         return post.content.includes(searchText) || post.tags.some(t => t.includes(searchText));
      }
      // 2. Category Filter
      if (activeCategory === '推荐' || activeCategory === '关注') return true;
      return post.category === activeCategory;
  });

  return (
    <div className="pb-4 min-h-full">
      {/* Header Area */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="px-4 py-3 flex items-center gap-3">
           <div 
             onClick={() => setIsSearchOpen(true)}
             className="flex-1 bg-[#f1f5f9] rounded-full flex items-center px-3 py-2 transition-all active:scale-95"
           >
              <Search className="text-gray-400 w-4 h-4 mr-2" />
              <span className="text-sm text-gray-400 truncate">搜“高数笔记”、“二手书”</span>
           </div>
           <button 
             onClick={onNotificationClick}
             className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
               <Bell className="text-slate-600" size={24} />
               <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
        </div>
        
        {/* Categories */}
        <div className="flex overflow-x-auto no-scrollbar gap-6 px-4 pb-0 border-b border-gray-100">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap text-[15px] pb-3 transition-all relative ${
                activeCategory === cat 
                  ? 'text-sky-600 font-extrabold scale-105' 
                  : 'text-gray-400 font-medium'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-sky-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="pt-3">
        {activeCategory === '推荐' && !isSearchOpen && (
          <div onClick={onBannerClick} className="mx-3 mb-4 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-3xl p-4 text-white shadow-lg shadow-sky-200 flex items-center justify-between active:scale-95 transition-transform cursor-pointer">
            <div>
              <div className="font-bold text-lg mb-1">校园歌手大赛 🎤</div>
              <div className="text-xs opacity-90 bg-white/20 px-2 py-0.5 rounded-full w-fit">火热报名中</div>
            </div>
            <Sparkles className="text-yellow-300 w-8 h-8 opacity-80" />
          </div>
        )}

        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onClick={() => onPostClick(post)} 
              onShare={() => onShare(post)}
              onOptions={() => onOptions(post)}
            />
          ))
        ) : (
          <div className="text-center py-20">
             <div className="text-4xl mb-2">🍃</div>
             <p className="text-gray-400 text-sm">暂无内容，去发一条吧！</p>
          </div>
        )}
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-[#f0f4f8] flex flex-col animate-[fadeIn_0.2s_ease-out]">
           <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm">
             <div className="flex-1 bg-[#f1f5f9] rounded-full flex items-center px-3 py-2">
                <Search className="text-gray-400 w-4 h-4 mr-2" />
                <input 
                  autoFocus
                  type="text" 
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="搜索帖子、用户、商品..." 
                  className="bg-transparent text-sm w-full outline-none placeholder-gray-400 text-slate-700"
                />
             </div>
             <button onClick={() => { setIsSearchOpen(false); setSearchText(''); }} className="text-slate-600 font-bold text-sm">取消</button>
           </div>
           
           {!searchText && (
             <div className="p-5">
               <h3 className="font-bold text-slate-700 mb-4 text-sm">历史搜索</h3>
               <div className="flex flex-wrap gap-2">
                 {['二手教材', '校园卡', '家教', '羽毛球'].map(tag => (
                   <button key={tag} onClick={() => setSearchText(tag)} className="bg-white px-3 py-1.5 rounded-full text-xs text-gray-500 border border-gray-100">
                     {tag}
                   </button>
                 ))}
               </div>
             </div>
           )}

           {searchText && (
              <div className="flex-1 overflow-y-auto pt-3">
                 {filteredPosts.length > 0 ? (
                   filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} onClick={() => onPostClick(post)} onShare={() => onShare(post)} onOptions={() => onOptions(post)} />
                   ))
                 ) : (
                   <div className="text-center py-20 text-gray-400 text-sm">未找到相关内容</div>
                 )}
              </div>
           )}
        </div>
      )}
    </div>
  );
};