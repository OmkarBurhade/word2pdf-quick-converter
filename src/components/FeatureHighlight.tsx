
import React from 'react';
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

interface FeatureHighlightProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  icon: Icon,
  title,
  description,
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300",
      "hover:bg-secondary/70",
      className
    )}>
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default FeatureHighlight;
