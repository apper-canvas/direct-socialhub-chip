import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const TextArea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea";

export default TextArea;