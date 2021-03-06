import React from 'react';


class SignIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitChange = () => {
		fetch('https://vast-taiga-11588.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
        .then(user => {
	        if(user.id){
	          this.props.loadUser(user);
	          this.props.onRoutechange('home');
	        } else {
	        	alert('Username or Password is wrong!');
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
			      <legend className="f1 fw6 ttu ph0 mh0">Sign In</legend>
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
			      	onClick={this.onSubmitChange}
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer ttu f6 dib" 
			      	type="submit" 
			      	value="Sign in" />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={() => onRoutechange('register')} href="#0" className="f6 link pointer dim black db">Register</p>
			    </div>
			  </div>
			</main>
		</article>
		);
    }
}    


export default SignIn;