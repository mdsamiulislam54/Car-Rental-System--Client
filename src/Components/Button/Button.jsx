import React from 'react';
import { FaCar } from "react-icons/fa";
const Button = ({ text, type = 'button', icon: Icon, onClick }) => {
  return (
    <button onClick={onClick} type={type} className="flex items-center gap-2 px-4 py-2 border rounded-md bg-primary text-white hover:bg-primary/80 transition-all duration-300 cursor-pointer">
      {text}
      {Icon && <Icon />}
    </button>
  );
};

export default Button;
