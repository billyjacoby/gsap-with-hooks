import React, { useState, useRef, useEffect } from "react";
import { TweenMax } from "gsap";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  let imgRef = useRef(null);

  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    setAnimation(
      TweenMax.to(imgRef, 10, {
        rotation: 360,
        repeat: -1
      }).pause()
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          ref={element => {
            imgRef = element;
          }}
        />
        <div>
          <button onClick={() => animation.play()}>Play</button>
          <button onClick={() => animation.pause()}>Pause</button>
          <button onClick={() => animation.reverse()}>Reverse</button>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
