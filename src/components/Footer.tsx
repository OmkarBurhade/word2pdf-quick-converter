
import React from 'react';
import { cn } from "@/lib/utils";
import Logo from './Logo';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(
      "w-full py-8 px-6 border-t border-border bg-secondary/30",
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Word2PDF. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
