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
   * Public Variable (debug)
   * -----------------------------------------------
   * @desc The Debug instance for the module's public methods.
   * @type {Debug}
   */
  var debug = (DEBUG) ? new Debug() : null;

  /**
   * -----------------------------------------------------
   * Public Class (Debug)
   * -----------------------------------------------------
   * @desc Contains the debugging methods for this module.
   * @param {string=} classTitle - The name of the class.
   * @param {strings=} turnOffTypes - The instance's debug categories to disable.
   * @constructor
   */
  var Debug = function(classTitle, turnOffTypes) {

    classTitle = classTitle || 'module';
    classTitle += '.';
    turnOffTypes = turnOffTypes || [];

    /**
     * -----------------------------------------------------
     * Private Variable (types)
     * -----------------------------------------------------
     * @desc Allows disabling of specific debug methods per class instance.
     *   <ol>
     *     <li>start: Logs the start of every method.</li>
     *     <li>args: Evaluations that assert method's arguments and
     *         log error messages when they are incorrect.</li>
     *     <li>fail: Applies custom evaluations and logs errors when
     *         they occur.</li>
     *     <li>group: Groups console logs and shares any supplied
     *         properties.</li>
     *     <li>state: Logs the state of the supplied properties.</li>
     *     <li>misc: Logs a custom message and properties.</li>
     *   </ol>
     * @type {{
     *   start: boolean,
     *   args : boolean,
     *   fail : boolean,
     *   group: boolean,
     *   state: boolean,
     *   misc : boolean
     * }}
     * @private
     */
    var types = {
      start: (turnOffTypes.indexOf('start') === -1) ? true : false,
      args : (turnOffTypes.indexOf('args')  === -1) ? true : false,
      fail : (turnOffTypes.indexOf('fail')  === -1) ? true : false,
      group: (turnOffTypes.indexOf('group') === -1) ? true : false,
      state: (turnOffTypes.indexOf('state') === -1) ? true : false,
      misc : (turnOffTypes.indexOf('misc')  === -1) ? true : false
    };

    /**
     * ---------------------------------------------------
     * Public Property (Debug.classTitle)
     * ---------------------------------------------------
     * @desc The class name for the instance.
     * @type {string}
     */
    this.classTitle = classTitle;

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getType)
     * ---------------------------------------------------
     * @desc Retrieve this instance's value for the supplied type.
     * @param {string} type - The type to get.
     * @return {boolean}
     */
    this.getType = function(type) {

      if (!!types[type] && typeof types[type] === 'boolean') {
        return true;
      }

      return false;
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setType)
     * ---------------------------------------------------
     * @desc Set this instance's value for the supplied type.
     * @param {string} type - The type to set.
     * @param {boolean} val - The value to set the type to.
     */
    this.setType = function(type, val) {
      types[type] = val;
    };
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
   *   debug.start('methodName', var, var, ...) {
   *   // or
   *   debug.start(['methodName', var, var, ...]) {
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

    if ( !this.getType('start') ) {
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
   *   debug.args('methodName', var, 'object', var, 'number', ...) {
   *   // or
   *   debug.args(['methodName', var, 'object', var, 'number', ...]) {
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

    if ( !this.getType('args') ) {
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

    if ( !this.getType('fail') ) {
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
   *   debug.group('methodName', true, 'varName', var, 'varName', var, ...) {
   *   // or
   *   debug.group(['methodName', true, 'varName', var, 'varName', var, ...]) {
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
   *   debug.state('methodName', 'varName', var, 'varName', var, ...) {
   *   // or
   *   debug.state(['methodName', 'varName', var, 'varName', var, ...]) {
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

    if ( !this.getType('state') ) {
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
   * @example debug.misc('methodName', 'customMsg', var, var, ...) {
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

    if ( !this.getType('misc') ) {
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
   * @example debug.turnOn('logCat', 'logCat', ...) {
   */
  Debug.prototype.turnOn = function() {

    /**
     * @type {strings}
     * @private
     */
    var args;

    args = Array.prototype.slice.call(arguments);

    args.forEach(function(/** string */ val) {
      this.setType(val, true);
    }, this);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOff)
   * -----------------------------------------------------
   * @desc Use to hide a category of logs from the console.
   * @param {...string} logCat - The log category to hide.
   * @example debug.turnOff('logCat', 'logCat', ...) {
   */
  Debug.prototype.turnOff = function() {

    /**
     * @type {strings}
     * @private
     */
    var args;

    args = Array.prototype.slice.call(arguments);

    args.forEach(function(/** string */ val) {
      this.setType(val, false);
    }, this);

    return true;
  };

// debugEnd