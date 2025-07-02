import React from 'react';
import logo from '../../assets/logo.png';

const DxbtLogo = ({ style = {}, className = '' }) => (
  <div style={{ display: 'flex', justifyContent: 'center', ...style }} className={className}>
    <img 
      src={logo} 
      alt="DXBT Logo" 
      style={{ maxWidth: 80, maxHeight: 80, borderRadius: '16px', boxShadow: '0 2px 12px rgba(166,142,69,0.13)', background: '#fff', ...style }}
    />
  </div>
);

export default DxbtLogo;
