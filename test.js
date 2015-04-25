(function() {
  log.info('test', 'should not see this');
  log.tags.enable('test');
  log.info('test', 'should see this');
  log.tags.disable('test');
  log.info('test', 'should not see this');

  log.tags.enable('test');

  log.info('test', random.ratio());
  log.info('test', random.number());
  log.info('test', random.range(10));

  log.info('test', '--------------------');

  log.info('test', uuid.rfc4122());
  log.info('test', uuid.letters());

  log.info('test', '--------------------');

  try {
    throw "something wrong here";
  } catch (e) {
    exception.handle(e);
  }

  property.enqueue(property.global, function() {
    throw "something wrong here";
  });

  property.enqueue(property.global, function() {
    var x = null;
    x.oh_no = why_do_this;
  });

  log.info('test', '--------------------');

  var div = document.createElement('div');

  property.hook(div, function(element, property, value) {
    log.info('test', 'hook1 -> ' + element + ', ' + property + ', ' + value);
    return 1;
  });

  property.hook(div, function(element, property, value) {
    log.info('test', 'hook2 -> ' + element + ', ' + property + ', ' + value);
    return property == 'right';
  });

  property.set(div, 'left', unit.px(0));
  property.set(div, 'right', '0px');

  log.info('test', property.get(div, 'left'));
  log.info('test', property.get(div, 'right'));

  log.info('test', '--------------------');

  property.enqueue(property.global, function() {
    log.info('test', 'global');
  });

  log.info('test', '--------------------');

  document.addEventListener('DOMContentLoaded', function() {
    function rect(x, y, w, h, d) {
      var div = document.createElement('div');
      property.set(div, 'position', 'absolute');
      property.set(div, 'width', unit.px(w));
      property.set(div, 'height', unit.px(h));

      var c = color.random_rgb();
      property.set(div, 'background-color', c);

      function animate() {
        property.remove(div, 'transition');

        var start = transform.translate(unit.px(x), unit.px(y)).rotate(0);
        property.set(div, 'transform', start);

        var binding = transition.bind('transform', 5, 'linear')
          .bind('background-color', 5, 'linear');

        property.bind(div, 'transition', binding, 0, true);

        var end = transform.translate(unit.px(x), unit.px(y)).rotate((d ? 1 : -1) * Math.PI * 2 * 2);
        property.bind(div, 'transform', end);

        c = color.random_rgb();
        property.bind(div, 'background-color', c);
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
      var k = new keyframes();

      var x = 1000;
      var y = 250;

      k.at(0, 'transform', transform.translate(unit.px(x), unit.px(y - 100)));
      k.at(0.25, 'transform', transform.translate(unit.px(x + 100), unit.px(y)));
      k.at(0.5, 'transform', transform.translate(unit.px(x), unit.px(y + 100)));
      k.at(0.75, 'transform', transform.translate(unit.px(x - 100), unit.px(y)));
      k.at(1, 'transform', transform.translate(unit.px(x), unit.px(y - 100)));

      k.at(0, 'background-color', color.random_rgb());
      k.at(1, 'background-color', color.random_rgb());

      var style = document.createElement('style');
      style.language = 'text/css';
      style.appendChild(document.createTextNode(k.make()));
      document.getElementsByTagName('head')[0].appendChild(style);

      var div = document.createElement('div');
      property.set(div, 'position', 'absolute');
      property.set(div, 'width', unit.px(100));
      property.set(div, 'height', unit.px(100));
      property.set(div, 'background-color', color.random_rgb());
      property.set(div, 'animation-name', k.name);
      property.set(div, 'animation-duration', '1s');
      property.set(div, 'animation-delay', delay + 's');
      property.set(div, 'animation-fill-mode', 'both');
      property.set(div, 'animation-iteration-count', 'infinite');
      
      document.body.appendChild(div);
    }

    for (var i = 0; i < 4; ++i) {
      rect(i / 4);
    }
  }, false);

  log.info('test', '--------------------');

  var div = document.createElement('div');
  property.bind(div, 'left', '0px');

  log.info('test', property.get(div, 'left'));

  property.enqueue(div, function() {
    log.info('test', property.get(div, 'left'));
  }, 0, true);

  property.bind(div, 'left', '1px');

  property.enqueue(div, function() {
    log.info('test', property.get(div, 'left'));
  });

  property.enqueue(div, function() {
    log.info('test', '1002');
  }, 1002);

  property.enqueue(div, function() {
    log.info('test', '0');
  }, 0);

  property.enqueue(div, function() {
    log.info('test', '1000');
  }, 1000);

  property.enqueue(div, function() {
    log.info('test', '1001');
  }, 1001);

  property.enqueue(div, function() {
    log.info('test', '1003');
  }, 1003);

  property.bind(div, 'left', '2px');
})();
