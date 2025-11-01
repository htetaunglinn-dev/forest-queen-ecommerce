'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: 'start' | 'end' | 'center';
  className?: string;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
  selected?: boolean;
  className?: string;
}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  className = '',
}: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={className}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  align = 'end',
  className = '',
}: DropdownMenuContentProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-haspopup="true"]')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const alignmentClasses = {
    start: 'left-0',
    end: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div
      ref={contentRef}
      className={`
        absolute z-50 mt-2 min-w-[12rem] overflow-hidden rounded-lg
        border border-gray-200 bg-white shadow-lg
        animate-in fade-in-0 zoom-in-95
        ${alignmentClasses[align]}
        ${className}
      `}
      role="menu"
      aria-orientation="vertical"
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onSelect,
  selected = false,
  className = '',
}: DropdownMenuItemProps) {
  const { setIsOpen } = React.useContext(DropdownMenuContext);

  const handleSelect = () => {
    onSelect?.();
    setIsOpen(false);
  };

  return (
    <button
      type="button"
      role="menuitem"
      onClick={handleSelect}
      className={`
        relative flex w-full cursor-pointer select-none items-center rounded-md
        px-3 py-2 text-sm outline-none transition-colors
        hover:bg-forest-50 hover:text-forest-900
        focus:bg-forest-50 focus:text-forest-900
        ${selected ? 'bg-forest-50 text-forest-900 font-medium' : 'text-gray-700'}
        ${className}
      `}
    >
      <span className="flex-1 text-left">{children}</span>
      {selected && <Check className="ml-2 h-4 w-4 text-forest-600" />}
    </button>
  );
}
