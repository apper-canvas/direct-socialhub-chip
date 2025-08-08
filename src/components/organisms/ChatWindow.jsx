import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import MessageBubble from "@/components/molecules/MessageBubble";
import TypingIndicator from "@/components/molecules/TypingIndicator";
import EmojiPicker from "@/components/molecules/EmojiPicker";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { messageService } from "@/services/api/messageService";

const ChatWindow = ({ chat, currentUserId = "1", className }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMessages = async () => {
    if (!chat) return;
    
    try {
      setLoading(true);
      const data = await messageService.getByChatId(chat.Id);
      setMessages(data);
    } catch (err) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage.trim()) {
      const timer = setTimeout(() => setIsTyping(true), 1000);
      return () => {
        clearTimeout(timer);
        setIsTyping(false);
      };
    }
  }, [newMessage]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chat) return;

    const messageData = {
      chatId: chat.Id,
      senderId: currentUserId,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isRead: false,
      type: "text"
    };

    try {
      const savedMessage = await messageService.create(messageData);
      setMessages(prev => [...prev, savedMessage]);
      setNewMessage("");
      inputRef.current?.focus();
      toast.success("Message sent!");
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji);
    inputRef.current?.focus();
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center">
            <ApperIcon name="MessageCircle" size={32} className="text-white" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to SocialHub</h3>
          <p className="text-gray-600">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <Avatar 
            src={chat.otherParticipant.avatar} 
            alt={chat.otherParticipant.name} 
            size="md"
            isOnline={chat.otherParticipant.isOnline}
          />
          <div>
            <h3 className="font-medium text-gray-900">{chat.otherParticipant.name}</h3>
            <p className="text-sm text-gray-500">
              {chat.otherParticipant.isOnline ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <ApperIcon name="Phone" size={20} className="text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <ApperIcon name="Video" size={20} className="text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <ApperIcon name="MoreVertical" size={20} className="text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble
                key={message.Id}
                message={message}
                isOwn={message.senderId === currentUserId}
                showTime={index === 0 || 
                  new Date(messages[index - 1]?.timestamp).getTime() + 300000 < new Date(message.timestamp).getTime()
                }
              />
            ))}
            
            {isTyping && (
              <TypingIndicator user={chat.otherParticipant} />
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-full border-0 focus:bg-white focus:ring-2 focus:ring-primary/20 resize-none text-sm placeholder:text-gray-500 transition-all duration-200"
              style={{ maxHeight: "120px", minHeight: "44px" }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            </div>
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            variant="primary"
            size="md"
            className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
          >
            <ApperIcon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;