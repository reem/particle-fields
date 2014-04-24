var Field = function FieldConstructor(point, mass) {
  this.position = point;
  this.setMass(mass);
};

Field.prototype.setMass = function(mass) {
  this.mass = mass || 100;
  this.drawColor = mass < 0 ? "#f00" : "#0f0";
};

Field.prototype.getForce = function getForce(distance) {
  if (distance.magnitude() < this.range) {
    return this.mass / Math.pow(distance.x*distance.x + distance.y*distance.y, 1.5);
  } else {
    return 0;
  }
};

var SelectiveField = function SelectiveFieldConstructor(point, mass, selector, range) {
  Field.call(this, point, mass, range);
  this.selector = selector;
};

SelectiveField.noFieldParticles = function (point, mass, range) {
  return new SelectiveField(point, mass, function (particle) { 
    return !(onlyFieldParticles(particle)); 
  }, range);
};

SelectiveField.onlyFieldParticles = function (point, mass, range) {
  return new SelectiveField(point, mass, onlyFieldParticles, range);
};

SelectiveField.prototype = Object.create(Field.prototype);
SelectiveField.prototype.consructor = SelectiveField;

SelectiveField.prototype.getForce = function(distance, particle) {
  if (this.selector(particle)) {
    return Field.prototype.getForce.call(this, distance);
  } else {
    return 0;
  }
};

var onlyFieldParticles = function (particle) {
  return (particle instanceof FieldParticle);
};