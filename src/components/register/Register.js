import React from 'react';

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onRegisterChange = () => {
		fetch('https://vast-taiga-11588.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
		.then(response => response.json())
		.then(user =>{
			if(user.id) {
				console.log(user);
				this.props.loadUser(user);
				this.props.onRoutechange('home');
			}
		})
	}

	render() {
		const {onRoutechange} = this.props;
		return (
			<article className="br3 ba ttu shadow-3 b--black-10 w-150 w-50-m w-25-l mw6 center signin">
				<main className="pa4 black-80">
				  <div className="measure" methode="get">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ttu ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="text" 
				        	name="name"  
				        	id="name" 
				        	onChange={this.onNameChange}
				        	/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address" 
					        onChange={this.onEmailChange}
					        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password" 
					        onChange={this.onPasswordChange}
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick={this.onRegisterChange}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer ttu f6 dib" 
				      	type="submit" 
				      	value="Register" />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRoutechange('signin')} href="#0" className="f6 link dim black db pointer">Sign In</p>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Register;