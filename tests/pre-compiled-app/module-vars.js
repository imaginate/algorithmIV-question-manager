  // The debugging vars
  var debug = aIV.debug('module');
  var debugArgs, debugMsg, debugCheck;

  /**
   * -----------------------------------------------------
   * Public Variable (hasAppBeenInitialized)
   * -----------------------------------------------------
   * @desc Indicates whether the app has been initialized.
   * @type {boolean}
   */
  var hasAppBeenInitialized = false;

  /**
   * ----------------------------------------------- 
   * Public Variable (resources)
   * -----------------------------------------------
   * @desc The resources for the app.
   * @type {!Object}
   */
  var resources = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (app)
   * -----------------------------------------------
   * @desc The app instance.
   * @type {!App}
   */
  var app;
