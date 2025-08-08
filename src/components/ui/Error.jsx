import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="w-16 h-16 bg-gradient-to-r from-error to-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
        <ApperIcon name="AlertTriangle" size={32} className="text-white" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">{message}</p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="primary"
          className="flex items-center space-x-2"
        >
          <ApperIcon name="RefreshCw" size={16} />
          <span>Try Again</span>
        </Button>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        If the problem persists, please contact support
      </div>
    </div>
  );
};

export default Error;