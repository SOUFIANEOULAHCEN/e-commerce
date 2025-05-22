import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from './button';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      animation: {
        none: '',
        pulse: 'animate-pulse',
        bounce: 'animate-bounce',
        ripple: 'group',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'none',
    },
  }
);

export const ButtonAnimated = React.forwardRef(
  ({ className, variant, size, animation, children, ...props }, ref) => {
    return (
      <Button
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {animation === 'ripple' && (
          <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white opacity-30 transition-all duration-300 group-hover:scale-100 group-active:opacity-0"></span>
        )}
      </Button>
    );
  }
);

ButtonAnimated.displayName = 'ButtonAnimated';