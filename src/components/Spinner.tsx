import { cn } from "@/lib/utils"; // If you're using shadcn/utils
import React from "react";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  size?: string; // tailwind size class like 'w-6 h-6'
  color?: string; // tailwind border color like 'border-purple-500'
}

export const Spinner = ({
  className,
  label,
  size = "w-6 h-6",
  color = "border-purple-700",
  ...props
}: SpinnerProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <div
        className={cn(
          "animate-spin rounded-full border-4 border-t-transparent",
          size,
          color,
        )}
      />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
};
