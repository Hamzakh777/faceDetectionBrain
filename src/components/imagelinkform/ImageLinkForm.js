import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return(
    <div>
  		<p className='f3 black'>
  			{'This Magic Brain will detect faces in photos. Give it a try!'}
  		</p>
  		<div className='center'>
  			<div className='center form pa4 br3 shadow-5'>
  				<input className='f4 pa40 w-70 center' type='text' onChange={onInputChange}/>
  			<button className='w-30 grow f4 link dib ph3 pv2 white bg-light-green' type='submit' onClick={onButtonSubmit}>Detect</button>
  		  </div>
  		</div>
    </div>
		);
}

export default ImageLinkForm;