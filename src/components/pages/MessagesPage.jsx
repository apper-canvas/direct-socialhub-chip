import React, { useEffect, useState } from "react";
import ChatList from "@/components/organisms/ChatList";
import ChatWindow from "@/components/organisms/ChatWindow";
import ApperIcon from "@/components/atoms/ApperIcon";
import { chatService } from "@/services/api/chatService";

const MessagesPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
  };

  const handleBackToList = () => {
    setActiveChat(null);
  };

  // On mobile, show either chat list or chat window
  if (isMobileView) {
    return (
      <div className="h-full">
        {activeChat ? (
          <div className="h-full">
            <div className="lg:hidden flex items-center p-4 bg-white border-b border-gray-200">
              <button
                onClick={handleBackToList}
                className="mr-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="ArrowLeft" size={20} className="text-gray-600" />
              </button>
              <span className="font-medium text-gray-900">Back to Chats</span>
            </div>
            <div className="h-[calc(100%-64px)]">
              <ChatWindow chat={activeChat} />
            </div>
          </div>
        ) : (
          <ChatList activeChat={activeChat} onChatSelect={handleChatSelect} />
        )}
      </div>
    );
  }

  // Desktop view shows both panels
  return (
    <div className="h-full flex bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="w-1/3 border-r border-gray-200">
        <ChatList activeChat={activeChat} onChatSelect={handleChatSelect} />
      </div>
      <div className="flex-1">
        <ChatWindow chat={activeChat} />
      </div>
    </div>
  );
};

export default MessagesPage;