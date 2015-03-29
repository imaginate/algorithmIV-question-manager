  /**
   * ----------------------------------------------- 
   * Public Variable (debug)
   * -----------------------------------------------
   * @desc The Debug instance for the module's public methods.
   * @type {Debug}
   */
  var debug = aIV.debug({
    classTitle     : 'module',
    turnOnDebuggers: 'args fail'
  });

  /**
   * ----------------------------------------------- 
   * Public Variable (events.debug)
   * -----------------------------------------------
   * @desc The Debug instance for the app's DOM events.
   * @type {{ debug: Debug }}
   */
  var events = {
    debug: aIV.debug({
      classTitle     : 'Events',
      turnOnDebuggers: 'args fail'
    })
  };

  /**
   * ----------------------------------------------- 
   * Public Variable (app)
   * -----------------------------------------------
   * the instance of this app
   * @type {App}
   */
  var app;
