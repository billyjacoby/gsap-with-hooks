# Greensock Animations using React Hooks

## A quick example for how to use Greensock on demand animations with react hooks

This is a brief tutorial on how to animate components on demand with Greensock and React hooks.

We'll be using Create react app in this tutorial.

To begin create a new app:

`create-react-app gsap-with-hooks`
`cd gsap-with-hooks`

The only other dependency we will need for this tutorial is GSAP.

`yarn add gsap`

Start the development server so that we can see our changes

`yarn start`

Since we will be adding our own animations here, remove the lines that animate the React Logo from `src/App.css`

```
.App {
text-align: center;
}

.App-logo {
/_ Comment out the line below _/
/_ animation: App-logo-spin infinite 20s linear; _/
height: 40vmin;
pointer-events: none;
}

.App-header {
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-size: calc(10px + 2vmin);
color: white;
}

.App-link {
color: #61dafb;
}
/_ Commment out the code below _/
/_ @keyframes App-logo-spin {
from {
transform: rotate(0deg);
}
to {
transform: rotate(360deg);
}
} _/
```

Looking at the development server, the logo should no longer be spinning.

Now we're going to add three buttons to our app that Pause, Play, and Reverse our animation. We're also going to turn the App component into a functional component.

Your `App.js` should look similar to this after adding the buttons:

```
import React from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* Only this div and buttons have been added */}
        <div>
          <button>Play</button>
          <button>Pause</button>
          <button>Reverse</button>
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
```

Okay, now for the real work. In order to accomplish this correctly only using a functional component we will need to import useState, useRef, and useEffect from react.

Replace the `import React from "react";` line with:

`import React, {useState, useRef, useEffect} from "react";`

The first thing we'll do is create a new ref and store the react img logo in it. This will ensure that this node is loaded on the DOM before we try to animate it with Greensock.

```
// new
import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  // new
  let imgRef = useRef(null);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          // new
          ref={element => {
            imgRef = element;
          }}
        />
        <div>
          <button>Play</button>
          <button>Pause</button>
          <button>Reverse</button>
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

```

The next thing we'll do is create a react state object to store our animation function in. This will ensure that we are always accessing the already existing animation function as opposed to creating a new one.

```
import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {

  let imgRef = useRef(null);

  // New
  const [animation, setAnimation] = useState();

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
          <button>Play</button>
          <button>Pause</button>
          <button>Reverse</button>
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

```

Next we have to use the useEffect hook to make sure that the animation is only created once the DOM has been rendered. We will create our animation function here and store it in our state object.

```
import React, { useState, useRef, useEffect } from "react";
import { TweenMax } from "gsap";
import logo from "./logo.svg";
import "./App.css";

const App = () => {

  let imgRef = useRef(null);

  const [animation, setAnimation] = useState(null);

  // New
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
          <button>Play</button>
          <button>Pause</button>
          <button>Reverse</button>
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

```

Since we don't want our animation to play as soon as it's loaded, we throw the `.pause()` method on the end of it. This will enable us to control when it starts rather than just starting on loading.

The last thing to do is to wire up our buttons to do their jobs!

```
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
          // New - just add the onclick handlers!
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

```

Note that the reverse method basically rewinds the animation, so it will only work if the animation has been funning for a few seconds.
