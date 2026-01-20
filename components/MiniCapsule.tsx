import React from 'react';
import { MoreHorizontal, Disc } from 'lucide-react';

export const MiniCapsule: React.FC = () => {
  return (
    <div className="absolute top-[14px] right-[24px] z-[100] flex items-center bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-full px-3 py-1.5 gap-3 shadow-sm h-8 w-[87px] justify-between box-border">
      <div className="flex items-center justify-center w-6">
        <MoreHorizontal size={18} className="text-black" strokeWidth={2.5} />
      </div>
      <div className="w-[1px] h-4 bg-gray-300/80"></div>
      <div className="flex items-center justify-center w-6">
        <div className="w-4 h-4 rounded-full border-[1.5px] border-black relative flex items-center justify-center">
            <div className="w-1 h-1 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};