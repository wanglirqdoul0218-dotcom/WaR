import React from 'react';
import { Settings, ChevronRight, FileText, ShoppingBag, Shield, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { User } from '../types';

interface ProfileProps {
  user: User;
  postCount: number;
  onSettings: () => void;
  onEdit: () => void;
  onMenuClick: (type: 'MY_POSTS' | 'MY_TRADES' | 'VERIFY' | 'MY_REPORTS') => void;
  onStatsClick: (type: 'MY_POSTS' | 'FOLLOWING' | 'FANS') => void;
}

const ACTIVITY_DATA = [
  { day: '一', value: 4 },
  { day: '二', value: 7 },
  { day: '三', value: 3 },
  { day: '四', value: 8 },
  { day: '五', value: 12 },
  { day: '六', value: 6 },
  { day: '日', value: 10 },
];

export const Profile: React.FC<ProfileProps> = ({ user, postCount, onSettings, onEdit, onMenuClick, onStatsClick }) => {
  return (
    <div className="pb-4 min-h-full">
      {/* Header Card */}
      <div className="bg-white rounded-b-[2.5rem] px-6 pt-10 pb-8 shadow-sm mb-6 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0"></div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex gap-4 items-center" onClick={onEdit}>
              <div className="relative">
                 <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover" />
                 <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">{user.name}</h2>
                <div className="text-sm text-gray-500 mt-1 line-clamp-1 max-w-[150px]">{user.bio || '这个人很懒，什么都没写'}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">ID: 20238899</span>
                  {user.verified && <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">已实名</span>}
                </div>
              </div>
            </div>
            <button onClick={onSettings} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-600">
              <Settings size={20} />
            </button>
          </div>
          
          {/* Stats Grid */}
          <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-4">
            <button onClick={() => onStatsClick('MY_POSTS')} className="flex-1 text-center border-r border-gray-200 active:opacity-50 transition-opacity">
              <div className="text-xl font-extrabold text-gray-900">{postCount}</div>
              <div className="text-xs text-gray-500 font-medium mt-1">发布</div>
            </button>
            <button onClick={() => onStatsClick('FOLLOWING')} className="flex-1 text-center border-r border-gray-200 active:opacity-50 transition-opacity">
              <div className="text-xl font-extrabold text-gray-900">34</div>
              <div className="text-xs text-gray-500 font-medium mt-1">关注</div>
            </button>
            <button onClick={() => onStatsClick('FANS')} className="flex-1 text-center active:opacity-50 transition-opacity">
              <div className="text-xl font-extrabold text-gray-900">128</div>
              <div className="text-xs text-gray-500 font-medium mt-1">粉丝</div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-4">
        {/* School Info Card */}
        {user.school && (
          <div className="bg-gradient-to-r from-sky-400 to-indigo-500 p-4 rounded-3xl shadow-lg shadow-sky-100 text-white flex justify-between items-center">
             <div>
               <div className="text-xs opacity-80 mb-1">当前认证学校</div>
               <div className="font-bold text-lg">{user.school}</div>
               <div className="text-xs opacity-80 mt-1">{user.department}</div>
             </div>
             <Shield size={32} className="opacity-20" />
          </div>
        )}

        {/* Chart */}
        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">本周活跃</h3>
            <span className="text-xs text-gray-400">Total: 50</span>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ACTIVITY_DATA}>
                <XAxis dataKey="day" tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} dy={5} />
                <Tooltip cursor={{fill: '#f1f5f9', radius: 4}} contentStyle={{fontSize: '12px', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={24}>
                   {ACTIVITY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 ? '#6366f1' : '#e2e8f0'} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
            <button onClick={() => onMenuClick('MY_POSTS')} className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-500">
                  <FileText size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">我的发布</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>

            <button onClick={() => onMenuClick('MY_TRADES')} className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-500">
                  <ShoppingBag size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">我的交易</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>

             <button onClick={() => onMenuClick('MY_REPORTS')} className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-500">
                  <AlertCircle size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">我的举报及反馈</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>

            <button onClick={() => onMenuClick('VERIFY')} className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-500">
                  <Shield size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">实名认证</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">已认证</span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </button>
        </div>

        <div className="pt-2 pb-6 text-center">
          <span className="text-[10px] text-gray-300 font-mono">Build v1.1.2 • Made with ❤️ for Students</span>
        </div>
      </div>
    </div>
  );
};