import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactList from "@/components/organisms/ContactList";

const ContactsPage = () => {
  const navigate = useNavigate();

  const handleStartChat = (chat) => {
    navigate("/messages", { state: { activeChat: chat } });
  };

  return (
    <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
      <ContactList onStartChat={handleStartChat} />
    </div>
  );
};

export default ContactsPage;