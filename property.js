(function(global) {
  /*
  */
  var Platform = global.Platform;
  var Exception = global.Exception;
  var Time = global.Time;
  var Scheduler = global.Scheduler;
  var Log = global.Log;
  var Uuid = global.Uuid;

  /*
  */
  var Property = {};

  /*
  */
  function ensureUid(element) {
    if (!element.__propertyUid) {
      element.__propertyUid = Uuid.letters();
    }
  }

  /*
   * A fake element for global hooks and queues.
  */
  Property.global = {
    '__propertyUid' : Uuid.letters()
  };

  /*
  */
  var hooks = {};

  /*
  */
  function addHook(uid, hook) {
    if (!hooks[uid]) {
      hooks[uid] = [];
    }

    hooks[uid].push(hook);

    return hook
  }

  /*
  */
  Property.hook = function(element, hook) {
    ensureUid(element);
    return addHook(element.__propertyUid, hook);
  }

  /*
  */
  function tryHooks(element, property, value) {
    var uid = element.__propertyUid;

    if (hooks[uid]) {
      return hooks[uid].reduce(TryHooks.bind(null, element, property, value), false);
    }

    return false;
  }

  /*
  */
  function TryHooks(element, property, value, handled, hook) {
    return hook(element, property, value) === true || handled;
  }

  /*
  */
  var state = 'sleeping';

  /*
  */
  var hasNext = false;

  /*
  */
  var last = 0;

  /*
  */
  function flush(timestamp) {
    Log.info('property', 'flushing');

    state = 'flushing';

    last = Time.now();

    hasNext = false;

    // Go through all the queues and evaluate the entries.
    Object.keys(queues).forEach(_flush);
      
    if (hasNext) {
      schedule();
    } else {
      Log.info('property', 'sleeping');

      state = 'sleeping';
      Scheduler.raf(gc);
    }
  }

  /*
  */
  function _flush(key) {
    var queue = queues[key];

    // Flush until there are none left or the current
    // entry is blocking the queue.
    while (queue.length > 0) {
      var binding = queue[0];

      if (binding.waitForNextFrame) {
        Log.info('property', 'blocking -> ' + key);

        // Mark as no longer blocking.
        binding.waitForNextFrame = false;
        
        // This entry needs a fresh frame before it can be applied.
        break;
      }

      // applyBinding() is a try catch block taken out of this function so compilers
      // can optimize properly, applyBinding() is expected to not be optimized.
      var result = applyBinding(binding);

      var shouldBreak = false;

      switch (result) {
        case 'ok' : {
          Log.info('property', 'applied -> ' + key);

          // Entry is ready to be removed.
          safeRemoveBinding(queue, binding);

          // Entry has been applied break out if it's set to.
          if (binding.breakCurrentFrame) {
            shouldBreak = true;
          }

          break;
        }
        case 'fail' : {
          Log.error('property', 'fail -> ' + key);

          // Entry may have not completed correctly, but an exception was thrown
          // and it needs to be removed.
          safeRemoveBinding(queue, binding);
        }
        default : {
          // This entry did not apply, wait for the
          // next frame.
          shouldBreak = true;

          break;
        }          
      }

      if (shouldBreak) {
        break;
      }
    }

    hasNext = hasNext || queue.length > 0;
  }

  /*
  */
  function applyBinding(binding) {
    var result = 'none';

    try {
      result = last < binding.time || binding.callback() === false ? 'none' : 'ok';
    } catch (e) {
      // Dont block flush() with exception handling, instead schedule the handler for later.
      Exception.deferred(e);

      result = 'fail';
    }

    return result;
  }

  /*
  */
  function safeRemoveBinding(queue, binding) {
    if (queue.length > 0 && queue[0] === binding) {
      queue.shift();
    }
  }

  /*
  */
  function gc(timestamp) {
  }

  /*
  */
  function schedule() {
    switch (state) {
      case 'awake' : {
        break;
      }
      case 'sleeping' : {
        Log.info('property', 'awake');
        last = Time.now();
      }
      case 'flushing' : {
        state = 'awake';
        Scheduler.raf(flush);
        break;        
      }
    }
  }

  /*
  */
  var queues = { };

  /*
  */
  function ensureQueue(element) {
    var uid = element.__propertyUid;
      
    if (!queues[uid]) {
      queues[uid] = [];
    }

    return queues[uid];
  }

  /*
  */
  function insertBinding(queue, callback, time, waitForNextFrame) {
    time = time || 0;

    var binding = { 
      'callback' : callback,
      'time' : time, 
      'breakCurrentFrame' : time > 0,
      'waitForNextFrame' : waitForNextFrame 
    };

    var i = -1;

    if (time > 0) {
      // Insert into time range.
      for (var j = 0; j < queue.length; ++j) {
        if (time < queue[j].time) {
          i = j;
          break;
        }
      }
    } else {
      // Insert after the last element with time of 0.
      for (var j = 0; j < queue.length; ++j) {
        if (queue[j].time > 0) {
          i = j;
          break;
        }
      }
    }

    if (i != -1) {
      queue.splice(i, 0, binding);
    } else {
      queue.push(binding);
    }
  }

  /*
  */
  var fixups = { };

  /*
  */
  function camelCaseProperty(prop) {
    function replacer(match, p1) {
      return p1.toUpperCase();
    }

    return prop.replace(/-(\w)/g, replacer);
  }

  /*
  */
  var forceCamelCaseProperty = false;

  /*
  */
  if (Platform.isGecko) {
    forceCamelCaseProperty = true;

    fixups['animation'] = '-moz-animation';
    fixups['animation-delay'] = '-moz-animation-delay';
    fixups['animation-name'] = '-moz-animation-name';
    fixups['animation-duration'] = '-moz-animation-duration';
    fixups['animation-timing-function'] = '-moz-animation-timing-function';
    fixups['animation-iteration-count'] = '-moz-animation-iteration-count';
    fixups['animation-direction'] = '-moz-animation-direction';
    fixups['animation-fill-mode'] = '-moz-animation-fill-mode';
    fixups['animation-play-state'] = '-moz-animation-play-state';
    fixups['box-sizing'] = '-moz-box-sizing';
    fixups['transform'] = '-moz-transform';
    fixups['transform-origin'] = '-moz-transform-origin';
    fixups['transition'] = '-moz-transition';
  }

  /*
  */
  if (Platform.isTrident) {
    fixups['transform'] = '-ms-transform';
    fixups['transform-origin'] = '-ms-transform-origin';
    fixups['transition'] = '-ms-transition';
  }

  /*
  */
  if (Platform.isOpera) {
    fixups['transform'] = '-o-transform';
    fixups['transform-origin'] = '-o-transform-origin';
    fixups['transition'] = '-o-transition';
  }

  /*
  */
  if (Platform.isWebkit) {
    fixups['animation'] = '-webkit-animation';
    fixups['animation-delay'] = '-webkit-animation-delay';
    fixups['animation-name'] = '-webkit-animation-name';
    fixups['animation-duration'] = '-webkit-animation-duration';
    fixups['animation-timing-function'] = '-webkit-animation-timing-function';
    fixups['animation-iteration-count'] = '-webkit-animation-iteration-count';
    fixups['animation-direction'] = '-webkit-animation-direction';
    fixups['animation-fill-mode'] = '-webkit-animation-fill-mode';
    fixups['animation-play-state'] = '-webkit-animation-play-state';
    fixups['transform'] = '-webkit-transform';
    fixups['transform-origin'] = '-webkit-transform-origin';
    fixups['transition'] = '-webkit-transition';
  }

  /*
   * Fixup a CSS property.
   *
   * @param {string} a css property
   * @return {string} a css fixedup css property
  */
  Property.fixup = function(prop) {
    prop = this.fixupNocc(prop);
    prop = forceCamelCaseProperty ? camelCaseProperty(prop) : prop;
    return prop;
  }
  
  /*
   * Fixup a CSS property with no forced camel casing.
   *
   * @param {string} a css property
   * @return {string} a css fixedup css property
  */
  Property.fixupNocc = function(prop) {
    return fixups[prop] || prop;
  }

  /*
   * Set a property immediately.
   *
   * @param element
   * @param property
   * @param value
   */
  Property.set = function(element, prop, value) {
    ensureUid(element);

    // Evaluate property fixups.
    prop = this.fixup(prop);

    // Evaluate property hook on objects.
    value = value != null && typeof value.__propertyHook === 'function' ? value.__propertyHook() : value;

    Log.info('property', 'set(' + element.__propertyUid + ', ' + prop + ', ' + value + ')');

    if (!tryHooks(this.global, prop, value) && !tryHooks(element, prop, value)) {
      element.style[prop] = value;
    }
  }

  /*
  */
  Property.bind = function(element, property, value, time, waitForNextFrame) {
    var callback = this.set.bind(this, element, property, value);
    this.enqueue(element, callback, time, waitForNextFrame);
  }

  /*
  */
  Property.get = function(element, property) {
    return element.style[property];
  }

  /*
   * Remove a property immediately.
   *
   * @param element
   * @param property
   */
  Property.remove = function(element, property) {
    Log.info('property', 'remove(' + element.__propertyUid + ', ' + property + ')');

    this.set(element, property, null);
  }

  /*
   * Enqueue a property binding.
   *
   * @param element
   * @param binding 
  */
  Property.enqueue = function(element, callback, time, waitForNextFrame) {
    ensureUid(element);
    schedule();
    queue = ensureQueue(element);
    insertBinding(queue, callback, time, waitForNextFrame);
  }

  /*
  */
  Property.wipe = function(element) {
    ensureUid(element);
    queue = ensureQueue(element);
    queue.splice(0, queue.length);
  }

  /*
  */
  Property.forceReflow = function(element) {
    element.offsetWidth = element.offsetWidth;
  }

  /*
  */
  global.Property = Property;
})(window);
