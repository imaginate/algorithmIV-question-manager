  // $s$
  var debug = aIV.debug({
    classTitle  : 'appModule',
    turnOnGroups: true,
    turnOnTimers: true
  });
  var debugArgs, debugMsg, debugCheck;
  // $e$

  /**
   * -----------------------------------------------------
   * Public Variable (appHasBeenInitialized)
   * -----------------------------------------------------
   * @desc Indicates whether the app has been initialized.
   * @type {boolean}
   */
  var appHasBeenInitialized = false;

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
