
import React from 'react';
import { cn } from "@/lib/utils";
import { FileText } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn(
      "flex items-center gap-2",
      className
    )}>
      <div className="flex items-center justify-center rounded-md w-8 h-8 bg-primary text-white">
        <FileText className="h-5 w-5" />
      </div>
      <span className="font-semibold text-lg">Word2PDF</span>
    </div>
  );
};

export default Logo;
