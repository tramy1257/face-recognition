import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from "react-tsparticles";

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

function App() {
  return (
    <div className="App">
      <Particles
        id="tsparticles"
        options={particleOptions}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
