import * as React from 'react';
import { useRef, useState, useEffect } from 'react';

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  ariaLabel?: string;
  className?: string;
}

export const Lens: React.FC<LensProps> = ({ 
  children, 
  zoomFactor = 2, 
  lensSize = 150, 
  isStatic = false, 
  ariaLabel = "Zoom Area",
  className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerRect(containerRef.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    if (containerRect?.width !== rect.width || containerRect?.height !== rect.height) {
      setContainerRect(rect);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const lensStyle: React.CSSProperties = {
    width: lensSize,
    height: lensSize,
    left: mousePosition.x - lensSize / 2,
    top: mousePosition.y - lensSize / 2,
    backgroundImage: containerRef.current 
      ? `url(${(containerRef.current.querySelector('img') as HTMLImageElement)?.src})` 
      : 'none',
    backgroundSize: containerRect 
      ? `${containerRect.width * zoomFactor}px ${containerRect.height * zoomFactor}px`
      : 'cover',
    backgroundPosition: containerRect 
      ? `-${(mousePosition.x * zoomFactor) - (lensSize / 2)}px -${(mousePosition.y * zoomFactor) - (lensSize / 2)}px`
      : 'center',
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
    >
      {children}
      
      {(isHovered || isStatic) && (
        <div
          className="absolute pointer-events-none border-2 border-white shadow-lg rounded-full z-50"
          style={lensStyle}
        />
      )}
    </div>
  );
};