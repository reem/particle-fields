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

Particle.prototype.submitToFields = function (fields) {
  // Acceleration in this frame.
  var totalAcceleration = new Vector(0, 0);

  _.each(fields, function (field) {
    var vector = new Vector(field.position.x - this.position.x,
                            field.position.y - this.position.y);

    var force = field.mass / Math.pow(vector.x*vector.x + vector.y*vector.y, 1.5);

    totalAcceleration.add(vector.immutableScale(force));
  }, this);

  this.acceleration = totalAcceleration.clone();
};