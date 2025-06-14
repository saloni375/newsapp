import React from 'react';
import loading from './loading.gif';

const Spinner = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "60vh",
      width: "100%",
    }}>
      <img 
        src={loading} 
        alt="loading"
        style={{ 
          width: "80px", 
          height: "80px", 
          transform: "scale(1)", 
          transformOrigin: "center" 
        }} 
      />
    </div>
  );
}

export default Spinner;
