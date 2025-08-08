import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Avatar = forwardRef(({ className, src, alt, size = "md", isOnline = false, ...props }, ref) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const statusSizes = {
    sm: "w-2 h-2 -bottom-0 -right-0",
    md: "w-2.5 h-2.5 -bottom-0.5 -right-0.5",
    lg: "w-3 h-3 -bottom-1 -right-1",
    xl: "w-4 h-4 -bottom-1 -right-1"
  };

  return (
    <div className={cn("relative inline-flex", className)} ref={ref} {...props}>
      <img
        src={src || `https://ui-avatars.com/api/?name=${encodeURIComponent(alt || "User")}&background=25D366&color=fff&size=64`}
        alt={alt}
        className={cn(
          "rounded-full object-cover ring-2 ring-white shadow-sm",
          sizes[size]
        )}
      />
      {isOnline && (
        <div className={cn(
          "absolute bg-success rounded-full border-2 border-white status-online",
          statusSizes[size]
        )} />
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;