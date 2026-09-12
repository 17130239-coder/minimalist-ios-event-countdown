import React, { useEffect, useRef, useState } from 'react';

interface RollerDigitProps {
  value: string;
  unitLabel: string;
  widthClass?: string;
}

export const RollerDigit: React.FC<RollerDigitProps> = ({
  value,
  unitLabel,
  widthClass = 'min-w-[32px]',
}) => {
  const [currentVal, setCurrentVal] = useState(value);
  const [prevVal, setPrevVal] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const prevValRef = useRef(value);

  useEffect(() => {
    if (value !== prevValRef.current) {
      setPrevVal(prevValRef.current);
      setCurrentVal(value);
      setAnimating(true);
      prevValRef.current = value;

      const timer = setTimeout(() => {
        setPrevVal(null);
        setAnimating(false);
      }, 550);

      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`digit-capsule px-2 py-1 rounded-lg border border-white/10 dark:border-white/10 flex items-center justify-center ${widthClass}`}
      >
        <div className="roller-wrapper font-mono text-[16px] font-bold text-white dark:text-white tabular-nums">
          {prevVal !== null && animating && (
            <div className="roller-item slide-out font-mono text-[16px] font-bold">
              {prevVal}
            </div>
          )}
          <div
            className={`roller-item font-mono text-[16px] font-bold ${
              animating ? 'slide-in-active' : ''
            }`}
          >
            {currentVal}
          </div>
        </div>
      </div>
      <span className="text-[10px] font-mono text-white/50 dark:text-white/50 uppercase font-semibold select-none">
        {unitLabel}
      </span>
    </div>
  );
};
