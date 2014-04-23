var times = function Times(n, callback, context, args) {
  for (var i = 0; i < n; i++) {
    callback.apply(context, args);
  }
};

var objectSize = 4;

var drawCircle = function (ctx, object) {
  ctx.fillStyle = object.drawColor;
  ctx.beginPath();
  ctx.arc(object.position.x, object.position.y, objectSize, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
};