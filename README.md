# Javascript Particle Fields

My implementation of a basic particle simulation using canvas based off of
[this](http://html5hub.com/build-a-javascript-particle-system/) online
guide but with my own additions including:

* Field Particles: Fields that can move and have an associated particle
* TimeStream Objects: Objects that manage entire sets of particles allowing
  multiple non-interacting particles to be displayed.
* Selective Fields: Fields that have an associated selector function that
  allows fields to only affect certain particles.
* Selective Fields can also modify their target particles by, for instance,
  changing their color.

This library uses canvas to allow us to render 1000s of particles to the screen
at a very high FPS because we don’t have to use the DOM and, through that, can
avoid having an associated node with every single particle object that we
render.

Similarly, by only having some particles have associated fields, we can render
many objects and submit them to fields without hitting truly n^2 time for
simulation - allowing much smoother rendering.
