import React from "react";
import { cn } from "@/utils/cn";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const MessageBubble = ({ message, isOwn, showTime = false, className }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit",
      hour12: false 
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col message-enter",
        isOwn ? "items-end ml-12" : "items-start mr-12",
        className
      )}
    >
      <div
        className={cn(
          "relative max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm",
          isOwn 
            ? "bg-gradient-to-r from-primary to-primary-dark text-white rounded-br-none" 
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        
        <div className={cn(
          "flex items-center justify-end mt-1 space-x-1 text-xs",
          isOwn ? "text-white/80" : "text-gray-500"
        )}>
          <span>{formatTime(message.timestamp)}</span>
          {isOwn && (
            <div className="flex items-center">
              {message.isRead ? (
                <div className="flex">
                  <ApperIcon name="Check" size={12} className="text-white/80 -mr-1" />
                  <ApperIcon name="Check" size={12} className="text-blue-300" />
                </div>
              ) : (
                <ApperIcon name="Check" size={12} className="text-white/60" />
              )}
            </div>
          )}
        </div>

        {/* Message tail */}
        <div
          className={cn(
            "absolute top-0 w-0 h-0",
            isOwn
              ? "right-0 translate-x-full border-l-[8px] border-l-primary-dark border-t-[8px] border-t-transparent"
              : "left-0 -translate-x-full border-r-[8px] border-r-white border-t-[8px] border-t-transparent"
          )}
        />
      </div>

      {showTime && (
        <div className="text-xs text-gray-500 mt-1 px-2">
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;