var Particle = function ParticleConstructor (position, velocity, acceleration) {
  this.position     = position     || new Vector(0, 0);
  this.velocity     = velocity     || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);
  this.color = "#fff";
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
    if (this.field && this.field === field) {
      return;
    }
    var vector = new Vector(field.position.x - this.position.x,
                            field.position.y - this.position.y);

    var force = field.getForce(vector, this);

    vector.scale(force);
    totalAcceleration.add(vector);
  }, this);

  this.acceleration = totalAcceleration.clone();
};

var FieldParticle = function (position, velocity, acceleration, fields) {
  Particle.call(this, position, velocity, acceleration);
  this.fields = fields;
};

FieldParticle.prototype = Object.create(Particle.prototype);
FieldParticle.prototype.constructor = FieldParticle;

FieldParticle.prototype.move = function (timeRate) {
  Particle.prototype.move.call(this, timeRate);
  _.each(this.fields, function (field) {
    field.position = this.position.clone();
  }, this);
};