import React from 'react';
import { Home, ShoppingBag, Plus, MessageCircle, User } from 'lucide-react';
import { Tab } from '../types';

interface TabBarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ currentTab, onTabChange }) => {
  const getTabClass = (tab: Tab) => {
    return currentTab === tab 
      ? "text-sky-500 scale-110" 
      : "text-gray-300 hover:text-gray-400";
  };

  return (
    <div className="fixed bottom-5 left-4 right-4 h-16 z-50 max-w-md mx-auto">
      {/* Floating Pill Design */}
      <div className="absolute inset-0 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-[2.5rem] border border-gray-50/50"></div>
      
      <div className="relative h-full flex items-center justify-around px-4">
        <button 
          onClick={() => onTabChange(Tab.HOME)} 
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${getTabClass(Tab.HOME)}`}
        >
          <Home size={26} strokeWidth={currentTab === Tab.HOME ? 2.8 : 2} className={currentTab === Tab.HOME ? 'fill-sky-100' : ''} />
        </button>

        <button 
          onClick={() => onTabChange(Tab.MARKET)} 
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${getTabClass(Tab.MARKET)}`}
        >
          <ShoppingBag size={26} strokeWidth={currentTab === Tab.MARKET ? 2.8 : 2} className={currentTab === Tab.MARKET ? 'fill-sky-100' : ''} />
        </button>

        <button 
          onClick={() => onTabChange(Tab.PUBLISH)} 
          className="flex flex-col items-center justify-center w-14 h-14 -mt-10 group"
        >
          <div className="bg-gradient-to-tr from-sky-400 to-indigo-400 rounded-full p-3.5 shadow-lg shadow-sky-200 text-white transform group-active:scale-90 transition-all duration-200 border-4 border-[#f0f4f8]">
            <Plus size={28} strokeWidth={3} />
          </div>
        </button>

        <button 
          onClick={() => onTabChange(Tab.MESSAGE)} 
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${getTabClass(Tab.MESSAGE)}`}
        >
          <MessageCircle size={26} strokeWidth={currentTab === Tab.MESSAGE ? 2.8 : 2} className={currentTab === Tab.MESSAGE ? 'fill-sky-100' : ''} />
        </button>

        <button 
          onClick={() => onTabChange(Tab.PROFILE)} 
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${getTabClass(Tab.PROFILE)}`}
        >
          <User size={26} strokeWidth={currentTab === Tab.PROFILE ? 2.8 : 2} className={currentTab === Tab.PROFILE ? 'fill-sky-100' : ''} />
        </button>
      </div>
    </div>
  );
};