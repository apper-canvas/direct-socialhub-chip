import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import SearchBar from "@/components/molecules/SearchBar";
import ChatListItem from "@/components/molecules/ChatListItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { chatService } from "@/services/api/chatService";

const ChatList = ({ activeChat, onChatSelect, className }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadChats = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await chatService.getAll();
      setChats(data);
    } catch (err) {
      setError("Failed to load chats. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  const filteredChats = chats.filter(chat =>
    chat.otherParticipant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadChats} />;

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
        <SearchBar
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredChats.length === 0 ? (
          <Empty 
            title="No conversations found"
            description={searchTerm ? "Try adjusting your search terms" : "Start a new conversation with your contacts"}
            actionLabel="Browse Contacts"
            onAction={() => {}}
          />
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredChats.map((chat) => (
              <ChatListItem
                key={chat.Id}
                chat={chat}
                isActive={activeChat?.Id === chat.Id}
                onClick={onChatSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;