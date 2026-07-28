'use client';

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({isOpen, onClose, children}: Props){

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if(isOpen) {
      document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if(!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div ref={contentRef} className="max-h-[90vh] w-full overflow-y-auto rounded-lg flex justify-center">
        {children}
      </div>
    </div>,
    document.body
  )
}