import React from 'react';
import { Card } from '../ui/card';

export const SkeletonCard: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <div className="animate-pulse">
        <div className="w-full h-48 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
          <div className="flex gap-2 mb-3">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-9 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};