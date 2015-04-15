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
   * Public Method (_init)
   * -----------------------------------------------------
   * @desc Initializes the aIV.debug tests.
   * @type {function}
   */
  var _init = function() {

    // Check if tests module has been initialized
    if (!_initialized) {

      // Save the init to prevent second init
      _initialized = true;

      // Setup the tests
      app = new App();

      // Run the tests
      app.runTests();
    }
  };
