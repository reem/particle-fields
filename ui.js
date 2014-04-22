$(document).ready(function () {
  var canvas = document.getElementById("main");
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var timeStream = new TimeStream(canvas, ctx);
  timeStream.addEmitter(
    new Emitter(new Vector(100, 230), Vector.fromAngle(0, 2)));
  timeStream.run();
});