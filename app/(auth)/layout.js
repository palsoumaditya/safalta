import React from 'react';

const Authlayout = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen mt-20">
      {children}
    </div>
  );
};

export default Authlayout;
