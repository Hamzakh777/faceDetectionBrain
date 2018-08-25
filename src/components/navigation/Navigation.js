import React from 'react';

const Navigation = ({onRoutechange, isSignedIn}) => {
	if(isSignedIn){
		return (
			<nav style={{display:'flex', justifyContent: 'flex-end'} }>
	      <p onClick={()=> onRoutechange('signin')} className='f3 link dim white pa3 ba b--white-80 ma4 bw1 pointer ttu'>Sign Out</p>
	    </nav> 
	)} else {
		return (
			<nav style={{display:'flex', justifyContent: 'flex-end'} }>
	      <p onClick={()=> onRoutechange('register')} className='f3 link dim white pa3 ba b--white-80 ma4 bw1 pointer ttu'>Register</p>
	      <p onClick={()=> onRoutechange('signin')} className='f3 link dim white pa3 ba b--white-80 ma4 bw1 pointer ttu'>Sign In</p>
	    </nav> 
	)}
}

export default Navigation;