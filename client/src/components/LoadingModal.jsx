import React from 'react';

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingModal;