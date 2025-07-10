import React from 'react';
import clsx from 'clsx';

export const Button = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-zinc-700 text-white hover:bg-zinc-600',
    ghost: 'bg-transparent text-muted-foreground hover:text-white hover:bg-zinc-800',
    outline: 'border border-zinc-600 text-white hover:bg-zinc-800',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
