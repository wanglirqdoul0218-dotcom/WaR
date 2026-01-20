import React, { useState } from 'react';
import { User, Lock, ArrowRight, School, MessageSquare, Smartphone } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState<'PASSWORD' | 'CODE'>('PASSWORD');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] right-[-20%] w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

      <div className="w-full max-w-sm z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-200 mb-6 transform rotate-3">
            <School className="text-white w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">欢迎回到校友圈</h1>
          <p className="text-gray-500 text-sm">连接每一位校友，分享校园生活</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex mb-6 bg-gray-100 p-1 rounded-xl">
           <button 
             onClick={() => setLoginMethod('PASSWORD')}
             className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginMethod === 'PASSWORD' ? 'bg-white shadow text-slate-800' : 'text-gray-400'}`}
           >
             密码登录
           </button>
           <button 
             onClick={() => setLoginMethod('CODE')}
             className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginMethod === 'CODE' ? 'bg-white shadow text-slate-800' : 'text-gray-400'}`}
           >
             验证码登录
           </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="group bg-gray-50 border border-gray-100 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 rounded-2xl p-1 transition-all">
            <div className="flex items-center px-3">
              <User className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="手机号 / 学号"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 bg-transparent py-3 outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="group bg-gray-50 border border-gray-100 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 rounded-2xl p-1 transition-all">
            <div className="flex items-center px-3">
              {loginMethod === 'PASSWORD' ? <Lock className="text-gray-400 w-5 h-5 mr-3" /> : <Smartphone className="text-gray-400 w-5 h-5 mr-3" />}
              <input
                type={loginMethod === 'PASSWORD' ? "password" : "text"}
                placeholder={loginMethod === 'PASSWORD' ? "请输入密码" : "请输入验证码"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent py-3 outline-none text-gray-800 placeholder-gray-400"
              />
              {loginMethod === 'CODE' && (
                <button type="button" className="text-xs text-indigo-500 font-bold whitespace-nowrap pl-2 border-l border-gray-200">
                  获取验证码
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !username || !password}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>登录</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8">
           <div className="relative flex justify-center text-xs mb-6">
              <div className="absolute inset-x-0 top-1/2 bg-gray-100 h-px"></div>
              <span className="bg-white px-2 relative text-gray-400">其他方式登录</span>
           </div>
           <div className="flex justify-center gap-6">
              <button onClick={onLogin} className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600 active:scale-90 transition-transform">
                <MessageSquare size={24} className="fill-current" />
              </button>
           </div>
           <p className="text-center text-gray-300 text-[10px] mt-2">微信一键登录（模拟）</p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-xs">
            登录即代表同意 <span className="text-indigo-500">用户协议</span> 和 <span className="text-indigo-500">隐私政策</span>
          </p>
        </div>
      </div>
    </div>
  );
};