import React, { useState, useEffect } from 'react';

const Message = ({ children, tipo }) => {

  

  return (
    <>
        <div className={`alerta ${tipo} my-4`}>
        <strong className=' text-red-500'>{children}</strong>
        </div>
    
    </>
  );
};

export default Message;
