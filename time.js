var maxParticles = 200; // Cap on number of particles for performance reasons.
var emissionRate = 4; // Per Emitter, Per Frame
var particleSize = 1; // How big our particles are.

var TimeStream = function (canvas, context) {
  this.canvas = canvas;
  this.context = context;

  this.particles = [];
  this.emitters = [];
};

TimeStream.prototype.addEmitter = function (emitter) {
  this.emitters.push(emitter);
};

TimeStream.prototype.timeStep = function TimeStep() {
  this.clear(); 
  this.update();
  this.draw();
};

TimeStream.prototype.clear = function Clear() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

TimeStream.prototype.run = function Run() {
  this.timeStep();

  // Launch the animation loop.
  // We use this instread of setInterval because it lets the browser
  // do more intelligent scheduling for us.
  var that = this;
  window.requestAnimationFrame(function () { that.run(); });
};

TimeStream.prototype.update = function Update() {
  this.addNewParticles();
  this.plotParticles();
};

TimeStream.prototype.draw = function Draw() {
  this.context.fillStyle = 'rgb(0,0,255)';
  var context = this.context;

  _.each(this.particles, function (particle) {
    context.fillRect(particle.position.x, particle.position.y, 
      particleSize, particleSize); // Draw a rectangle of the right size.
  });
};

TimeStream.prototype.addNewParticles = function AddNewParticles() {
  if (this.particles.length > maxParticles) {
    return;
  }

  _.each(this.emitters, function (emitter) {
    times(emissionRate, function Emit() {
      this.particles.push(emitter.emitParticle());
    }, this);
  }, this);
};

TimeStream.prototype.plotParticles = function PlotParticles() {
  var currentParticles = []; // Eventually replaces this.particles to clear out old particles. 
  var xBound = this.canvas.width;
  var yBound = this.canvas.height;

  _.each(this.particles, function (particle) {
    var pos = particle.position;

    if (pos.x < 0 || pos.x > xBound || pos.y < 0 || pos.y > yBound) {
      return; // Don't add this particle and move on.
    }

    // Moves the particle to its new location.
    particle.move();

    // We still care about this particle, so add it to the currentParticles array.
    currentParticles.push(particle);
  });

  this.particle = currentParticles; // Reset particles.
};

