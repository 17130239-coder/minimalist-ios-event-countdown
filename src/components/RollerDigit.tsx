import React, { useEffect, useRef, useState } from 'react';

interface RollerDigitProps {
  value: string;
  unitLabel: string;
  widthClass?: string;
  isAccent?: boolean;
}

export const RollerDigit: React.FC<RollerDigitProps> = ({
  value,
  unitLabel,
  widthClass = 'min-w-[32px]',
  isAccent = false,
}) => {
  const [currentVal, setCurrentVal] = useState(value);
  const [prevVal, setPrevVal] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const prevValRef = useRef(value);

  const textStyle = isAccent
    ? 'text-[#007AFF] dark:text-[#38BDF8]'
    : 'text-slate-900 dark:text-white';

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
        className={`digit-capsule px-2 py-1 rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-black/60 shadow-xs flex items-center justify-center ${widthClass}`}
      >
        <div className={`roller-wrapper font-mono text-[16px] font-bold ${textStyle} tabular-nums`}>
          {prevVal !== null && animating && (
            <div className={`roller-item slide-out font-mono text-[16px] font-bold ${textStyle}`}>
              {prevVal}
            </div>
          )}
          <div
            className={`roller-item font-mono text-[16px] font-bold ${textStyle} ${
              animating ? 'slide-in-active' : ''
            }`}
          >
            {currentVal}
          </div>
        </div>
      </div>
      <span className="text-[10px] font-mono text-slate-500 dark:text-white/50 uppercase font-semibold select-none">
        {unitLabel}
      </span>
    </div>
  );
};
