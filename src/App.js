import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/signInForm/SignIn';
import Register from './components/register/Register';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import './App.css';
import 'tachyons';


const ParticlesOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
  ,
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "repulse"
      },
}}}

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date()
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  } 
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageinput');
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      leftcol: clarifaiFace.left_col * width,
      rightcol: width - (clarifaiFace.right_col * width),
      toprow: clarifaiFace.top_row * height,
      bottomrow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
      fetch('https://vast-taiga-11588.herokuapp.com/imageurl', {
        method: 'post',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('https://vast-taiga-11588.herokuapp.com:3000/image', {
            method: 'put',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
          .then(response => response.json())
          .then(entries =>{
            this.setState(Object.assign(this.state.user, {entries: entries}))
          })
          .catch(console.log)
        }else {
          alert('an error happened')
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
        console.log(response)
      })
      .catch(err => console.log('an error happened', err))
  }
  
  
  onRoutechange = (route) => {
    if(route === 'home') {
      this.setState({isSignedIn: true})
    } else if(route === 'signin'){
      this.setState(initialState)
    }
    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.date
    }})
  }
  
  render() {
    const {isSignedIn, box, imageURL, route} = this.state;
    return (
      <div className="App">
        <Particles className="particles" 
        params={ParticlesOptions}/>
        {
        route === 'home' 
        ?
        <div>
          <Navigation 
            isSignedIn={isSignedIn}
            onRoutechange={this.onRoutechange}/>
            <Logo className="logo"/>
          <Rank 
            name={this.state.user.name}
            entries={this.state.user.entries}
          />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition 
            box={box} 
            imageURL={imageURL} />
        </div>
        : 
          (
          route === 'signin' 
          ?
          <div>
            <Navigation 
            isSignedIn={isSignedIn}
            onRoutechange={this.onRoutechange}/>
            <Logo className="logo"/>
            <SignIn loadUser={this.loadUser} onRoutechange={this.onRoutechange}/>
          </div>
          :
          <div>
            <Navigation 
            isSignedIn={isSignedIn}
            onRoutechange={this.onRoutechange}/>
            <Logo className="logo"/>
            <Register loadUser={this.loadUser} onRoutechange={this.onRoutechange}/>
          </div>
          )
        
        }
      </div>
    );
  }
}

export default App;
