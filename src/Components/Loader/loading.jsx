import React from "react";

const loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin"></div>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    </div>
  );
};

export default loading;
