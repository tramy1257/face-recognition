import React from 'react';
import 'tachyons';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logoPNG from './logo.png';

const Logo = () => {
  return (
    <Tilt
      className="Tilt br2 shadow-2"
      tiltMaxAngleX={20}
      tiltMaxAngleY={20}>
      <div><img src={logoPNG} alt="logo"/></div>
    </Tilt>
  )
}

export default Logo;
