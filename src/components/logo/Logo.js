import React from 'react';
import ReactTilt from 'react-universal-tilt';
import Brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return(
        <div className='ma4 mt3 overflow-auto '>
          	<ReactTilt className='br2 shadow-1 tilt' options={{max:55 ,shine: true, reset: true, 'shine-opacity': 0.5}}>
          		<img src={Brain} alt="logo" />
			</ReactTilt>
        </div>
		);
}

export default Logo;