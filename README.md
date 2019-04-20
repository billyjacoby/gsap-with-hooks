---
title: Greensock Animations using React Hooks
published: false
description: A quick example for how to use Greensock on demand animations with react hooks
tags: gsap, greensock, react, hooks
---

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

{% gist https://gist.github.com/billyjacoby/a7ceb8336e4a962ae6ee067e7059f98a %}

Looking at the development server, the logo should no longer be spinning.

Now we're going to add three buttons to our app that Pause, Play, and Reverse our animation. We're also going to turn the App component into a functional component.

Your `App.js` should look similar to this after adding the buttons:

{% gist https://gist.github.com/billyjacoby/301453e07f887d05b2a628ec8e922f0b %}

Okay, now for the real work. In order to accomplish this correctly only using a functional component we will need to import useState, useRef, and useEffect from react.

Replace the `import React from "react";` line with:

`import React, {useState, useRef, useEffect} from "react";`

The first thing we'll do is create a new ref and store the react img logo in it. This will ensure that this node is loaded on the DOM before we try to animate it with Greensock.

{% gist https://gist.github.com/billyjacoby/7cb7784103fabfa6d83c2cd48148d1ae %}

The next thing we'll do is create a react state object to store our animation function in. This will ensure that we are always accessing the already existing animation function as opposed to creating a new one.

{% gist https://gist.github.com/billyjacoby/bf7134f3ea1bd8b22e6df8862f1628b3 %}

Next we have to use the useEffect hook to make sure that the animation is only created once the DOM has been rendered. We will create our animation function here and store it in our state object.

{% gist https://gist.github.com/billyjacoby/2141a632d71dad008397f8107ce7e203 %}

Since we don't want our animation to play as soon as it's loaded, we throw the `.pause()` method on the end of it. This will enable us to control when it starts rather than just starting on loading.

The last thing to do is to wire up our buttons to do their jobs!

{% https://gist.github.com/billyjacoby/abb69fbcd357cd6fb94af35bb33962f8 %}

Note that the reverse method basically rewinds the animation, so it will only work if the animation has been funning for a few seconds.
