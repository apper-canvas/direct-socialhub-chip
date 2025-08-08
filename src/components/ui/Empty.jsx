import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "Nothing here yet", 
  description = "Get started by adding some content",
  actionLabel = "Get Started",
  onAction,
  icon = "Inbox",
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center", className)}>
      <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center mb-6 shadow-lg">
        <ApperIcon name={icon} size={40} className="text-white" />
      </div>
      
      <h3 className="text-xl font-semibold gradient-text mb-3">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">{description}</p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          size="lg"
          className="flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Plus" size={18} />
          <span>{actionLabel}</span>
        </Button>
      )}
      
      <div className="mt-8 flex items-center space-x-6 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <ApperIcon name="MessageCircle" size={16} />
          <span>Start chatting</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Users" size={16} />
          <span>Connect with friends</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Share2" size={16} />
          <span>Share moments</span>
        </div>
      </div>
    </div>
  );
};

export default Empty;