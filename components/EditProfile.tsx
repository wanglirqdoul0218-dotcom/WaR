import React, { useState } from 'react';
import { ArrowLeft, Camera, Check } from 'lucide-react';
import { User } from '../types';

interface EditProfileProps {
  user: User;
  onSave: (user: Partial<User>) => void;
  onCancel: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');
  const [department, setDepartment] = useState(user.department || '');

  const handleSave = () => {
    onSave({ name, bio, department });
  };

  return (
    <div className="fixed inset-0 bg-[#f8fafc] z-[70] flex flex-col animate-[slideUp_0.3s_ease-out]">
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
      
      {/* Header */}
      <div className="bg-white px-4 h-14 flex items-center justify-between border-b border-gray-100">
        <button onClick={onCancel} className="text-slate-600 font-medium text-sm">取消</button>
        <span className="font-bold text-slate-800">编辑资料</span>
        <button onClick={handleSave} className="bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md shadow-sky-200">
          保存
        </button>
      </div>

      <div className="p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
           <div className="relative">
              <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" />
              <button className="absolute bottom-0 right-0 bg-slate-800 text-white p-2 rounded-full shadow-lg border-2 border-white">
                <Camera size={16} />
              </button>
           </div>
           <p className="mt-3 text-xs text-gray-400">点击更换头像</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
           <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
             <label className="block text-xs font-bold text-gray-400 mb-1">昵称</label>
             <input 
               type="text" 
               value={name} 
               onChange={(e) => setName(e.target.value)}
               className="w-full font-bold text-slate-800 outline-none text-base bg-transparent"
             />
           </div>

           <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
             <label className="block text-xs font-bold text-gray-400 mb-1">个性签名</label>
             <textarea 
               value={bio} 
               onChange={(e) => setBio(e.target.value)}
               className="w-full text-slate-700 outline-none text-sm bg-transparent resize-none h-16"
               placeholder="介绍一下自己吧..."
             />
           </div>

           <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center justify-between">
             <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">学院/专业</label>
                <input 
                  type="text" 
                  value={department} 
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full font-medium text-slate-800 outline-none text-sm bg-transparent"
                />
             </div>
           </div>
           
           <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center justify-between opacity-60">
             <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">认证学校</label>
                <div className="font-bold text-slate-800">{user.school || '未认证'}</div>
             </div>
             <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">不可修改</span>
           </div>
        </div>
      </div>
    </div>
  );
};