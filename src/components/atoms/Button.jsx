import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover-lift";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-lg focus:ring-primary/50",
    secondary: "bg-gradient-to-r from-accent to-blue-600 text-white hover:from-blue-600 hover:to-accent shadow-lg focus:ring-accent/50",
    outline: "border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-300/50",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:ring-gray-300/50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;