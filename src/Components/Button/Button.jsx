import React from 'react';
import { FaCar } from 'react-icons/fa';

const Button = ({
  text,
  type = 'button',
  icon: Icon,
  onClick,
  disabled = false, 
}) => {
  return (
    <button
      disabled={disabled}  
      onClick={onClick}
      type={type}
      className={`flex items-center gap-2 px-4 py-2 border rounded-md bg-primary text-white hover:bg-primary/80 transition-all duration-300 cursor-pointer ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
    >
      {text}
      {Icon && <Icon />}
    </button>
  );
};

export default Button;
