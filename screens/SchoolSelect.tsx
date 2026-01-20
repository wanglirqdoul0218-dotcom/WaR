import React, { useState } from 'react';
import { Search, MapPin, School, CheckCircle, ArrowRight } from 'lucide-react';

interface SchoolSelectProps {
  onConfirm: (schoolName: string) => void;
}

const SCHOOL_LIST = [
  "福建商学院", "北京大学", "清华大学", "复旦大学", "上海交通大学", 
  "浙江大学", "南京大学", "武汉大学", "中山大学", "厦门大学", "福州大学"
];

export const SchoolSelect: React.FC<SchoolSelectProps> = ({ onConfirm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [step, setStep] = useState<1 | 2>(1); // 1: Select School, 2: Verify ID

  const handleSelect = (school: string) => {
    setSelectedSchool(school);
    setSearchTerm(school);
  };

  const handleNext = () => {
    if (selectedSchool) setStep(2);
  };

  return (
    <div className="h-screen bg-white flex flex-col p-6 animate-[fadeIn_0.5s_ease-out]">
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      
      {/* Step 1: School Selection */}
      {step === 1 && (
        <>
          <div className="mt-10 mb-8">
            <h1 className="text-2xl font-black text-slate-800 mb-2">选择你的学校</h1>
            <p className="text-gray-400 text-sm">我们会根据学校为你推送相关的校园动态</p>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all"
              placeholder="搜索福建商学院..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-wider">可能感兴趣</h3>
            <div className="flex flex-col gap-2">
              {SCHOOL_LIST.filter(s => s.includes(searchTerm)).map(school => (
                <button 
                  key={school}
                  onClick={() => handleSelect(school)}
                  className={`p-4 rounded-2xl text-sm font-bold text-left transition-all flex items-center gap-3 ${
                    selectedSchool === school 
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <School size={18} />
                  {school}
                  {selectedSchool === school && <CheckCircle size={18} className="ml-auto" />}
                </button>
              ))}
              {searchTerm && !SCHOOL_LIST.some(s => s.includes(searchTerm)) && (
                <div className="text-center text-gray-400 py-4 text-sm">未找到相关学校</div>
              )}
            </div>
          </div>

          <button 
            disabled={!selectedSchool}
            onClick={handleNext}
            className="mt-4 w-full bg-slate-800 text-white font-bold py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            下一步
            <ArrowRight size={18} />
          </button>
        </>
      )}

      {/* Step 2: Verification */}
      {step === 2 && (
        <>
           {/* Same verification UI as before, just kept for completeness in App flow */}
          <div className="mt-10 mb-8">
            <h1 className="text-2xl font-black text-slate-800 mb-2">身份认证</h1>
            <p className="text-gray-400 text-sm">为了构建真实的校园社区，请验证你的身份</p>
          </div>
          <div className="bg-gradient-to-br from-sky-400 to-indigo-500 rounded-3xl p-6 text-white shadow-xl shadow-sky-200 mb-8 relative overflow-hidden">
             <div className="flex items-center gap-3 mb-6 relative z-10">
               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                 <School size={24} />
               </div>
               <div>
                 <div className="text-xs opacity-80">当前选择</div>
                 <div className="font-bold text-lg">{selectedSchool}</div>
               </div>
             </div>
             <div className="space-y-4 relative z-10">
               <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                 <label className="text-xs text-indigo-100 block mb-1">学号 / 教工号</label>
                 <input type="text" defaultValue="20230001" className="bg-transparent w-full outline-none font-mono font-bold" />
               </div>
               <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                 <label className="text-xs text-indigo-100 block mb-1">统一身份认证密码</label>
                 <input type="password" value="********" readOnly className="bg-transparent w-full outline-none font-mono font-bold" />
               </div>
             </div>
          </div>
          <button 
            onClick={() => {
                setTimeout(() => onConfirm(selectedSchool), 500);
            }}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-200 active:scale-95 transition-all"
          >
            确认并进入校园
          </button>
        </>
      )}
    </div>
  );
};