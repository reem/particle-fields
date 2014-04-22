var Particle = function ParticleConstructor (position, velocity, acceleration) {
  this.position     = position     || new Vector(0, 0);
  this.velocity     = velocity     || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);
};

Particle.prototype.move = function ParticleMove (timeRate) {
  if (timeRate === undefined) {
    this.velocity.add(this.acceleration); // Save creating a new vector for default.
  } else {
    this.velocity.add(this.acceleration.immutableScale(timeRate));
  }
  this.position.add(this.velocity);
};