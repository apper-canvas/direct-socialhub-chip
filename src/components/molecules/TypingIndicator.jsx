import React from "react";
import { cn } from "@/utils/cn";
import Avatar from "@/components/atoms/Avatar";

const TypingIndicator = ({ user, className }) => {
  return (
    <div className={cn("flex items-start space-x-3 mr-12", className)}>
      <Avatar src={user.avatar} alt={user.name} size="sm" />
      <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-2 shadow-sm">
        <div className="typing-dots">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
        
        {/* Message tail */}
        <div className="absolute left-0 top-0 -translate-x-full w-0 h-0 border-r-[8px] border-r-white border-t-[8px] border-t-transparent" />
      </div>
    </div>
  );
};

export default TypingIndicator;