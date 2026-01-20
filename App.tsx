import React, { useState } from 'react';
import { Tab, Post, ChatMessage, User, PostType, NotificationItem } from './types';
import { TabBar } from './components/TabBar';
import { Home } from './screens/Home';
import { Market } from './screens/Market';
import { Publish } from './screens/Publish';
import { Messages } from './screens/Messages';
import { Profile } from './screens/Profile';
import { Login } from './screens/Login';
import { SchoolSelect } from './screens/SchoolSelect';
import { Settings } from './screens/Settings';
import { PostDetail } from './components/PostDetail';
import { PostCard } from './components/PostCard';
import { ChatDetail } from './components/ChatDetail';
import { EditProfile } from './components/EditProfile';
import { ShareModal } from './components/ShareModal';
import { ActionSheet } from './components/ActionSheet';
import { MessageListDetail } from './screens/MessageListDetail';
import { MiniCapsule } from './components/MiniCapsule';
import { ArrowLeft, User as UserIcon, ShieldCheck, Music } from 'lucide-react';

// --- MOCK DATA INITIALIZATION ---
const INITIAL_USER: User = {
  id: 'me',
  name: '陈同学',
  avatar: 'https://picsum.photos/200/200',
  verified: true,
  department: '计算机学院',
  school: '福建商学院',
  bio: '好好学习，天天向上！努力成为全栈工程师。'
};

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    user: { id: 'u1', name: '吉他社-张伟', avatar: 'https://picsum.photos/101/101', verified: true, department: '艺术学院' },
    type: PostType.SOCIAL,
    category: '活动',
    content: '🎵 这周末学校有草坪音乐节，大家记得来参加！我们在南操场等你。自带小板凳哦～',
    images: ['https://picsum.photos/400/200', 'https://picsum.photos/401/200'],
    tags: ['活动', '音乐节', '周末去哪儿'],
    likes: 128,
    comments: 32,
    shares: 5,
    viewCount: 2300,
    timestamp: '1小时前',
  },
  {
    id: 'me1',
    user: INITIAL_USER,
    type: PostType.SOCIAL,
    category: '日常',
    content: '今天图书馆的晚霞也太美了吧！随手一拍就是大片。📸 #校园风景 #日落',
    images: ['https://picsum.photos/400/250'],
    tags: ['摄影', '生活'],
    likes: 45,
    comments: 12,
    shares: 2,
    viewCount: 560,
    timestamp: '3小时前',
  },
  {
    id: 'm1',
    user: { id: 'u4', name: '王大力', avatar: 'https://picsum.photos/102/102', verified: true },
    type: PostType.ERRAND,
    category: '跑腿',
    content: '求代拿快递，东门菜鸟驿站，送到10号楼楼下。件不大。',
    price: 5,
    deadline: '今天 12:00 前',
    tags: ['跑腿', '代拿'],
    likes: 0,
    comments: 2,
    timestamp: '刚刚',
  },
  {
    id: 'me2',
    user: INITIAL_USER,
    type: PostType.TRADE,
    category: '闲置',
    content: '出考研英语复习资料，全新未拆封。买多了，低价出。',
    price: 25,
    tags: ['考研', '书籍'],
    likes: 5,
    comments: 3,
    timestamp: '昨天',
  },
  {
    id: 'm2',
    user: { id: 'u5', name: '小爱同学', avatar: 'https://picsum.photos/103/103', verified: true },
    type: PostType.TRADE,
    category: '闲置',
    content: '毕业出闲置，九成新罗技机械键盘。送一个拔键器。',
    price: 150,
    images: ['https://picsum.photos/400/300'],
    tags: ['数码', '键盘'],
    likes: 8,
    comments: 5,
    timestamp: '2小时前',
  },
  {
    id: '3',
    user: { id: 'u3', name: '匿名用户', avatar: '', verified: false },
    type: PostType.SOCIAL,
    category: '问答',
    content: '求问学校附近的兼职，大二学生，课余时间比较多。',
    tags: ['兼职', '求助'],
    likes: 15,
    comments: 8,
    timestamp: '4小时前',
    isAnonymous: true
  },
  {
    id: 'me3',
    user: INITIAL_USER,
    type: PostType.ERRAND,
    category: '跑腿',
    content: '谁在第一食堂？求帮忙带一份黄焖鸡米饭，送到图书馆门口。',
    price: 3,
    deadline: '12:30前',
    tags: ['带饭'],
    likes: 1,
    comments: 1,
    timestamp: '昨天 11:30',
  }
];

export default function App() {
  // Auth & Flow
  const [authStep, setAuthStep] = useState<'LOGIN' | 'SCHOOL' | 'APP'>('LOGIN');
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USER);
  
  // Data State
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  
  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.HOME);
  
  // Overlays
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishPreSelectType, setPublishPreSelectType] = useState<PostType | undefined>(undefined);
  
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [actionSheetTarget, setActionSheetTarget] = useState<Post | null>(null);

  const [selectedChat, setSelectedChat] = useState<ChatMessage | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messageDetailType, setMessageDetailType] = useState<'LIKES' | 'COMMENTS' | null>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  
  // Profile Sub-Views
  const [profileSubView, setProfileSubView] = useState<'MY_POSTS' | 'MY_TRADES' | 'FOLLOWING' | 'FANS' | 'VERIFY' | 'MY_REPORTS' | null>(null);

  // Interaction Modals
  const [showShareModal, setShowShareModal] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);

  // --- Computed Data ---
  const myPostCount = posts.filter(p => p.user.id === currentUser.id).length;

  // --- Actions ---

  const handleLoginSuccess = () => setAuthStep('SCHOOL');
  
  const handleSchoolSelected = (schoolName: string) => {
    setCurrentUser(prev => ({ ...prev, school: schoolName }));
    setAuthStep('APP');
  };

  const handleLogout = () => {
    setAuthStep('LOGIN');
    setCurrentTab(Tab.HOME);
    setIsSettingsOpen(false);
  };

  const handleDeletePost = () => {
    if (actionSheetTarget) {
      setPosts(prev => prev.filter(p => p.id !== actionSheetTarget.id));
      setShowActionSheet(false);
      
      // If we are deleting the post that is currently open in Detail view, close it
      if (selectedPost && selectedPost.id === actionSheetTarget.id) {
        setSelectedPost(null);
      }
      setActionSheetTarget(null);
    }
  };

  const handlePublishPost = (newPostData: Partial<Post>) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: currentUser,
      type: newPostData.type || PostType.SOCIAL,
      content: newPostData.content || '',
      images: newPostData.images || [],
      tags: [],
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: '刚刚',
      isAnonymous: newPostData.isAnonymous,
      price: newPostData.price,
      deadline: newPostData.deadline,
      category: newPostData.type === PostType.SOCIAL ? '日常' : '其他',
      ...newPostData
    };
    setPosts([newPost, ...posts]);
    setShowPublishModal(false);
    if (newPost.type === PostType.TRADE || newPost.type === PostType.ERRAND) {
      setCurrentTab(Tab.MARKET);
    } else {
      setCurrentTab(Tab.HOME);
    }
  };

  const openPublish = (type?: PostType) => {
    setPublishPreSelectType(type);
    setShowPublishModal(true);
  };

  // --- Render ---

  // Helper for Profile Sub-Views
  const renderProfileSubView = () => {
    if (!profileSubView) return null;

    let title = '';
    let content = null;

    if (profileSubView === 'VERIFY') {
      return (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-[slideRight_0.3s_ease-out]">
           <div className="bg-white px-4 h-14 flex items-center gap-3 border-b border-gray-100 sticky top-0">
            <button onClick={() => setProfileSubView(null)} className="p-2 -ml-2 hover:bg-gray-50 rounded-full"><ArrowLeft size={24} /></button>
            <span className="font-bold text-lg">实名认证信息</span>
          </div>
          <div className="p-6">
             <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10"></div>
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 bg-white rounded-full p-1">
                      <img src={currentUser.avatar} className="w-full h-full rounded-full object-cover" />
                   </div>
                   <div>
                      <div className="text-xl font-bold">{currentUser.name}</div>
                      <div className="opacity-80 text-sm">{currentUser.school}</div>
                   </div>
                </div>
                <div className="space-y-2 font-mono text-sm opacity-90">
                   <div className="flex justify-between"><span>学号</span><span>20238899</span></div>
                   <div className="flex justify-between"><span>学院</span><span>{currentUser.department}</span></div>
                   <div className="flex justify-between"><span>状态</span><span className="bg-emerald-400 text-emerald-900 px-2 rounded text-xs font-bold flex items-center">已认证 <ShieldCheck size={12} className="ml-1"/></span></div>
                </div>
             </div>
             <p className="text-center text-gray-400 text-xs mt-6">信息由学校统一身份认证系统提供</p>
          </div>
        </div>
      );
    }

    if (profileSubView === 'MY_REPORTS') {
       title = '举报与反馈';
       content = (
         <div className="p-4 space-y-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400">2023-11-01</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded font-medium">已处理</span>
               </div>
               <p className="text-sm text-slate-700 font-medium">举报帖子：包含违规商业广告信息...</p>
               <div className="mt-3 text-xs text-gray-500 bg-gray-50 p-2 rounded leading-relaxed">
                  官方回复：感谢反馈，已对该贴进行删除处理。
               </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400">2023-11-05</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-medium">跟进中</span>
               </div>
               <p className="text-sm text-slate-700 font-medium">功能建议：希望能增加夜间模式开关。</p>
            </div>
         </div>
       );
    }

    // List Views
    if (profileSubView === 'MY_POSTS') {
      title = '我的发布';
      const myPosts = posts.filter(p => p.user.id === currentUser.id);
      content = myPosts.map(post => (
        <PostCard 
          key={post.id} 
          post={post} 
          onClick={() => setSelectedPost(post)}
          onShare={() => { setActionSheetTarget(post); setShowShareModal(true); }}
          onOptions={() => { setActionSheetTarget(post); setShowActionSheet(true); }}
        />
      ));
    } else if (profileSubView === 'MY_TRADES') {
      title = '我的交易';
      const myTrades = posts.filter(p => p.user.id === currentUser.id && (p.type === PostType.TRADE || p.type === PostType.ERRAND));
      content = myTrades.map(post => (
        <PostCard 
          key={post.id} 
          post={post} 
          onClick={() => setSelectedPost(post)}
          onShare={() => { setActionSheetTarget(post); setShowShareModal(true); }}
          onOptions={() => { setActionSheetTarget(post); setShowActionSheet(true); }}
        />
      ));
    } else if (profileSubView === 'FOLLOWING' || profileSubView === 'FANS') {
      title = profileSubView === 'FOLLOWING' ? '我的关注' : '我的粉丝';
      content = [1,2,3,4].map(i => (
        <div key={i} className="flex items-center justify-between p-4 bg-white border-b border-gray-50">
           <div className="flex items-center gap-3">
              <img src={`https://picsum.photos/50/${50+i}`} className="w-10 h-10 rounded-full"/>
              <span className="font-bold text-slate-700">校友用户 {i}</span>
           </div>
           <button className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 font-bold">已关注</button>
        </div>
      ));
    }

    return (
      <div className="fixed inset-0 bg-[#f0f4f8] z-[60] flex flex-col animate-[slideRight_0.3s_ease-out]">
        <div className="bg-white px-4 h-14 flex items-center gap-3 border-b border-gray-100 sticky top-0 z-10">
          <button onClick={() => setProfileSubView(null)} className="p-2 -ml-2 hover:bg-gray-50 rounded-full"><ArrowLeft size={24} /></button>
          <span className="font-bold text-lg">{title}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-0 pb-10">
           {content && (Array.isArray(content) && content.length > 0 ? content : (profileSubView !== 'MY_REPORTS' && <div className="text-center py-20 text-gray-400">暂无内容</div>))}
           {profileSubView === 'MY_REPORTS' && content}
        </div>
      </div>
    );
  };

  // Main Render Wrapper for iPhone 16 Style
  return (
    <div className="relative w-full max-w-[400px] h-[850px] bg-black rounded-[3rem] shadow-[0_0_0_12px_#333,0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-[6px] border-gray-800 ring-2 ring-gray-700/50">
      
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-8 bg-black z-50 rounded-full transition-all duration-300 hover:w-48 hover:h-12 flex items-center justify-center group">
         <div className="w-full h-full flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
             <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
             <div className="text-[8px] text-white font-medium">正在录音</div>
             <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
         </div>
      </div>

      {/* Mini Program Capsule */}
      <MiniCapsule />

      {/* Screen Content */}
      <div className="w-full h-full bg-[#f0f4f8] relative flex flex-col pt-12"> {/* pt-12 to clear capsule area */}
        
        {authStep === 'LOGIN' && <Login onLogin={handleLoginSuccess} />}
        {authStep === 'SCHOOL' && <SchoolSelect onConfirm={handleSchoolSelected} />}
        
        {authStep === 'APP' && (
          <>
            <div className="flex-1 overflow-y-auto no-scrollbar relative" id="scroll-container">
              {currentTab === Tab.HOME && (
                <Home 
                  posts={posts} 
                  onPostClick={setSelectedPost} 
                  onNotificationClick={() => setCurrentTab(Tab.MESSAGE)}
                  onShare={(p) => { setActionSheetTarget(p); setShowShareModal(true); }}
                  onOptions={(p) => { setActionSheetTarget(p); setShowActionSheet(true); }}
                  onBannerClick={() => setShowEventDetail(true)}
                />
              )}
              
              {currentTab === Tab.MARKET && (
                <Market 
                  posts={posts} 
                  onPostClick={setSelectedPost} 
                  onQuickPublish={openPublish}
                  onShare={(p) => { setActionSheetTarget(p); setShowShareModal(true); }}
                  onOptions={(p) => { setActionSheetTarget(p); setShowActionSheet(true); }}
                />
              )}
              
              {currentTab === Tab.MESSAGE && (
                <Messages 
                  onChatClick={setSelectedChat} 
                  onViewLikes={() => setMessageDetailType('LIKES')}
                  onViewComments={() => setMessageDetailType('COMMENTS')}
                />
              )}
              
              {currentTab === Tab.PROFILE && (
                <Profile 
                  user={currentUser}
                  postCount={myPostCount}
                  onSettings={() => setIsSettingsOpen(true)} 
                  onEdit={() => setIsEditingProfile(true)} 
                  onMenuClick={(type) => setProfileSubView(type)}
                  onStatsClick={(type) => setProfileSubView(type)}
                />
              )}
              
              {!selectedPost && !selectedChat && !isEditingProfile && !isSettingsOpen && !messageDetailType && !showEventDetail && !profileSubView && (
                 <div className="h-24"></div> 
              )}
            </div>

            {!selectedPost && !selectedChat && !isEditingProfile && !isSettingsOpen && !messageDetailType && !showEventDetail && !profileSubView && (
              <TabBar currentTab={currentTab} onTabChange={(tab) => {
                 if (tab === Tab.PUBLISH) {
                   openPublish();
                 } else {
                   setCurrentTab(tab);
                   document.getElementById('scroll-container')?.scrollTo(0,0);
                 }
              }} />
            )}

            {/* Event Detail Modal */}
            {showEventDetail && (
              <div className="fixed inset-0 bg-white z-[60] animate-[slideUp_0.3s_ease-out] flex flex-col">
                 <div className="relative h-64 bg-indigo-600">
                    <img src="https://picsum.photos/400/300" className="w-full h-full object-cover opacity-60" />
                    <button onClick={() => setShowEventDetail(false)} className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white"><ArrowLeft /></button>
                    <div className="absolute bottom-6 left-6 text-white">
                       <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">火热报名中</span>
                       <h1 className="text-3xl font-black mb-1">校园歌手大赛</h1>
                       <p className="opacity-90">Sing Your Dream · 唱出你的梦想</p>
                    </div>
                 </div>
                 <div className="p-6 flex-1 overflow-y-auto">
                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                       <div className="flex items-center gap-1"><Music size={16} /> 第十届</div>
                       <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                       <div>南操场</div>
                       <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                       <div>12月20日 18:00</div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">
                       不管是流行、民谣还是摇滚，只要你爱唱，这个舞台就属于你！前三名将获得丰厚奖品及校级荣誉证书。
                    </p>
                    <h3 className="font-bold text-lg mb-3">奖项设置</h3>
                    <ul className="space-y-2 text-sm text-gray-600 mb-8">
                       <li>🥇 冠军：华为 MatePad + 证书</li>
                       <li>🥈 亚军：AirPods Pro + 证书</li>
                       <li>🥉 季军：罗技机械键盘 + 证书</li>
                    </ul>
                    <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 active:scale-95 transition-all">
                       立即报名
                    </button>
                 </div>
              </div>
            )}

            {/* Shared Overlays */}
            {showPublishModal && (
              <Publish 
                initialType={publishPreSelectType}
                onCancel={() => setShowPublishModal(false)} 
                onSubmit={handlePublishPost}
              />
            )}

            {selectedPost && (
              <PostDetail 
                post={selectedPost} 
                onBack={() => setSelectedPost(null)} 
                onShare={() => { setActionSheetTarget(selectedPost); setShowShareModal(true); }}
                onOptions={() => { setActionSheetTarget(selectedPost); setShowActionSheet(true); }}
              />
            )}

            {selectedChat && (
              <ChatDetail chat={selectedChat} onBack={() => setSelectedChat(null)} />
            )}

            {isEditingProfile && (
              <EditProfile 
                user={currentUser} 
                onSave={(u) => { setCurrentUser(p => ({...p, ...u})); setIsEditingProfile(false); }}
                onCancel={() => setIsEditingProfile(false)}
              />
            )}

            {isSettingsOpen && (
              <Settings onLogout={handleLogout} onBack={() => setIsSettingsOpen(false)} />
            )}

            {messageDetailType && (
              <MessageListDetail 
                type={messageDetailType} 
                onBack={() => setMessageDetailType(null)} 
              />
            )}

            {renderProfileSubView()}
            
            {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
            
            {showActionSheet && (
               <ActionSheet 
                  isOwner={actionSheetTarget?.user.id === currentUser.id}
                  onDelete={handleDeletePost}
                  onClose={() => setShowActionSheet(false)} 
               />
            )}
          </>
        )}

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black rounded-full opacity-20 pointer-events-none z-[100]"></div>
      </div>
    </div>
  );
}