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
   * ----------------------------------------------- 
   * Public Variable (app)
   * -----------------------------------------------
   * the instance of this app
   * @type {App}
   */
  var app;
