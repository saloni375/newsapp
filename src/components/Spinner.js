import React, { Component } from 'react';
import loading from './loading.gif';

export default class spinner extends Component {
  render() {
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
    transform: "scale(2)", 
    transformOrigin: "center" 
  }} 
/>

      </div>
    );
  }
}
