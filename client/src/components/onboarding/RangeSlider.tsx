import React from 'react';

export interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  helperText?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  min,
  max,
  step = 50,
  value,
  onChange,
  formatValue = (v) => `$${v.toLocaleString()}/mo`,
  helperText,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-baseline">
        <label className="font-sans text-label-caps text-secondary uppercase font-bold tracking-wider">
          {label}
        </label>
        <span className="font-serif text-headline-sm font-bold text-earth-indigo">
          {formatValue(value)}
        </span>
      </div>

      <div className="relative flex items-center h-6">
        {/* Track */}
        <div className="w-full h-2 bg-surface-dim rounded-full overflow-hidden">
          <div
            className="h-full bg-earth-indigo transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Real Range Input Overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />

        {/* Custom Thumb */}
        <div
          className="absolute w-5 h-5 bg-clay border-2 border-earth-indigo rounded-full shadow-md pointer-events-none transform -translate-x-1/2 transition-all duration-75"
          style={{ left: `${percentage}%` }}
        />
      </div>

      {helperText && (
        <p className="font-sans text-body-md text-xs text-secondary">{helperText}</p>
      )}
    </div>
  );
};
