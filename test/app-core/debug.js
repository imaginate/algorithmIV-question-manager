  /**
   * -----------------------------------------------------
   * Public Variable (DEBUG)
   * -----------------------------------------------------
   * @desc Allows compiler to remove the debug code.
   * @define {boolean}
   */
  var DEBUG = true;

  /**
   * ----------------------------------------------- 
   * Private Variable (_debug)
   * -----------------------------------------------
   * @desc The Debug instance for the module's public methods.
   * @type {Debug}
   */
  var _debug = (DEBUG) ? new Debug() : null;

  /**
   * -----------------------------------------------------
   * Public Class (Debug)
   * -----------------------------------------------------
   * @desc Contains the debugging methods for this module.
   * @param {string=} classTitle - The name of the class.
   * @param {strings=} turnOffDebugs - The name of the debug
   *   categories to disable for the instance.
   * @constructor
   */
  var Debug = function(classTitle, turnOffDebugs) {

    /**
     * ---------------------------------------------------
     * Private Property (Debug._classTitle)
     * ---------------------------------------------------
     * @desc The class name for the instance.
     * @type {string}
     * @default ''
     * @private
     */
    this._classTitle = (!!classTitle) ? classTitle + '.' : '';

    /**
     * ---------------------------------------------------
     * Private Property (Debug._start)
     * ---------------------------------------------------
     * @desc Indicates whether to show this category's console logs.
     * @type {boolean}
     * @default true
     * @private
     */
    this._start = ( (!!turnOffDebugs &&
                     turnOffDebugs.indexOf('start') >= 0) ?
      false : true
    );

    /**
     * ---------------------------------------------------
     * Private Property (Debug._args)
     * ---------------------------------------------------
     * @desc Indicates whether to show this category's console logs.
     * @type {boolean}
     * @default true
     * @private
     */
    this._args = ( (!!turnOffDebugs &&
                     turnOffDebugs.indexOf('args') >= 0) ?
      false : true
    );

    /**
     * ---------------------------------------------------
     * Private Property (Debug._fail)
     * ---------------------------------------------------
     * @desc Indicates whether to show this category's console logs.
     * @type {boolean}
     * @default true
     * @private
     */
    this._fail = ( (!!turnOffDebugs &&
                     turnOffDebugs.indexOf('fail') >= 0) ?
      false : true
    );

    /**
     * ---------------------------------------------------
     * Private Property (Debug._group)
     * ---------------------------------------------------
     * @desc Indicates whether to show this category's console logs.
     * @type {boolean}
     * @default true
     * @private
     */
    this._group = ( (!!turnOffDebugs &&
                     turnOffDebugs.indexOf('group') >= 0) ?
      false : true
    );

    /**
     * ---------------------------------------------------
     * Private Property (Debug._state)
     * ---------------------------------------------------
     * @desc Indicates whether to show this category's console logs.
     * @type {boolean}
     * @default true
     * @private
     */
    this._state = ( (!!turnOffDebugs &&
                     turnOffDebugs.indexOf('state') >= 0) ?
      false : true
    );

    /**
     * ---------------------------------------------------
     * Private Property (Debug._misc)
     * ---------------------------------------------------
     * @desc Indicates whether to show this category's console logs.
     * @type {boolean}
     * @default true
     * @private
     */
    this._misc = ( (!!turnOffDebugs &&
                     turnOffDebugs.indexOf('misc') >= 0) ?
      false : true
    );
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.getSubstitute)
   * ---------------------------------------------------
   * @desc Gets the correct substitution string for the given value.
   * @param {*} val - The value to be evaluated.
   * @return {string} The correct substitution string.
   */
  Debug.getSubstitute = function(val) {

    /** @type {string} */
    var str;
    /**
     * @type {boolean}
     * @private
     */
    var css;

    switch (typeof val) {
      case 'object':
        str = '%O';
      break;
      case 'number':
        str = '%i';
      break;
      case 'string':
        css = /(^\<style\>)([\s\S])(\<\/style\>$)/.test(val);
        str = (css) ? '%c' : '%s';
      break;
      default:
        str = '%s';
      break;
    }

    return str;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.checkType)
   * ---------------------------------------------------
   * @param {*} val - The value to be evaluated.
   * @param {string} type - The type to evaluate the value against.
   *   The optional types are 'string', 'number', 'boolean', 'object',
   *   'undefined', and 'array'. Use '|' as the separator for multiple
   *   types (e.g. 'string|number'). Use '=' to indicate the value is
   *   optional (e.g. 'array=' or 'string|number='). Use '!' to
   *   indicate that null is not a possibility (e.g. '!string').
   * @return {boolean} The evaluation result.
   */
  Debug.checkType = function(val, type) {

    /**
     * @type {strings}
     * @private
     */
    var types;
    /**
     * @type {boolean}
     * @private
     */
    var pass;

    type = type.toLowerCase().replace(/[^a-zA-Z\|\=\!]/g, '');

    types = ( /\|/.test(type) ) ? type.split('|') : [ type ];

    pass = types.some(function(/** string */ type) {

      if (val === undefined) {
        if (/\=/.test(type) || type === 'undefined') {
          return true;
        }
      }
      else {

        if (val === null && /\!/.test(type) === false) {
          return true;
        }
        type = type.replace(/\!|\=/g, '');

        if (type === 'array' && Array.isArray(val)) {
          return true;
        }

        if (/(string)|(number)|(boolean)|(object)/.test(type) &&
            typeof val === type) {
          return true;
        }
      }

      return false;
    });

    return pass;
  };

  // Ensure constructor is set to this class.
  Debug.prototype.constructor = Debug;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.start)
   * -----------------------------------------------------
   * @desc Use to start every method.
   * @param {(string|vals)} methodName - The name of the method. An array with
   *   all the parameters can be supplied here.
   * @param {...*} val - Each argument passed to the method in order of appearance.
   * @example
   *   _debug.start('methodName', var, var, ...) {
   *   // or
   *   _debug.start(['methodName', var, var, ...]) {
   */
  Debug.prototype.start = function(methodName) {

    /**
     * @type {vals}
     * @private
     */
    var args;
    /**
     * @type {string}
     * @private
     */
    var message;

    if (!this._start) {
      return;
    }

    if ( Array.isArray(methodName) ) {
      args = methodName.slice(1);
      methodName = methodName[0];
    }
    else {
      args = Array.prototype.slice.call(arguments, 1);
    }

    message = 'START: ' + this._classTitle + methodName + '(';
    args.forEach(function(/** * */ val, /** number */ i) {
      message += ( (i) ? ', ' : '' ) + Debug.getSubstitute(val);
    });
    message += ')';

    args.unshift(message);

    console.log.apply(console, args);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.args)
   * -----------------------------------------------------
   * @desc Use to catch an improper method argument.
   * @param {(string|vals)} methodName - The name of the method. An
   *   array with all the parameters can be supplied here.
   * @param {...*} val - Each argument passed to the method.
   * @param {...string} type -  Each passed argument's data type. See
   *   [Debug.checkType()]{@link Debug#checkType} for the input options.
   * @example
   *   _debug.args('methodName', var, 'object', var, 'number', ...) {
   *   // or
   *   _debug.args(['methodName', var, 'object', var, 'number', ...]) {
   */
  Debug.prototype.args = function(methodName) {

    /**
     * @type {vals}
     * @private
     */
    var args;
    /**
     * @type {boolean}
     * @private
     */
    var pass;
    /**
     * @type {string}
     * @private
     */
    var message;

    if (!this._args) {
      return;
    }

    if ( Array.isArray(methodName) ) {
      args = methodName.slice(1);
      methodName = methodName[0];
    }
    else {
      args = Array.prototype.slice.call(arguments, 1);
    }

    pass = args.every(function(/** * */ val, /** number */ i) {
      if (i % 2) {
        return Debug.checkType(args[i - 1], val);
      }
      return true;
    });

    if (!pass) {
      message = 'ARGS: ' + this._classTitle + methodName + '() | ';
      message += 'Error: Incorrect argument operand.';
      console.log(message);
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.fail)
   * -----------------------------------------------------
   * @desc Use to catch failures within a method.
   * @param {string} methodName - The name of the method.
   * @param {boolean} pass - The tests (fails if false).
   * @param {string} errorMsg - The description of the error (the log).
   */
  Debug.prototype.fail = function(methodName, pass, errorMsg) {

    /**
     * @type {string}
     * @private
     */
    var message;

    if (!this._fail) {
      return;
    }

    if (!pass) {
      message = 'FAIL: ' + this._classTitle + methodName + '() | ';
      message += 'Error: ' + errorMsg;
      console.log(message);
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.group)
   * -----------------------------------------------------
   * @desc Use to group console messages.
   * @param {(string|vals)} methodName - The name of the method. An
   *   array with all the parameters can be supplied here.
   * @param {string=} openGroup - The type of console method to use. The
   *   options are: 'open'= console.group() | 'coll'= console.groupCollapsed()
   *   | 'end'= console.groupEnd()
   * @param {...string=} varName - The name of the passed variables to log.
   * @param {...*} val - The value of the passed variables to log.
   * @example
   *   _debug.group('methodName', true, 'varName', var, 'varName', var, ...) {
   *   // or
   *   _debug.group(['methodName', true, 'varName', var, 'varName', var, ...]) {
   */
  Debug.prototype.group = function(methodName, openGroup) {

    /**
     * @type {?vals}
     * @private
     */
    var args;
    /**
     * @type {string}
     * @private
     */
    var message;

    if (!this._group) {
      return;
    }

    if ( Array.isArray(methodName) ) {
      openGroup = (!!methodName[1]) ? methodName[1] : 'coll';
      args = (!!methodName[2]) ? methodName.slice(2) : null;
      methodName = methodName[0];
    }
    else {
      openGroup = openGroup || 'coll';
      args = ( (arguments.length > 2) ?
        Array.prototype.slice.call(arguments, 2) : null
      );
    }

    message = 'GROUP: ' + this._classTitle + methodName + '()';

    if (args) {

      message += ' | ';

      args = args.slice(0).filter(function(/** * */ val, /** number */ i) {

        if (i % 2) {
          message += ( (i > 1) ? ', ' : '' ) + Debug.getSubstitute(val);
          return true;
        }

        message += val + '= ';
        return false;
      });

      args.unshift(message);
    }
    else {
      args = [ message ];
    }

    switch (openGroup) {
      case 'open':
        console.group.apply(console, args);
      break;
      case 'coll':
        console.groupCollapsed.apply(console, args);
      break;
      case 'end':
        console.groupEnd.apply(console, args);
      break;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.state)
   * -----------------------------------------------------
   * @desc Use to view the state of a variable or property.
   * @param {(string|vals)} methodName - The name of the method. An
   *   array with all the parameters can be supplied here.
   * @param {...string} varName - The name of the passed variables to log.
   * @param {...*} val - The name of the passed variables to log.
   * @example
   *   _debug.state('methodName', 'varName', var, 'varName', var, ...) {
   *   // or
   *   _debug.state(['methodName', 'varName', var, 'varName', var, ...]) {
   */
  Debug.prototype.state = function(methodName) {

    /**
     * @type {vals}
     * @private
     */
    var args;
    /**
     * @type {string}
     * @private
     */
    var message;

    if (!this._state) {
      return;
    }

    if ( Array.isArray(methodName) ) {
      args = methodName.slice(1);
      methodName = methodName[0];
    }
    else {
      args = Array.prototype.slice.call(arguments, 1);
    }

    message = 'STATE: ' + this._classTitle + methodName + '() | ';

    args = args.slice(0).filter(function(/** * */ val, /** number */ i) {

      if (i % 2) {
        message += ( (i > 1) ? ', ' : '' ) + Debug.getSubstitute(val);
        return true;
      }

      message += val + '= ';
      return false;
    });

    args.unshift(message);

    console.log.apply(console, args);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.misc)
   * -----------------------------------------------------
   * @desc Use to make a custom console log.
   * @param {(string|vals)} methodName - The name of the method. An
   *   array with all the parameters can be supplied here.
   * @param {string} customMsg - The custom log message. Use string
   *   substitution to add variable values to your message (use '%i' instead
   *   of '%d' for numbers). The helper method, [Debug.getSubstitute()]{@link Debug#getSubstitute},
   *   can be used to get the correct substitution string for the variable. For
   *   more details on string substitution see {@link https://developer.chrome.com/devtools/docs/console-api#consolelogobject-object}.
   * @param {...*} val - The value of any variables to add to the log.
   * @example _debug.misc('methodName', 'customMsg', var, var, ...) {
   */
  Debug.prototype.misc = function(methodName, customMsg) {

    /**
     * @type {?vals}
     * @private
     */
    var args;
    /**
     * @type {string}
     * @private
     */
    var message;

    if (!this._misc) {
      return;
    }

    if ( Array.isArray(methodName) ) {
      customMsg = methodName[1];
      args = (!!methodName[2]) ? methodName.slice(2) : [];
      methodName = methodName[0];
    }
    else {
      args = ( (arguments.length > 2) ?
        Array.prototype.slice.call(arguments, 2) : []
      );
    }

    message = 'MISC: ' + this._classTitle + methodName + '() | ' + customMsg;

    args.unshift(message);

    console.log.apply(console, args);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOn)
   * -----------------------------------------------------
   * @desc Use to show a category of logs that was hidden.
   * @param {...string} logCat - The log category to show.
   * @example _debug.turnOn('logCat', 'logCat', ...) {
   */
  Debug.prototype.turnOn = function() {

    /**
     * @type {strings}
     * @private
     */
    var args;
    /**
     * @type {string}
     * @private
     */
    var msg;

    args = Array.prototype.slice.call(arguments);

    args.forEach(function(/** string */ val) {
      switch (val) {
        case 'start':
          this._start = true;
        break;
        case 'args':
          this._args = true;
        break;
        case 'fail':
          this._fail = true;
        break;
        case 'group':
          this._group = true;
        break;
        case 'state':
          this._state = true;
        break;
        case 'misc':
          this._misc = true;
        break;
        default:
          msg = '' +
          'Error: The entered log category, \'' + Debug.getSubstitute(val) +
          '\', is incorrect. The available category options are \'start\', ' +
          '\'args\', \'fail\', \'group\', \'state\', and \'misc\'.';
          this.misc('_debug.turnOn', msg, val);
        break;
      }
    }, this);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOff)
   * -----------------------------------------------------
   * @desc Use to hide a category of logs from the console.
   * @param {...string} logCat - The log category to hide.
   * @example _debug.turnOff('logCat', 'logCat', ...) {
   */
  Debug.prototype.turnOff = function() {

    /**
     * @type {strings}
     * @private
     */
    var args;
    /**
     * @type {string}
     * @private
     */
    var msg;

    args = Array.prototype.slice.call(arguments);

    args.forEach(function(/** string */ val) {
      switch (val) {
        case 'start':
          this._start = false;
        break;
        case 'args':
          this._args = false;
        break;
        case 'fail':
          this._fail = false;
        break;
        case 'group':
          this._group = false;
        break;
        case 'state':
          this._state = false;
        break;
        case 'misc':
          this._misc = false;
        break;
        default:
          msg = '' +
          'Error: The entered log category, \'' + Debug.getSubstitute(val) +
          '\', is incorrect. The available category options are \'start\', ' +
          '\'args\', \'fail\', \'group\', \'state\', and \'misc\'.';
          this.misc('_debug.turnOff', msg, val);
        break;
      }
    }, this);

    return true;
  };

// debugEnd