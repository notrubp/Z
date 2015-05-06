(function(global) {
  /*
  */
  var platform = global.platform;
  var exception = global.exception;
  var time = global.time;
  var scheduler = global.scheduler;
  var log = global.log;

  /*
  */
  var property = {};

  /*
  */
  function ensure_uid(element) {
    if (!element.__property_uid) {
      element.__property_uid = uuid.letters();
    }
  }

  /*
   * A fake element for global hooks and queues.
  */
  property.global = {
    '__property_uid' : uuid.letters()
  };

  /*
  */
  var hooks = {};

  /*
  */
  function add_hook(uid, hook) {
    if (!hooks[uid]) {
      hooks[uid] = [];
    }

    hooks[uid].push(hook);

    return hook
  }

  /*
  */
  property.hook = function(element, hook) {
    ensure_uid(element);
    return add_hook(element.__property_uid, hook);
  }

  /*
  */
  function try_hooks(element, property, value) {
    var uid = element.__property_uid;

    if (hooks[uid]) {
      return hooks[uid].reduce(_try_hooks.bind(null, element, property, value), false);
    }

    return false;
  }

  /*
  */
  function _try_hooks(element, property, value, handled, hook) {
    return hook(element, property, value) === true || handled;
  }

  /*
  */
  var state = 'sleeping';

  /*
  */
  var has_next = false;

  /*
  */
  var last = 0;

  /*
  */
  function flush(timestamp) {
    log.info('property', 'flushing');

    state = 'flushing';

    last = time.now();

    has_next = false;

    // Go through all the queues and evaluate the entries.
    Object.keys(queues).forEach(_flush);
      
    if (has_next) {
      schedule();
    } else {
      log.info('property', 'sleeping');

      state = 'sleeping';
      scheduler.raf(gc);
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

      if (binding.wait_for_next_frame) {
        log.info('property', 'blocking -> ' + key);

        // Mark as no longer blocking.
        binding.wait_for_next_frame = false;
        
        // This entry needs a fresh frame before it can be applied.
        break;
      }

      // apply_binding() is a try catch block taken out of this function so compilers
      // can optimize properly, apply_binding() is expected to not be optimized.
      var result = apply_binding(binding);

      var should_break = false;

      switch (result) {
        case 'ok' : {
          log.info('property', 'applied -> ' + key);

          // Entry is ready to be removed.
          safe_remove_binding(queue, binding);

          // Entry has been applied break out if it's set to.
          if (binding.break_current_frame) {
            should_break = true;
          }

          break;
        }
        case 'fail' : {
          log.error('property', 'fail -> ' + key);

          // Entry may have not completed correctly, but an exception was thrown
          // and it needs to be removed.
          safe_remove_binding(queue, binding);
        }
        default : {
          // This entry did not apply, wait for the
          // next frame.
          should_break = true;

          break;
        }          
      }

      if (should_break) {
        break;
      }
    }

    has_next = has_next || queue.length > 0;
  }

  /*
  */
  function apply_binding(binding) {
    var result = 'none';

    try {
      result = last < binding.time || binding.callback() === false ? 'none' : 'ok';
    } catch (e) {
      // Dont block flush() with exception handling, instead schedule the handler for later.
      exception.deferred(e);

      result = 'fail';
    }

    return result;
  }

  /*
  */
  function safe_remove_binding(queue, binding) {
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
        log.info('property', 'awake');
        last = time.now();
      }
      case 'flushing' : {
        state = 'awake';
        scheduler.raf(flush);
        break;        
      }
    }
  }

  /*
  */
  var queues = { };

  /*
  */
  function ensure_queue(element) {
    var uid = element.__property_uid;
      
    if (!queues[uid]) {
      queues[uid] = [];
    }

    return queues[uid];
  }

  /*
  */
  function insert_binding(queue, callback, time, wait_for_next_frame) {
    time = time || 0;

    var binding = { 
      'callback' : callback,
      'time' : time, 
      'break_current_frame' : time > 0,
      'wait_for_next_frame' : wait_for_next_frame 
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
  function camel_case_property(prop) {
    function replacer(match, p1) {
      return p1.toUpperCase();
    }

    return prop.replace(/-(\w)/g, replacer);
  }

  /*
  */
  var force_camel_case_property = false;

  /*
  */
  if (platform.is_gecko) {
    force_camel_case_property = true;

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
  if (platform.is_trident) {
    fixups['transform'] = '-ms-transform';
    fixups['transform-origin'] = '-ms-transform-origin';
    fixups['transition'] = '-ms-transition';
  }

  /*
  */
  if (platform.is_opera) {
    fixups['transform'] = '-o-transform';
    fixups['transform-origin'] = '-o-transform-origin';
    fixups['transition'] = '-o-transition';
  }

  /*
  */
  if (platform.is_webkit) {
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
  property.fixup = function(prop) {
    prop = this.fixup_nocc(prop);
    prop = force_camel_case_property ? camel_case_property(prop) : prop;
    return prop;
  }
  
  /*
   * Fixup a CSS property with no forced camel casing.
   *
   * @param {string} a css property
   * @return {string} a css fixedup css property
  */
  property.fixup_nocc = function(prop) {
    return fixups[prop] || prop;
  }

  /*
   * Set a property immediately.
   *
   * @param element
   * @param property
   * @param value
   */
  property.set = function(element, prop, value) {
    ensure_uid(element);

    // Evaluate property fixups.
    prop = this.fixup(prop);

    // Evaluate property hook on objects.
    value = value != null && typeof value.__property_hook === 'function' ? value.__property_hook() : value;

    log.info('property', 'set(' + element.__property_uid + ', ' + prop + ', ' + value + ')');

    if (!try_hooks(this.global, prop, value) && !try_hooks(element, prop, value)) {
      element.style[prop] = value;
    }
  }

  /*
  */
  property.bind = function(element, property, value, time, wait_for_next_frame) {
    var callback = this.set.bind(this, element, property, value);
    this.enqueue(element, callback, time, wait_for_next_frame);
  }

  /*
  */
  property.get = function(element, property) {
    return element.style[property];
  }

  /*
   * Remove a property immediately.
   *
   * @param element
   * @param property
   */
  property.remove = function(element, property) {
    log.info('property', 'remove(' + element.__property_uid + ', ' + property + ')');

    this.set(element, property, null);
  }

  /*
   * Enqueue a property binding.
   *
   * @param element
   * @param binding 
  */
  property.enqueue = function(element, callback, time, wait_for_next_frame) {
    ensure_uid(element);
    schedule();
    queue = ensure_queue(element);
    insert_binding(queue, callback, time, wait_for_next_frame);
  }

  /*
  */
  property.wipe = function(element) {
    ensure_uid(element);
    queue = ensure_queue(element);
    queue.splice(0, queue.length);
  }

  /*
  */
  property.force_reflow = function(element) {
    element.offsetWidth = element.offsetWidth;
  }

  /*
  */
  global.property = property;
})(window);
