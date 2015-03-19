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
    turnOffTypes = ( ( Array.isArray(turnOffTypes) ) ?
      turnOffTypes.join(' ') : ''
    );

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
      start: ( !/(start)/i.test(turnOffTypes) ),
      args : (  !/(args)/i.test(turnOffTypes) ),
      fail : (  !/(fail)/i.test(turnOffTypes) ),
      group: ( !/(group)/i.test(turnOffTypes) ),
      state: ( !/(state)/i.test(turnOffTypes) ),
      misc : (  !/(misc)/i.test(turnOffTypes) )
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
      return (!!types[type]);
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setType)
     * ---------------------------------------------------
     * @desc Set this instance's value for the supplied type.
     * @param {string} type - The type to set.
     * @param {boolean} val - The type's new value.
     * @return {boolean} Indicates whether correct arguments were given.
     */
    this.setType = function(type, val) {
      if (typeof type === 'string' && types.hasOwnProperty(type) &&
          typeof val  === 'boolean') {
        types[type] = val;
        return true;
      }
      return false;
    };
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.getSubstituteString)
   * ---------------------------------------------------
   * @desc Gets the correct substitution string for the given value.
   * @param {val} val - The value to be evaluated.
   * @return {string} The correct substitution string.
   */
  Debug.getSubstituteString = function(val) {

    if (typeof val === 'object') {
      return '%O';
    }

    if (typeof val === 'number') {
      return '%i';
    }

    return '%s';
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.insertSubstituteStrings)
   * ---------------------------------------------------
   * @desc Inserts the correct substitution strings into a console message.
   * @param {string} msg - The original console message string.
   * @param {vals} vals - The values to use for finding the
   *   substitution strings.
   * @return {string} The prepared console message.
   */
  Debug.insertSubstituteStrings = function(msg, vals) {

    // Test the given arguments before executing
    if (typeof msg !== 'string' || !Array.isArray(vals)) {
      console.error('A Debug.insertSubstituteStrings method\'s arg(s) was wrong.');
      debugger;
      return '';
    }

    // Insert the substitution strings
    vals.forEach(function(/** val */ val, /** number */ i) {
      /**
       * @type {string}
       * @private
       */
      var sub;

      sub = Debug.getSubstituteString(val);
      if ( /(\$\$)/.test(msg) ) {
        msg = msg.replace(/(\$\$)/, sub);
      }
      else {
        msg += ' var' + i + '= ' + sub + ';';
      }
    });

    return msg;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.checkType)
   * ---------------------------------------------------
   * @param {val} val - The value to be evaluated.
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

    type = type.toLowerCase().replace(/[^a-z\|\=\!]/g, '');

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

        if (typeof val === type) {
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
   * @param {(string|vals)} methodName - The name of the method. An array
   *   with all the parameters for this method (in correct order) can be
   *   supplied here.
   * @param {...val=} val - Each argument passed to the method in order
   *   of appearance.
   * @example
   *   debug.start('methodName', arg1, arg2);
   *   // OR
   *   debug.start([ 'methodName', arg1, arg2 ]);
   */
  Debug.prototype.start = function(methodName) {

    /**
     * @type {boolean}
     * @private
     */
    var argTest;
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

    // Test the given arguments before executing
    argTest = ( ( Array.isArray(methodName) ) ?
      (typeof methodName[0] === 'string') : (typeof methodName === 'string')
    );
    if (!argTest) {
      console.error('A debug.start method\'s arg(s) was wrong.');
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('start') ) {
      return;
    }

    // Setup the varaibles
    if (typeof methodName === 'string') {
      args = ( (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 1) : null
      );
    }
    else {
      args = ( (methodName.length > 1) ?
        methodName.slice(1) : null
      );
      methodName = methodName[0];
    }

    // Prepare the console message
    message = 'START: ' + this._classTitle + methodName + '(';
    if (args) {
      args.forEach(function(/** val */ val, /** number */ i) {
        message += ( (i) ? ', ' : '' ) + Debug.getSubstituteString(val);
      });
    }
    message += ')';

    // Log the message
    if (args) {
      args.unshift(message);
      console.log.apply(console, args);
    }
    else {
      console.log(message);
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.args)
   * -----------------------------------------------------
   * @desc Use to catch an improper method argument.
   * @param {(string|vals)} methodName - The name of the method. An array
   *   with all the parameters for this method (in correct order) can be
   *   supplied here.
   * @param {...val=} val - Each argument passed to the method.
   * @param {...string=} type -  Each passed argument's data type. See
   *   [Debug.checkType()]{@link Debug#checkType} for the input options.
   * @example
   *   debug.args('methodName', arg1, 'object', arg2, 'number');
   *   // OR
   *   debug.args([ 'methodName', arg1, 'object', arg2, 'number' ]);
   */
  Debug.prototype.args = function(methodName) {

    /**
     * @type {boolean}
     * @private
     */
    var argTest;
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

    // Test the given arguments before executing
    argTest = ( (typeof methodName === 'string') ?
      (arguments.length > 3) : ( Array.isArray(methodName) ) ?
        (typeof methodName[0] === 'string' && methodName.length > 3) : false
    );
    if(!argTest) {
      console.error('A debug.args method\'s arg(s) was wrong.');
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('args') ) {
      return;
    }

    // Setup the varaibles
    if (typeof methodName === 'string') {
      args = Array.prototype.slice.call(arguments, 1);
    }
    else {
      args = methodName.slice(1);
      methodName = methodName[0];
    }

    // Test the args
    pass = args.every(function(/** val */ val, /** number */ i) {
      if (i % 2) {
        return Debug.checkType(args[i - 1], val);
      }
      return true;
    });

    // If test passes end this method
    if (pass) {
      return;
    }

    // Prepare and log the error message
    message = 'ARGS: ' + this._classTitle + methodName + '() | ';
    message += 'Error: Incorrect argument operand.';
    console.error(message);

    // Pause the script
    debugger;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.fail)
   * -----------------------------------------------------
   * @desc Use to catch failures within a method.
   * @param {(string|vals)} methodName - The name of the method. An array
   *   with all the parameters for this method (in correct order) can be
   *   supplied here.
   * @param {val=} pass - The test to run (fails if false).
   * @param {string=} message - The message to log if test fails. Use two
   *   consecutive dollar signs to include varaible values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - The value of the passed variables to include in
   *   error message.
   * @example
   *   // A function that returns a boolean value
   *   var test = function() {
   *     if (typeof testVar === 'number') {
   *       ++testVar;
   *     }
   *     return (testVar === 1);
   *   };
   *   // The message to include
   *   var errorMsg = 'Lorem ipsem var1 is $$. | var2= $$';
   *
   *   debug.fail('methodName', test, errorMsg, var1, var2);
   *   // OR
   *   debug.fail([ 'methodName', test, errorMsg, var1, var2 ]);
   */
  Debug.prototype.fail = function(methodName, pass, message) {

    /**
     * @type {boolean}
     * @private
     */
    var argTest;
    /**
     * @type {?vals}
     * @private
     */
    var args;

    // Test the given arguments before executing
    argTest = ( (typeof methodName === 'string') ?
      (typeof message === 'string') : ( Array.isArray(methodName) ) ?
        (typeof methodName[0] === 'string' && typeof methodName[2] === 'string')
        : false
    );
    if(!argTest) {
      console.error('A debug.fail method\'s arg(s) was wrong.');
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('fail') ) {
      return;
    }

    // Setup the varaibles
    if (typeof methodName === 'string') {
      pass = (typeof pass === 'function') ? ( !!pass() ) : (!!pass);
      args = ( (arguments.length > 3) ?
        Array.prototype.slice.call(arguments, 3) : null
      );
    }
    else {
      pass = ( (typeof methodName[1] === 'function') ?
        ( !!methodName[1]() ) : (!!methodName[1])
      );
      message = methodName[2];
      args = (methodName.length > 3) ? methodName.slice(3) : null;
      methodName = methodName[0];
    }

    // If test passes end this method
    if (pass) {
      return;
    }

    // Prepare the message
    if (args) {
      message = Debug.insertSubstituteStrings(message, args);
    }
    message = 'FAIL: ' + this._classTitle + methodName + '() | ' + message;

    // Log the error
    if (args) {
      args.unshift(message);
      console.error.apply(console, args);
    }
    else {
      console.error(message);
    }

    // Pause the script
    debugger;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.group)
   * -----------------------------------------------------
   * @desc Use to group console messages.
   * @param {(string|vals)} methodName - The name of the method. An array
   *   with all the parameters for this method (in correct order) can be
   *   supplied here.
   * @param {string=} openGroup - The type of console method to use. The
   *   options are: 'open'= console.group() | 'coll'= console.groupCollapsed()
   *   | 'end'= console.groupEnd()
   * @param {string=} message - A message to add to an open group call. Use two
   *   consecutive dollar signs to include varaible values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - The value of the passed variables to include in message.
   * @example
   *   // The message to include
   *   var message = 'Lorem ipsem var1 is $$. | var2= $$';
   *
   *   debug.group('methodName', 'coll', message, var1, var2);
   *   // OR
   *   debug.group([ 'methodName', 'coll', message, var1, var2 ]);
   */
  Debug.prototype.group = function(methodName, openGroup, message) {

    /**
     * @type {boolean}
     * @private
     */
    var argTest;
    /**
     * @type {?vals}
     * @private
     */
    var args;

    // Test the given arguments before executing
    argTest = ( (typeof methodName === 'string') ?
      (Debug.checkType(openGroup, 'string=') &&
       Debug.checkType(message, 'string='))
      : ( Array.isArray(methodName) ) ?
        (typeof methodName[0] === 'string' &&
         Debug.checkType(methodName[1], 'string=') &&
         Debug.checkType(methodName[2], 'string='))
        : false
    );
    if(!argTest) {
      console.error('A debug.group method\'s arg(s) was wrong.');
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('group') ) {
      return;
    }

    // Setup the varaibles
    if (typeof methodName === 'string') {
      openGroup = openGroup || 'coll';
      message = message || '';
      args = ( (arguments.length > 3) ?
        Array.prototype.slice.call(arguments, 3) : null
      );
    }
    else {
      openGroup = methodName[1] || 'coll';
      message = methodName[2] || '';
      args = (methodName.length > 3) ? methodName.slice(3) : null;
      methodName = methodName[0];
    }

    // Check for end group type
    if (openGroup === 'end') {
      console.groupEnd();
      return;
    }

    // Ensure group type is correct
    if (openGroup !== 'open' && openGroup !== 'coll') {
      message = 'A debug.group method\'s openGroup arg was wrong. ';
      message += 'The supplied openGroup argument was \'%s\'.';
      console.error(message, openGroup);
      debugger;
      return;
    }

    // Prepare the message
    if (message) {
      if (args) {
        message = Debug.insertSubstituteStrings(message, args);
      }
      message = ' | ' + message;
    }
    message = 'GROUP: ' + this._classTitle + methodName + '()' + message;

    // Setup the console open group args
    if (args) {
      args.unshift(message);
    }
    else {
      args = [ message ];
    }

    // Check for collapsed group type
    if (openGroup === 'coll') {
      console.groupCollapsed.apply(console, args);
      return;
    }

    // Open a console group
    console.group.apply(console, args);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.state)
   * -----------------------------------------------------
   * @desc Use to view the state of a variable or property.
   * @param {(string|vals)} methodName - The name of the method. An array
   *   with all the parameters for this method (in correct order) can be
   *   supplied here.
   * @param {string=} message - A log message that shares a state. Use two
   *   consecutive dollar signs to include varaible values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - The current value of a variable to log.
   * @example
   *   // The message to include
   *   var message = 'Lorem ipsem var1 is $$ and var2= $$';
   *
   *   debug.state('methodName', message, var1, var2);
   *   // OR
   *   debug.state([ 'methodName', message, var1, var2 ]);
   */
  Debug.prototype.state = function(methodName, message) {

    /**
     * @type {boolean}
     * @private
     */
    var argTest;
    /**
     * @type {vals}
     * @private
     */
    var args;

    // Test the given arguments before executing
    argTest = ( (typeof methodName === 'string') ?
      (typeof message === 'string' && arguments.length > 2)
      : ( Array.isArray(methodName) ) ?
        (typeof methodName[0] === 'string' && methodName.length > 2 &&
         typeof methodName[1] === 'string')
        : false
    );
    if(!argTest) {
      console.error('A debug.state method\'s arg(s) was wrong.');
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('state') ) {
      return;
    }

    // Setup the varaibles
    if (typeof methodName === 'string') {
      args = Array.prototype.slice.call(arguments, 2);
    }
    else {
      message = methodName[1];
      args = methodName.slice(2);
      methodName = methodName[0];
    }

    // Prepare the message
    message = Debug.insertSubstituteStrings(message, args);
    message = 'STATE: ' + this._classTitle + methodName + '() | ' + message;

    // Prepare the console args
    args.unshift(message);

    // Log the state
    console.log.apply(console, args);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.misc)
   * -----------------------------------------------------
   * @desc Use to make a custom console log.
   * @param {(string|vals)} methodName - The name of the method. An
   *   array with all the parameters can be supplied here.
   * @param {string} message - The misc log message. Use two consecutive
   *   dollar signs to include varaible values in the message (e.g. This
   *   string, '... numberVar is $$ and  objectVar is $$', will be
   *   automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - The value of any variables to add to the log.
   * @example
   *   // The message to include
   *   var message = 'Lorem ipsem. | var1= $$, var2= $$';
   *
   *   debug.misc('methodName', message, var1, var2);
   *   // OR
   *   debug.misc([ 'methodName', message, var1, var2 ]);
   */
  Debug.prototype.misc = function(methodName, message) {

    /**
     * @type {boolean}
     * @private
     */
    var argTest;
    /**
     * @type {?vals}
     * @private
     */
    var args;

    // Test the given arguments before executing
    argTest = ( (typeof methodName === 'string') ?
      (typeof message === 'string') : ( Array.isArray(methodName) ) ?
        (typeof methodName[0] === 'string' && typeof methodName[1] === 'string')
        : false
    );
    if(!argTest) {
      console.error('A debug.misc method\'s arg(s) was wrong.');
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('misc') ) {
      return;
    }

    // Setup the varaibles
    if (typeof methodName === 'string') {
      args = ( (arguments.length > 2) ?
        Array.prototype.slice.call(arguments, 2) : null
      );
    }
    else {
      message = methodName[1];
      args = (methodName.length > 2) ? methodName.slice(2) : null;
      methodName = methodName[0];
    }

    // Prepare the message
    if (args) {
      message = Debug.insertSubstituteStrings(message, args);
    }
    message = 'MISC: ' + this._classTitle + methodName + '() | ' + message;

    // Log the misc message
    if (args) {
      args.unshift(message);
      console.log.apply(console, args);
    }
    else {
      console.log(message);
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOn)
   * -----------------------------------------------------
   * @desc Use to show a category of logs that was hidden.
   * @param {...(string|strings)} logCat - The log category(ies) to show.
   * @example
   *   debug.turnOn('start', 'state', ...);
   *   // OR
   *   debug.turnOn([ 'start', 'state', ... ]);
   */
  Debug.prototype.turnOn = function(logCat) {

    /**
     * @type {boolean}
     * @private
     */
    var testSet;
    /**
     * @type {?strings}
     * @private
     */
    var args;

    // Ensure arguments are supplied
    if (!logCat) {
      console.error('A debug.turnOn method received no args.');
      debugger;
      return;
    }

    // Setup the variables
    args = ( (Array.isArray(logCat) && logCat.length > 1) ?
      logCat.slice(0) : (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 0) : null
    );
    logCat = ( (args) ?
      null : (typeof logCat === 'string') ?
        logCat : ( Array.isArray(logCat) ) ?
          logCat[0] : null
    );

    // Turn on the debug method category(ies) & save the result(s)
    testSet = ( (args) ?
      args.every(function(/** string */ val) {
        return (!!val && typeof val === 'string' && this.setType(val, true));
      }, this)
      : (!!logCat && this.setType(logCat, true))
    );

    // Test the result(s)
    if (!testSet) {
      logCat = 'A debug.turnOn method\'s arg(s) was wrong. ';
      logCat += 'Ensure that the correct operands are given, ';
      logCat += 'and each string is a valid debug category.';
      console.error(logCat);
      debugger;
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOff)
   * -----------------------------------------------------
   * @desc Use to hide a category of logs from the console.
   * @param {...(string|strings)} logCat - The log category(ies) to hide.
   * @example
   *   debug.turnOff('args', 'fail', ...);
   *   // OR
   *   debug.turnOff([ 'args', 'fail', ... ]);
   */
  Debug.prototype.turnOff = function(logCat) {

    /**
     * @type {boolean}
     * @private
     */
    var testSet;
    /**
     * @type {?strings}
     * @private
     */
    var args;

    // Ensure arguments are supplied
    if (!logCat) {
      console.error('A debug.turnOff method received no args.');
      debugger;
      return;
    }

    // Setup the variables
    args = ( (Array.isArray(logCat) && logCat.length > 1) ?
      logCat.slice(0) : (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 0) : null
    );
    logCat = ( (args) ?
      null : (typeof logCat === 'string') ?
        logCat : ( Array.isArray(logCat) ) ?
          logCat[0] : null
    );

    // Turn off the debug method category(ies) & save the result(s)
    testSet = ( (args) ?
      args.every(function(/** string */ val) {
        return (!!val && typeof val === 'string' && this.setType(val, false));
      }, this)
      : (!!logCat && this.setType(logCat, false))
    );

    // Test the result(s)
    if (!testSet) {
      logCat = 'A debug.turnOff method\'s arg(s) was wrong. ';
      logCat += 'Ensure that the correct operands are given, ';
      logCat += 'and each string is a valid debug category.';
      console.error(logCat);
      debugger;
    }
  };
