import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, Send, Image as ImageIcon } from 'lucide-react';
import { Post, Comment } from '../types';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onShare: () => void;
  onOptions: () => void;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    user: { id: 'u10', name: '吃瓜群众', avatar: 'https://ui-avatars.com/api/?name=Melon&background=bfdbfe', verified: false },
    content: '这也太真实了吧！哈哈哈哈 😂',
    timestamp: '5分钟前',
    likes: 12
  },
  {
    id: 'c2',
    user: { id: 'u11', name: '学长带带我', avatar: 'https://ui-avatars.com/api/?name=Sen&background=fecaca', verified: true },
    content: '蹲一个后续。',
    timestamp: '1小时前',
    likes: 3
  }
];

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, onShare, onOptions }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [isLiked, setIsLiked] = useState(false);

  const handleSend = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      user: { id: 'me', name: '我', avatar: 'https://picsum.photos/200/200', verified: true },
      content: commentText,
      timestamp: '刚刚',
      likes: 0
    };
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-[slideRight_0.3s_ease-out]">
      <style>{`
        @keyframes slideRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Navbar */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-50 rounded-full text-slate-700">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
            <img src={post.user.avatar} className="w-8 h-8 rounded-full border border-gray-200" />
            <span className="font-bold text-sm text-slate-800">{post.isAnonymous ? '匿名同学' : post.user.name}</span>
        </div>
        <button onClick={onOptions} className="p-2 -mr-2 text-slate-600">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20 bg-white">
        {/* Main Post */}
        <div className="p-5 border-b-8 border-slate-50">
          <p className="text-base text-slate-800 leading-relaxed whitespace-pre-wrap mb-4 font-normal">
            {post.content}
          </p>

          {post.images && post.images.length > 0 && (
            <div className="space-y-2 mb-4">
              {post.images.map((img, idx) => (
                <img key={idx} src={img} className="w-full rounded-2xl object-cover shadow-sm" />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-400 mt-6">
            <span>{post.timestamp} · 发布于学校生活区</span>
            <span>{post.viewCount || 1024} 阅读</span>
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-5">
          <h3 className="font-bold text-slate-800 mb-6 text-sm">全部评论 ({comments.length})</h3>
          
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="flex gap-3 items-start">
                <img src={comment.user.avatar} className="w-9 h-9 rounded-full object-cover border border-gray-100 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-bold ${comment.user.verified ? 'text-sky-600' : 'text-gray-600'}`}>
                      {comment.user.name}
                    </span>
                    <button className="flex items-center gap-1 text-gray-400">
                      <Heart size={14} />
                      <span className="text-xs">{comment.likes || ''}</span>
                    </button>
                  </div>
                  <p className="text-slate-700 text-sm mt-1 leading-normal">{comment.content}</p>
                  <div className="mt-2 flex gap-4 text-xs text-gray-400 font-medium">
                    <span>{comment.timestamp}</span>
                    <button className="text-slate-600">回复</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Input Bar */}
      <div className="border-t border-gray-100 bg-white px-4 py-2 safe-area-bottom flex items-center gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2">
           <input 
             className="bg-transparent flex-1 text-sm outline-none placeholder-gray-400 text-slate-700"
             placeholder="发一条友善的评论..."
             value={commentText}
             onChange={e => setCommentText(e.target.value)}
           />
        </div>
        <button className="text-gray-400 hover:text-sky-500">
            <ImageIcon size={24} />
        </button>
        {commentText.length > 0 ? (
           <button onClick={handleSend} className="text-white bg-sky-500 px-4 py-1.5 rounded-full text-sm font-bold shadow-md shadow-sky-200">
             发送
           </button>
        ) : (
           <div className="flex items-center gap-4 px-1">
             <button onClick={() => setIsLiked(!isLiked)} className={isLiked ? 'text-rose-500' : 'text-gray-400'}>
               <Heart size={26} className={isLiked ? 'fill-current' : ''} />
             </button>
             <button onClick={onShare} className="text-gray-400">
               <Share2 size={26} />
             </button>
           </div>
        )}
      </div>
    </div>
  );
};