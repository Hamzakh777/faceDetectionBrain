import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) => {
	return(
        <div className="center ma">
        	<div className="absolute mt2">
        		<img src={imageURL} alt='' width='500px' id='imageinput' height='auto' />
        		<div className='bounding-box' style={{top: box.toprow, bottom: box.bottomrow, left: box.leftcol, right: box.rightcol}}></div>
        	</div>
        </div>
		);
}

export default FaceRecognition;