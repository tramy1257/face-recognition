import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from "react-tsparticles";
import React from 'react';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const particleOptions = {
  background: {
    color: { value: "transparent" },
  },
  fpsLimit: 60,
  interactivity: {
    events: { resize: true, },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: { quantity: 4 },
      repulse: {
        distance: 200,
        duration: 0.4
      },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    collisions: { enable: true },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}

const app = new Clarifai.App({
 apiKey: '39251ca5e78649c08c2dad1cd10abd9d'
});

const defaultState = {
    input: '',
    imageUrl: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      email: '',
      name: '',
      id: '',
      entries: 0,
      joined: ''
    }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        email: '',
        name: '',
        id: '',
        entries: 0,
        joined: ''
      }
    }
  }

  calcFaceLocation = (data) => {
    const regionInfo = data.outputs[0].data.regions;
    const image = document.getElementById('inputImg');

    const width = Number(image.width);
    const height = Number(image.height);

    const boxes = [];

    for (const region of regionInfo) {
      const boundingBox = region.region_info.bounding_box;

      boxes.push({
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - (boundingBox.right_col * width),
        bottomRow: height - (boundingBox.bottom_row * height)
      });
    }

    return boxes;
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  loadUser = (data) => {
    this.setState({
      imageUrl: '',
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      } });
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({ imageUrl: this.state.input })

    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
    .then(response => {
      this.displayFaceBox(this.calcFaceLocation(response))
      fetch('http://localhost:2000/image', {
          method: "put",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
      })
      .then(response => response.json())
      .then(newEntries => {
        this.setState(Object.assign(this.state.user, { entries: newEntries }));
      })
      .catch(err => console.log(err));
    })

    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    if (route === 'signout') {
      this.setState(defaultState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
  }

  render() {
    return (
      <div className="App">
        <Particles
          id="tsparticles"
          options={particleOptions}/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm
              onButtonSubmit={this.onButtonSubmit}
              onInputChange={this.onInputChange}/>
            <FaceRecognition imageUrl={this.state.imageUrl} boxes={this.state.boxes} />
          </div>
          : (
            this.state.route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }

}

export default App;
