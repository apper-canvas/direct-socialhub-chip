import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const FloatingActionButton = ({ onClick, icon = "Plus", className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-accent to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent/30 z-50 flex items-center justify-center",
        className
      )}
      {...props}
    >
      <ApperIcon name={icon} size={24} />
    </button>
  );
};

export default FloatingActionButton;