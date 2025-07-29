import React from 'react';

const Button = ({ text, type = 'button', icon: Icon }) => {
  return (
    <button type={type} className="flex items-center gap-2 px-4 py-2 border rounded-md bg-primary text-white hover:bg-primary/80 transition-all duration-300 cursor-pointer">
      {text}
      {Icon && <Icon />}
    </button>
  );
};

export default Button;
