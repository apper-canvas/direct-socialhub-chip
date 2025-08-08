import React from "react";
import { cn } from "@/utils/cn";
import { formatDistanceToNow } from "date-fns";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ContactItem = ({ contact, onMessage, className }) => {
  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return "Never";
    return formatDistanceToNow(new Date(lastSeen), { addSuffix: true });
  };

  return (
    <div className={cn("flex items-center space-x-3 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-all duration-200", className)}>
      <Avatar 
        src={contact.avatar} 
        alt={contact.name} 
        size="lg"
        isOnline={contact.isOnline}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
          <Button
            onClick={() => onMessage(contact)}
            variant="primary"
            size="sm"
            className="rounded-full px-3"
          >
            <ApperIcon name="MessageCircle" size={14} />
            <span className="hidden sm:inline ml-1">Message</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 truncate">{contact.status}</p>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            {contact.isOnline ? (
              <div className="flex items-center space-x-1 text-success">
                <div className="w-2 h-2 bg-success rounded-full status-online" />
                <span>Online</span>
              </div>
            ) : (
              <span>Last seen {formatLastSeen(contact.lastSeen)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;