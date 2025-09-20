import React, { useRef, useState, useEffect } from 'react';

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  ariaLabel?: string;
  className?: string;
}

export const Lens = ({ 
  children, 
  zoomFactor = 2, 
  lensSize = 150, 
  isStatic = false, 
  ariaLabel = "Zoom Area",
  className = "" 
}: LensProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerRect(containerRef.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
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

  const lensStyle = {
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

// Demo component to show how it works
export const LensDemo = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <Lens
          zoomFactor={2}
          lensSize={150}
          isStatic={false}
          ariaLabel="Zoom Area"
        >
          <img
            src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image placeholder"
            className="w-full h-auto"
          />
        </Lens>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">Your next camp</h3>
          <p className="text-gray-600 mb-4">
            See our latest and best camp destinations all across the five
            continents of the globe.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Let's go
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
              Another time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};