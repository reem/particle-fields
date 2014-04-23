$(document).ready(function () {
  var canvas = document.getElementById("main");
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var timeStream = new TimeStream(canvas, ctx);
  timeStream.addEmitter(
    new Emitter(new Vector(100, 230), Vector.fromAngle(10, 0)));
  timeStream.addEmitter(
    new Emitter(new Vector(100, 430), Vector.fromAngle(10, 0)));
  timeStream.addEmitter(
    new Emitter(new Vector(100, 630), Vector.fromAngle(10, 0)));
  timeStream.addEmitter(
    new Emitter(new Vector(100, 830), Vector.fromAngle(10, 0)));
  timeStream.run();
});