import React, { useEffect, useRef, useState } from 'react';

interface FlipTileProps {
  value: string;
  label: string;
}

export const FlipTile: React.FC<FlipTileProps> = ({ value, label }) => {
  const [currentVal, setCurrentVal] = useState(value);
  const [prevVal, setPrevVal] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousValRef = useRef(value);

  useEffect(() => {
    if (value !== previousValRef.current) {
      setPrevVal(previousValRef.current);
      setCurrentVal(value);
      setIsTransitioning(true);
      previousValRef.current = value;

      const timer = setTimeout(() => {
        setPrevVal(null);
        setIsTransitioning(false);
      }, 550);

      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center flex-1 max-w-[190px]">
      <div className="flip-tile relative w-full aspect-[4/5] rounded-2xl sm:rounded-3xl flex items-center justify-center p-2">
        <div className="digit-container">
          {prevVal !== null && isTransitioning && (
            <span className="digit-value is-exiting font-mono text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white select-none">
              {prevVal}
            </span>
          )}
          <span
            className={`digit-value ${
              isTransitioning ? 'is-current' : 'is-current'
            } font-mono text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white select-none`}
          >
            {currentVal}
          </span>
        </div>
      </div>
      <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-[#8e8e93] font-semibold mt-3.5 sm:mt-4 select-none">
        {label}
      </span>
    </div>
  );
};
