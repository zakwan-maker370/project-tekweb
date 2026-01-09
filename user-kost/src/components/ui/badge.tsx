import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  const variants = {
    default: 'bg-emerald-100 text-emerald-800',
    secondary: 'bg-green-100 text-gray-800',
    outline: 'border border-emerald-600 text-emerald-600',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};