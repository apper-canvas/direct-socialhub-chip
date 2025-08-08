import React from "react";
import { cn } from "@/utils/cn";
import { formatDistanceToNow } from "date-fns";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";

const ChatListItem = ({ chat, isActive, onClick, className }) => {
  const otherParticipant = chat.otherParticipant;
  const lastMessage = chat.lastMessage;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return date.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit",
        hour12: false 
      });
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric" 
      });
    }
  };

  return (
    <div
      onClick={() => onClick(chat)}
      className={cn(
        "flex items-center space-x-3 p-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 border-b border-gray-100 last:border-b-0",
        isActive && "bg-primary/5 hover:bg-primary/5 border-l-4 border-l-primary",
        className
      )}
    >
      <Avatar 
        src={otherParticipant.avatar} 
        alt={otherParticipant.name} 
        size="lg"
        isOnline={otherParticipant.isOnline}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className={cn(
            "font-medium truncate",
            chat.unreadCount > 0 ? "text-gray-900" : "text-gray-800"
          )}>
            {otherParticipant.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 flex-shrink-0">
              {formatTime(chat.updatedAt)}
            </span>
            {chat.unreadCount > 0 && (
              <Badge variant="primary" className="text-xs min-w-[20px] h-5 flex items-center justify-center">
                {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className={cn(
            "text-sm truncate",
            chat.unreadCount > 0 ? "text-gray-700 font-medium" : "text-gray-500"
          )}>
            {lastMessage?.content || "No messages yet"}
          </p>
          
          {otherParticipant.isOnline && (
            <div className="flex items-center space-x-1 text-xs text-success">
              <div className="w-2 h-2 bg-success rounded-full status-online" />
              <span className="hidden sm:inline">Online</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;