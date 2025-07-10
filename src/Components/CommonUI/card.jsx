import React from 'react';
import clsx from 'clsx';

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-zinc-700 bg-zinc-900 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx('p-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};
