import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className }) => {
  return (
    <div className={cn("flex flex-col space-y-4 p-6", className)}>
      {/* Header skeleton */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6 animate-pulse"></div>
      </div>

      {/* Image skeleton */}
      <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>

      {/* Actions skeleton */}
      <div className="flex items-center space-x-4">
        <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
        <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
        <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Multiple skeleton items */}
      <div className="space-y-6 pt-4 border-t border-gray-200">
        {[1, 2].map((item) => (
          <div key={item} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;