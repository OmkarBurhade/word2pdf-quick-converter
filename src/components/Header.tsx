
import React from 'react';
import { cn } from "@/lib/utils";
import Logo from './Logo';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "w-full py-4 px-6 border-b border-border/50 bg-background/50 backdrop-blur-sm",
      "fixed top-0 left-0 right-0 z-10",
      className
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </a>
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
