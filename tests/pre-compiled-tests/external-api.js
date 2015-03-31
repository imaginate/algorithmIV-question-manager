  /**
   * -----------------------------------------------------
   * Private Variable (_return)
   * -----------------------------------------------------
   * @desc Holds the public methods for the module.
   * @typedef {tests}
   * @struct
   */
  var _return = {};

  /**
   * -----------------------------------------------------
   * Private Variable (_initialized)
   * -----------------------------------------------------
   * @desc Indicates whether the tests module has been initialized.
   * @type {boolean}
   * @private
   */
  var _initialized = false;

  /**
   * -----------------------------------------------------
   * Public Method (_return.init)
   * -----------------------------------------------------
   * @desc Initializes the aIV.debug tests.
   * @type {function()}
   */
  _return.init = function() {

    // Check if tests module has been initialized
    if (!_initialized) {

      // Save the init to prevent second init
      _initialized = true;

      // Setup the dummy app
      app = new App();
      Object.freeze(app);

      // Run the tests
      app.runTests();
    }
  };
