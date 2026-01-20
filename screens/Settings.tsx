import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, LogOut, Lock, Bell, UserX, Moon, Smartphone, Shield, Key, Ghost } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

type SettingsView = 'MAIN' | 'ACCOUNT' | 'NOTIFICATIONS' | 'PRIVACY' | 'BLOCK_LIST';

export const Settings: React.FC<SettingsProps> = ({ onBack, onLogout }) => {
  const [currentView, setCurrentView] = useState<SettingsView>('MAIN');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'ACCOUNT':
        return (
          <div className="p-4 space-y-4 animate-[slideRight_0.3s_ease-out]">
             <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                   <span className="text-sm font-medium text-slate-700">手机号</span>
                   <span className="text-sm text-gray-400">138****8888</span>
                </div>
                <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                   <span className="text-sm font-medium text-slate-700">微信绑定</span>
                   <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">已绑定</span>
                </div>
                <div className="p-4 flex justify-between items-center active:bg-gray-50">
                   <span className="text-sm font-medium text-slate-700">修改密码</span>
                   <ChevronRight size={16} className="text-gray-300" />
                </div>
             </div>
             <div className="bg-white rounded-2xl overflow-hidden shadow-sm p-4 flex items-center gap-3 text-slate-700">
                <Shield size={18} className="text-emerald-500" />
                <span className="text-sm font-medium">账号状态正常</span>
             </div>
          </div>
        );
      case 'NOTIFICATIONS':
        return (
          <div className="p-4 space-y-4 animate-[slideRight_0.3s_ease-out]">
             <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                {['互动通知', '系统通知', '活动推送'].map((item, i) => (
                  <div key={i} className="p-4 flex justify-between items-center border-b border-gray-50 last:border-0">
                     <span className="text-sm font-medium text-slate-700">{item}</span>
                     <div className="w-10 h-6 bg-indigo-500 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'PRIVACY':
        return (
          <div className="p-4 space-y-4 animate-[slideRight_0.3s_ease-out]">
             <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 flex justify-between items-center border-b border-gray-50">
                   <span className="text-sm font-medium text-slate-700">允许陌生人查看主页</span>
                   <div className="w-10 h-6 bg-indigo-500 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                   </div>
                </div>
                <div className="p-4 flex justify-between items-center border-b border-gray-50">
                   <span className="text-sm font-medium text-slate-700">向我推荐通讯录好友</span>
                   <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                   </div>
                </div>
                <button 
                  onClick={() => setCurrentView('BLOCK_LIST')}
                  className="w-full p-4 flex justify-between items-center active:bg-gray-50"
                >
                   <span className="text-sm font-medium text-slate-700">黑名单管理</span>
                   <ChevronRight size={16} className="text-gray-300" />
                </button>
             </div>
          </div>
        );
      case 'BLOCK_LIST':
        return (
          <div className="flex flex-col items-center justify-center pt-24 animate-[slideRight_0.3s_ease-out] px-10 text-center">
             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-300">
                <Ghost size={48} strokeWidth={1.5} />
             </div>
             <p className="text-slate-700 font-bold mb-2">暂无黑名单用户</p>
             <p className="text-gray-400 text-xs leading-relaxed">
               当你将用户加入黑名单后，他们将无法查看你的动态或向你发送消息。
             </p>
          </div>
        );
      default:
        return (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setCurrentView('ACCOUNT')}
                className="w-full p-4 flex items-center justify-between border-b border-gray-50 active:bg-gray-50 transition-colors"
              >
                  <div className="flex items-center gap-3">
                    <Lock size={20} className="text-gray-400" />
                    <span className="text-sm font-medium text-slate-700">账号与安全</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
              </button>
              <button 
                onClick={() => setCurrentView('NOTIFICATIONS')}
                className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors"
              >
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-gray-400" />
                    <span className="text-sm font-medium text-slate-700">消息通知</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
              </button>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 flex items-center justify-between border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <Moon size={20} className="text-gray-400" />
                    <span className="text-sm font-medium text-slate-700">
                      深色模式
                      <span className="text-[10px] text-gray-400 font-normal ml-1">(仅模拟开关)</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-indigo-500' : 'bg-gray-200'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                  </button>
              </div>
              <button 
                onClick={() => setCurrentView('PRIVACY')}
                className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors"
              >
                  <div className="flex items-center gap-3">
                    <UserX size={20} className="text-gray-400" />
                    <span className="text-sm font-medium text-slate-700">隐私设置</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
              </button>
            </div>

            <button 
              onClick={onLogout}
              className="w-full bg-white text-rose-500 font-bold py-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <LogOut size={18} />
              <span>退出当前账号</span>
            </button>

            <div className="text-center mt-4">
              <p className="text-xs text-gray-400">校友圈 v1.1.2 (MiniProgram)</p>
            </div>
          </div>
        );
    }
  };

  const getTitle = () => {
    switch(currentView) {
      case 'ACCOUNT': return '账号与安全';
      case 'NOTIFICATIONS': return '消息通知';
      case 'PRIVACY': return '隐私设置';
      case 'BLOCK_LIST': return '黑名单管理';
      default: return '设置';
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f8fafc] z-[70] flex flex-col animate-[slideRight_0.3s_ease-out]">
      <style>{`@keyframes slideRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
      
      {/* Header */}
      <div className="bg-white px-4 h-14 flex items-center gap-3 border-b border-gray-100">
        <button 
          onClick={() => {
             if (currentView === 'BLOCK_LIST') {
               setCurrentView('PRIVACY');
             } else if (currentView === 'MAIN') {
               onBack();
             } else {
               setCurrentView('MAIN');
             }
          }} 
          className="p-2 -ml-2 hover:bg-gray-50 rounded-full"
        >
           <ArrowLeft size={24} className="text-slate-700" />
        </button>
        <span className="font-bold text-slate-800 text-lg">{getTitle()}</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};