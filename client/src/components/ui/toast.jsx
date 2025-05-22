import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ToastContainer = ({ children, position = 'bottom-right', className }) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  };

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-2 max-w-md w-full',
        positionClasses[position],
        className
      )}
    >
      {children}
    </div>
  );
};

export const Toast = ({
  message,
  type = 'success',
  duration = 3000,
  onClose,
  className
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Allow time for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />
  };

  const styles = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800'
  };

  const iconStyles = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500'
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 border-l-4 rounded-md shadow-md transition-all duration-300 ease-in-out',
        styles[type],
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className={iconStyles[type]}>{icons[type]}</span>
        <p className="font-medium">{message}</p>
      </div>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => onClose && onClose(), 300);
        }}
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};