'use client';

import { useEffect, useId, useRef, useState } from "react";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
}

export default function Tooltip({text, children}: TooltipProps){

  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)){
          setOpen(false);
        }
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'Escape') setOpen(false);
    }

    if(open){
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  const isVisible = open || isHovered;
  const tooltipId = useId();

  return (
    <div className="relative block" ref={tooltipRef}>
      <div
      aria-label='More info'
      onClick={() => {
        if(isHovered){
          setOpen(false);
        } else {
          setOpen(prev => !prev);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className=""
      >
        {children}
      </div>
      <span
        role='tooltip'
        id={tooltipId}
        aria-hidden={!isVisible}
        className={`bg-surface-raised p-2 absolute rounded-lg top-[110%] left-1/2 -translate-x-1/2 shadow-lg  transition-opacity duration-150 ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        {text}
      </span>
    </div>
  )
}