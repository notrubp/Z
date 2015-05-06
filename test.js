(function() {
  Log.info('test', 'should not see this');
  Log.Tags.enable('test');
  Log.info('test', 'should see this');
  Log.Tags.disable('test');
  Log.info('test', 'should not see this');

  Log.Tags.enable('exception');
  Log.Tags.enable('test');

  Log.info('test', Random.ratio());
  Log.info('test', Random.number());
  Log.info('test', Random.range(10));

  Log.info('test', '--------------------');

  Log.info('test', Uuid.rfc4122());
  Log.info('test', Uuid.letters());

  Log.info('test', '--------------------');

  Chain.success(function() {
    Log.info('test', 'Chain.success()');
  }).commit()

  Chain.success(function() {
    Log.info('test', 'should not see this');
  })

  Chain.append(function(success, failure) {
  })
  .success(function() {
    Log.info('test', 'should not see this');
  })
  .commit()

  Chain.append(function(success, failure) {
    setTimeout(function() {
      Log.info('test', 'Chain[0][0]');
      success()
    }, 1000);
  })
  .success(function() {
    Log.info('test', 'Chain[0].success()');
  })
  .append(function(success, failure) {
    Log.info('test', 'Chain[0][1]');

    try {
      throw "Error?"
    } catch (e) {
      failure(e)
    }
  })
  .failure(function(failureReasons) {
    Log.info('test', 'Chain[0].failure()');

    failureReasons.forEach(function(reason) {
      Exception.handle(reason);
    });
  })
  .commit()

  Chain.append(function(success, failure) {
    setTimeout(function() {
      success()
    }, 2000);
  })
  .success(function() {
    Log.info('test', 'Chain[1].success()');
  })
  .commit()

  Chain.append(function(success, failure) {
    success()
  })
  .append(function(success, failure) {
    success()
  })
  .append(function(success, failure) {
    success()
  })
  .append(function(success, failure) {
    success()
  })
  .append(function(success, failure) {
    success()
  })
  .append(function(success, failure) {
    success()
  })
  .success(function() {
    Log.info('test', 'Chain[2].success()');
  })
  .commit()
  .ordered(true)
  .failure(function() {
    Log.info('test', 'Ordered.failure()');
  })
  .append(function(success, failure) {
    Log.info('test', 'Ordered[0]');

    setTimeout(function() {
      Log.info('test', 'Ordered[0].success()');
      success()
    }, 1000);
  })
  .append(function(success, failure) {
    Log.info('test', 'Ordered[1]');

    Scheduler.deferred(function() {
      try {
        throw "Error?"
      } catch (e) {
        Log.info('test', 'Ordered[1].failure()');
        failure(e)
      }
    });
  })
  .success(function() {
    Log.info('test', 'Ordered.success()');
  })
  .commit()

  Log.info('test', '--------------------');

  try {
    throw "something wrong here";
  } catch (e) {
    Exception.handle(e);
  }

  Property.enqueue(Property.global, function() {
    throw "something wrong here";
  });

  Property.enqueue(Property.global, function() {
    var x = null;
    x.ohNo = whyDoThis;
  });

  Log.info('test', '--------------------');

  var div = document.createElement('div');

  Property.hook(div, function(element, property, value) {
    Log.info('test', 'hook1 -> ' + element + ', ' + property + ', ' + value);
    return 1;
  });

  Property.hook(div, function(element, property, value) {
    Log.info('test', 'hook2 -> ' + element + ', ' + property + ', ' + value);
    return property == 'right';
  });

  Property.set(div, 'left', Unit.px(0));
  Property.set(div, 'right', '0px');

  Log.info('test', Property.get(div, 'left'));
  Log.info('test', Property.get(div, 'right'));

  Log.info('test', '--------------------');

  Property.enqueue(Property.global, function() {
    Log.info('test', 'global');
  });

  Log.info('test', '--------------------');

  document.addEventListener('DOMContentLoaded', function() {
    function rect(x, y, w, h, d) {
      var div = document.createElement('div');
      Property.set(div, 'position', 'absolute');
      Property.set(div, 'width', Unit.px(w));
      Property.set(div, 'height', Unit.px(h));

      var c = Color.randomRgb();
      Property.set(div, 'background-color', c);

      function animate() {
        Property.remove(div, 'transition');

        var start = Transform.translate(Unit.px(x), Unit.px(y)).rotate(0);
        Property.set(div, 'transform', start);

        var binding = Transition.bind('transform', 5, 'linear')
          .bind('background-color', 5, 'linear');

        Property.bind(div, 'transition', binding, 0, true);

        var end = Transform.translate(Unit.px(x), Unit.px(y)).rotate((d ? 1 : -1) * Math.PI * 2 * 2);
        Property.bind(div, 'transform', end);

        c = Color.randomRgb();
        Property.bind(div, 'background-color', c);
      }

      div.addEventListener('transitionend', animate);

      animate();

      document.body.appendChild(div);
    }

    var d = true;
    var n = 500;

    for (var i = 1; i <= 10; i += 0.5) {
      var x = n / i / 2;
      var y = n / i / 2;
      var w = n / i;
      var h = n / i;
      rect(x, x, w, h, d = !d);
    }
  }, false);

  document.addEventListener('DOMContentLoaded', function() {
    function rect(delay) {
      var k = new Keyframes();

      var x = 1000;
      var y = 250;

      k.at(0, 'transform', Transform.translate(Unit.px(x), Unit.px(y - 100)));
      k.at(0.25, 'transform', Transform.translate(Unit.px(x + 100), Unit.px(y)));
      k.at(0.5, 'transform', Transform.translate(Unit.px(x), Unit.px(y + 100)));
      k.at(0.75, 'transform', Transform.translate(Unit.px(x - 100), Unit.px(y)));
      k.at(1, 'transform', Transform.translate(Unit.px(x), Unit.px(y - 100)));

      k.at(0, 'background-color', Color.randomRgb());
      k.at(1, 'background-color', Color.randomRgb());

      var style = document.createElement('style');
      style.language = 'text/css';
      style.appendChild(document.createTextNode(k.make()));
      document.getElementsByTagName('head')[0].appendChild(style);

      var div = document.createElement('div');
      Property.set(div, 'position', 'absolute');
      Property.set(div, 'width', Unit.px(100));
      Property.set(div, 'height', Unit.px(100));
      Property.set(div, 'background-color', Color.randomRgb());
      Property.set(div, 'animation-name', k.name);
      Property.set(div, 'animation-duration', '1s');
      Property.set(div, 'animation-delay', delay + 's');
      Property.set(div, 'animation-fill-mode', 'both');
      Property.set(div, 'animation-iteration-count', 'infinite');
      
      document.body.appendChild(div);
    }

    for (var i = 0; i < 4; ++i) {
      rect(i / 4);
    }
  }, false);

  Log.info('test', '--------------------');

  var div = document.createElement('div');
  Property.bind(div, 'left', '0px');

  Log.info('test', Property.get(div, 'left'));

  Property.enqueue(div, function() {
    Log.info('test', Property.get(div, 'left'));
  }, 0, true);

  Property.bind(div, 'left', '1px');

  Property.enqueue(div, function() {
    Log.info('test', Property.get(div, 'left'));
  });

  Property.enqueue(div, function() {
    Log.info('test', '1002');
  }, 1002);

  Property.enqueue(div, function() {
    Log.info('test', '0');
  }, 0);

  Property.enqueue(div, function() {
    Log.info('test', '1000');
  }, 1000);

  Property.enqueue(div, function() {
    Log.info('test', '1001');
  }, 1001);

  Property.enqueue(div, function() {
    Log.info('test', '1003');
  }, 1003);

  Property.bind(div, 'left', '2px');
})();
