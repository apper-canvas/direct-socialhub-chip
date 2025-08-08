import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import SearchBar from "@/components/molecules/SearchBar";
import ContactItem from "@/components/molecules/ContactItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { userService } from "@/services/api/userService";
import { chatService } from "@/services/api/chatService";

const ContactList = ({ onStartChat, className }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userService.getAll();
      setContacts(data);
    } catch (err) {
      setError("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleStartChat = async (contact) => {
    try {
      // Check if chat already exists
      const existingChats = await chatService.getAll();
      let chat = existingChats.find(c => 
        c.participants.includes("1") && c.participants.includes(contact.Id.toString())
      );

      if (!chat) {
        // Create new chat
        const chatData = {
          participants: ["1", contact.Id.toString()],
          lastMessage: null,
          unreadCount: 0,
          updatedAt: new Date().toISOString()
        };
        chat = await chatService.create(chatData);
      }

      onStartChat(chat);
      toast.success(`Started chat with ${contact.name}`);
    } catch (err) {
      toast.error("Failed to start chat");
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadContacts} />;

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Contacts</h2>
        <SearchBar
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredContacts.length === 0 ? (
          <Empty 
            title="No contacts found"
            description={searchTerm ? "Try adjusting your search terms" : "Add some friends to start messaging"}
            actionLabel="Refresh"
            onAction={loadContacts}
          />
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredContacts.map((contact) => (
              <ContactItem
                key={contact.Id}
                contact={contact}
                onMessage={handleStartChat}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;