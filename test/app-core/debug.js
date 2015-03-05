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
  var _debug = new Debug();

  /**
   * -----------------------------------------------------
   * Public Class (Debug)
   * -----------------------------------------------------
   * @desc Contains the debugging methods for this module.
   * @param {string=} classTitle - The name of the class
   * @constructor
   */
  var Debug = function(classTitle) {

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
    this._start = true;

    /**
     * ---------------------------------------------------
     * Private Property (Debug._args)
     * ---------------------------------------------------
     * @desc Indicates whether to show this category's console logs.
     * @type {boolean}
     * @default true
     * @private
     */
    this._args = true;

    /**
     * ---------------------------------------------------
     * Private Property (Debug._fail)
     * ---------------------------------------------------
     * @desc Indicates whether to show this category's console logs.
     * @type {boolean}
     * @default true
     * @private
     */
    this._fail = true;

    /**
     * ---------------------------------------------------
     * Private Property (Debug._group)
     * ---------------------------------------------------
     * @desc Indicates whether to show this category's console logs.
     * @type {boolean}
     * @default true
     * @private
     */
    this._group = true;

    /**
     * ---------------------------------------------------
     * Private Property (Debug._state)
     * ---------------------------------------------------
     * @desc Indicates whether to show this category's console logs.
     * @type {boolean}
     * @default true
     * @private
     */
    this._state = true;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.getSubstitute)
   * ---------------------------------------------------
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
   *   types e.g. 'string|number'. Use '=' to indicate null as a
   *   possibility e.g. 'array=' or 'string|number='.
   * @return {boolean} The evaluation result.
   */
  Debug.checkType = function(val, type) {

    /**
     * @type {Array<string>}
     * @private
     */
    var types;
    /**
     * @type {boolean}
     * @private
     */
    var pass;

    type = type.toLowerCase();

    types = ( /\|/.test(type) ) ? type.split('|') : [type];

    pass = false;

    types.forEach(function(type) {
      if ( /\=/.test(type) ) {
        pass = pass || (val === null);
        type = type.substring(0, (type.length - 1));
      }
      if (type === 'array') {
        pass = pass || Array.isArray(val);
      }
      else {
        pass = pass || (typeof val === type)
      }
    });

    return pass;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.start)
   * -----------------------------------------------------
   * @desc Use to start every method.
   * @param {string} methodName - The name of the method.
   * @param {...*} val - Each argument passed to the method in order of appearance.
   * @example start('methodName', var, var) { ...
   */
  Debug.prototype.start = function(methodName) {

    /**
     * @type {Array<*>}
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

    args = Array.prototype.slice.call(arguments, 1);

    message = 'START: ' + this._classTitle + methodName + '(';
    args.forEach(function(/** ? */ val, /** number */ i) {
      message += ( (i) ? ', ' : '' ) + Debug.getSubstitute(val);
    });
    message += ')';

    args.unshift(message);

    console.log.apply(console, args);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.args)
   * -----------------------------------------------------
   * @desc Use to catch an improper method argument.
   * @param {string} methodName - The name of the method.
   * @param {...*} val - Each argument passed to the method.
   * @param {...string} type -  Each passed argument's data type.
   * @example args('methodName', var, 'object', var, 'number') { ...
   */
  Debug.prototype.args = function(methodName) {

    /**
     * @type {Array<*>}
     * @private
     */
    var args;
    /**
     * @type {boolean}
     * @private
     */
    var pass;
    /**
     * @type {?}
     * @private
     */
    var varVal;
    /**
     * @type {string}
     * @private
     */
    var message;

    if (!this._args) {
      return;
    }

    args = Array.prototype.slice.call(arguments, 1);

    pass = true;

    args.forEach(function(/** ? */ val, /** number */ i) {
      if (i % 2) {
        pass = pass && Debug.checkType(varVal, val);
      }
      else {
        varVal = val;
      }
    }, this);

    message = 'ARGS: ' + this._classTitle + methodName + '() | ' +
              'Error: Incorrect argument operand.';

    console.assert.call(console, pass, message);
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

    message = 'FAIL: ' + this._classTitle + methodName + '() | ' +
              'Error: ' + errorMsg;

    console.assert.call(console, pass, message);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.group)
   * -----------------------------------------------------
   * @desc Use to group console messages.
   * @param {string} methodName - The name of the method.
   * @param {boolean=} openGroup - Start or end a group.
   * @param {...string=} varName - The name of the passed variables to log.
   * @param {...*} val - The value of the passed variables to log.
   * @example group('methodName', true, 'varName', var, 'varName', var) { ...
   */
  Debug.prototype.group = function(methodName, openGroup) {

    /**
     * @type {Array<*>}
     * @private
     */
    var args;
    /**
     * @type {Array<*>}
     * @private
     */
    var finalArgs;
    /**
     * @type {string}
     * @private
     */
    var message;

    if (!this._group) {
      return;
    }

    openGroup = openGroup || true;

    finalArgs = [];

    message = 'GROUP: ' + this._classTitle + methodName + '()';

    if (arguments.length > 2) {

      message += ' | ';

      args = Array.prototype.slice.call(arguments, 2);
      args.forEach(function(/** ? */ val, /** number */ i) {
        if (i % 2) {
          message += ( (i > 1) ? ', ' : '' ) + Debug.getSubstitute(val);
          finalArgs.push(val);
        }
        else {
          message += val + '= ';
        }
      });
    }

    finalArgs.unshift(message);

    if (openGroup) {
      console.groupCollapsed.apply(console, finalArgs);
    }
    else {
      console.groupEnd.apply(console, finalArgs);
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.state)
   * -----------------------------------------------------
   * @desc Use to view the state of a variable or property.
   * @param {string} methodName - The name of the method.
   * @param {...string} varName - The name of the passed variables to log.
   * @param {...*} val - The name of the passed variables to log.
   * @example state('methodName', 'varName', var, 'varName', var) { ...
   */
  Debug.prototype.state = function(methodName) {

    /**
     * @type {Array<*>}
     * @private
     */
    var args;
    /**
     * @type {Array<*>}
     * @private
     */
    var finalArgs;
    /**
     * @type {string}
     * @private
     */
    var message;

    if (!this._state) {
      return;
    }

    args = Array.prototype.slice.call(arguments, 1);

    finalArgs = [];

    message = 'STATE: ' + this._classTitle + methodName + '() | ';

    args.forEach(function(/** ? */ val, /** number */ i) {
      if (i % 2) {
        message += ( (i > 1) ? ', ' : '' ) + Debug.getSubstitute(val);
        finalArgs.push(val);
      }
      else {
        message += val + '= ';
      }
    });

    finalArgs.unshift(message);

    console.log.apply(console, finalArgs);
  };
