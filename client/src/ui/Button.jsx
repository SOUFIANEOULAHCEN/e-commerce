import React from 'react';

export default function Button({ name, type, BgColor, BgHover }) {
  const bgColorClasses = {
    "gray-950": "bg-gray-950",
    "gray-900": "bg-gray-900",
    
  };

  const bgHoverClasses = {
    "gray-950": "hover:bg-gray-950",
    "gray-900": "hover:bg-gray-900",
    
  };

  return (
    <button
      type={type}
      className={`px-6 py-2 ${bgColorClasses[BgColor]} text-gray-100 ${bgHoverClasses[BgHover]} hover:scale-105 transition-all duration-300 rounded-sm m-1`}
    >
      <span className="inline-block">{name}</span>
    </button>
  );
}