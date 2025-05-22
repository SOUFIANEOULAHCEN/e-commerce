import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export const InputEnhanced = React.forwardRef(
  ({ className, type, label, error, icon, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value);

    const handleFocus = (e) => {
      setIsFocused(true);
      props.onFocus && props.onFocus(e);
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      props.onBlur && props.onBlur(e);
    };

    const handleChange = (e) => {
      setHasValue(!!e.target.value);
      props.onChange && props.onChange(e);
    };

    return (
      <div className="relative w-full">
        {label && (
          <label
            className={cn(
              'absolute left-3 transition-all duration-200 pointer-events-none',
              (isFocused || hasValue) 
                ? '-top-2 text-xs bg-white px-1 text-blue-600 font-medium' 
                : 'top-2 text-gray-500',
              error && 'text-red-500'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
              'transition-all duration-200 ease-in-out',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              error && 'border-red-500 focus:ring-red-500',
              icon && 'pl-10',
              label && 'pt-1',
              className
            )}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

InputEnhanced.displayName = 'InputEnhanced';