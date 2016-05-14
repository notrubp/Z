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
    .setOrdered(true)
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

  var rect = Dom.createRect();

  Property.hook(rect, function(element, property, value) {
    Log.info('test', 'hook1 -> ' + element + ', ' + property + ', ' + value);
    return 1;
  });

  Property.hook(rect, function(element, property, value) {
    Log.info('test', 'hook2 -> ' + element + ', ' + property + ', ' + value);
    return property == 'right';
  });

  Property.set(rect, 'left', Unit.Zero);
  Property.set(rect, 'right', '0px');

  Log.info('test', Property.get(rect, 'left'));
  Log.info('test', Property.get(rect, 'right'));

  Log.info('test', '--------------------');

  Property.enqueue(Property.global, function() {
    Log.info('test', 'global');
  });

  Log.info('test', '--------------------');

  Dom.listen(document, 'DOMContentLoaded', function() {
    function makeRect(x, y, w, h, d) {
      var rect = Dom.createRect(Rect.makeXywh(x, y, w, h),
        Transform.Origin,
        Color.randomRgb());

      function animate() {
        Property.remove(rect, 'transition');

        var start = Transform.translate(Unit.px(x), Unit.px(y)).rotate(0);
        Property.set(rect, 'transform', start);

        var transition = Transition.set('transform', 5, 'linear')
          .set('background-color', 5, 'linear');

        Property.set(rect, 'transition', transition, 0, true);

        var end = Transform.translate(Unit.px(x), Unit.px(y)).rotate((d ? 1 : -1) * Math.PI * 2 * 2);
        Property.set(rect, 'transform', end, 0);

        Property.set(rect, 'background-color', Color.randomRgb(), 0);
      }

      Dom.listen(rect, 'transitionend', animate);

      animate();

      Dom.append(document.body, rect);
    }

    var d = true;
    var n = 500;

    for (var i = 1; i <= 10; i += 0.5) {
      var x = n / i / 2;
      var y = n / i / 2;
      var w = n / i;
      var h = n / i;
      makeRect(x, x, w, h, d = !d);
    }
  });

  Dom.listen(document, 'DOMContentLoaded', function() {
    function makeRect(delay) {
      var x = 1000;
      var y = 250;

      var name = Keyframes.at(0, 'transform', Transform.translate(Unit.px(x), Unit.px(y - 100)))
        .at(0.25, 'transform', Transform.translate(Unit.px(x + 100), Unit.px(y)))
        .at(0.5, 'transform', Transform.translate(Unit.px(x), Unit.px(y + 100)))
        .at(0.75, 'transform', Transform.translate(Unit.px(x - 100), Unit.px(y)))
        .at(1, 'transform', Transform.translate(Unit.px(x), Unit.px(y - 100)))
        .at(0, 'background-color', Color.randomRgb())
        .at(1, 'background-color', Color.randomRgb())
        .inject()
        .getName();

      var rect = Dom.createRect(Rect.makeXywh(0, 0, 100, 100),
        Transform.Origin,
        Color.randomRgb());

      Property.set(rect, 'animation-name', name);
      Property.set(rect, 'animation-duration', '10s');
      Property.set(rect, 'animation-delay', delay + 's');
      Property.set(rect, 'animation-fill-mode', 'both');
      Property.set(rect, 'animation-iteration-count', 'infinite');

      Dom.append(document.body, rect);
    }

    for (var i = 0; i < 4; ++i) {
      makeRect(i / 4 * 10);
    }
  });

  Log.info('test', '--------------------');

  var rect = Dom.createRect();
  Property.set(rect, 'left', '0px');

  Log.info('test', Property.get(rect, 'left'));

  Property.enqueue(rect, function() {
    Log.info('test', Property.get(rect, 'left'));
  }, 0, true);

  Property.set(rect, 'left', '1px', 0);

  Property.enqueue(rect, function() {
    Log.info('test', Property.get(rect, 'left'));
  });

  Property.enqueue(rect, function() {
    Log.info('test', '1002');
  }, 1002);

  Property.enqueue(rect, function() {
    Log.info('test', '0');
  }, 0);

  Property.enqueue(rect, function() {
    Log.info('test', '1000');
  }, 1000);

  Property.enqueue(rect, function() {
    Log.info('test', '1001');
  }, 1001);

  Property.enqueue(rect, function() {
    Log.info('test', '1003');
  }, 1003);

  Property.set(rect, 'left', '2px', 0);

  Log.info('test', '--------------------');

  var anim = new AnimatedDomSprite();
  anim.setEnsureSrc(true);
  anim.setPlayback(AnimatedSprite.Playback.Loop);

  anim.defs.add({
    name: 'ship',
    playback: 'loop',
    fps: 24,
    src: {
      url: 'ship.png',
      width: 119,
      height: 2142,
    },
    frames: [
      {width: 119, height: 119, x: 0, y: 0},
      {width: 119, height: 119, x: 0, y: 119},
      {width: 119, height: 119, x: 0, y: 238},
      {width: 119, height: 119, x: 0, y: 357},
      {width: 119, height: 119, x: 0, y: 476},
      {width: 119, height: 119, x: 0, y: 595},
      {width: 119, height: 119, x: 0, y: 714},
      {width: 119, height: 119, x: 0, y: 833},
      {width: 119, height: 119, x: 0, y: 952},
      {width: 119, height: 119, x: 0, y: 1071},
      {width: 119, height: 119, x: 0, y: 1190},
      {width: 119, height: 119, x: 0, y: 1309},
      {width: 119, height: 119, x: 0, y: 1428},
      {width: 119, height: 119, x: 0, y: 1547},
      {width: 119, height: 119, x: 0, y: 1666},
      {width: 119, height: 119, x: 0, y: 1785},
      {width: 119, height: 119, x: 0, y: 1904},
      {width: 119, height: 119, x: 0, y: 2023},
      {width: 119, height: 119, x: 0, y: 0},
      {width: 119, height: 119, x: 0, y: 0},
      {width: 119, height: 119, x: 0, y: 0},
      {width: 119, height: 119, x: 0, y: 0},
      {width: 119, height: 119, x: 0, y: 0},
      {width: 119, height: 119, x: 0, y: 0},
      {width: 119, height: 119, x: 0, y: 0},
      {width: 119, height: 119, x: 0, y: 0},
      {width: 119, height: 119, x: 0, y: 0},
      {width: 119, height: 119, x: 0, y: 0}
    ]
  });

  anim.defs.select('ship');

  Dom.listen(document, 'DOMContentLoaded', function() {
    Dom.append(document.body, anim.sprite.mask);
    anim.play();
  });

  var sheet = new SpriteSheet('sprites.png', {
    alert_red: {x: 0, y: 197, width: 129, height: 20},
    alert_yellow: {x: 0, y: 174, width: 130, height: 23},
    btn_backtolobby_no: {x: 0, y: 139, width: 204, height: 35},
    btn_backtolobby_yes: {x: 0, y: 104, width: 204, height: 35},
    btn_cancel: {x: 0, y: 0, width: 543, height: 49},
    btn_ok: {x: 0, y: 49, width: 381, height: 55}
  });

  var sprite = sheet.get('btn_ok');

  Dom.listen(document, 'DOMContentLoaded', function() {
    var img = Dom.createImage();

    Dom.append(document.body, img);
  });
})();
