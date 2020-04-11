import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';


const Logo = () => {
  return (
    <div className="ma4 mt0"> 
      <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }}>
        <div className="Tilt-inner pa3"> 
          <img src="https://cdn.pixabay.com/photo/2016/10/02/19/50/brain-1710293_960_720.png" alt="brain"/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;