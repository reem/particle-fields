$(document).ready(function () {
  var canvas = document.getElementById("main");
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var timeStream = new TimeStream(canvas, ctx);
  timeStream.addEmitter(
    new Emitter(new Vector(100, 230), Vector.fromAngle(2, 0)));
  timeStream.addEmitter(
    new Emitter(new Vector(100, 430), Vector.fromAngle(5, 0)));
  timeStream.addEmitter(
    new Emitter(new Vector(100, 630), Vector.fromAngle(5, 0)));
  timeStream.addEmitter(
    new Emitter(new Vector(900, 630), Vector.fromAngle(2, -Math.PI)));

  timeStream.addField(
    new Field(new Vector(600, 430), -400));

  timeStream.addField(
    new Field(new Vector(600, 630), 200));

  timeStream.addField(
    new Field(new Vector(600, 230), 800));


  timeStream.run();
});