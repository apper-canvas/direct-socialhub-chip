import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary to-primary-dark text-white",
    secondary: "bg-gradient-to-r from-accent to-blue-600 text-white",
    success: "bg-gradient-to-r from-success to-green-600 text-white",
    warning: "bg-gradient-to-r from-warning to-orange-600 text-white",
    error: "bg-gradient-to-r from-error to-red-600 text-white"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-200",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;