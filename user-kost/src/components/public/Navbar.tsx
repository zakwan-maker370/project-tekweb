import React from 'react';
import { Home } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gray-900">Kost</span>
                <span className="text-emerald-600">Finder</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
