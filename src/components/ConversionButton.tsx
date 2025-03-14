
import React from 'react';
import { cn } from "@/lib/utils";
import { FileDown } from 'lucide-react';

interface ConversionButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ConversionButton: React.FC<ConversionButtonProps> = ({
  onClick,
  isLoading = false,
  isDisabled = false,
  className,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={cn(
        "relative w-full max-w-md py-3 px-6 rounded-lg font-medium text-center transition-all duration-300 overflow-hidden",
        "text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
        "bg-primary hover:bg-primary/90 active:scale-[0.98]",
        isDisabled && !isLoading ? "opacity-50 cursor-not-allowed" : "",
        isLoading ? "cursor-wait" : "",
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-center gap-2",
        isLoading ? "invisible" : "visible"
      )}>
        <FileDown className="h-5 w-5" />
        <span>Convert to PDF</span>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="h-2 w-2 rounded-full bg-white animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}
    </button>
  );
};

export default ConversionButton;
