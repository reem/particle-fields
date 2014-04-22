var times = function Times(n, callback, context, args) {
  for (var i = 0; i < n; i++) {
    callback.apply(context, args);
  }
};