  /**
   * -----------------------------------------------------
   * Public Variable (testsModuleAPI)
   * -----------------------------------------------------
   * @desc The API for the Tests Module.
   * @type {!Object<string, function>}
   */
  var testsModuleAPI = {};

  /**
   * -----------------------------------------------------
   * Public Method (testsModuleAPI.startTests)
   * -----------------------------------------------------
   * @desc Initializes the aIV.app tests.
   * @type {function}
   */
  testsModuleAPI.startTests = function() {

    if (!appHasBeenInitialized) {

      appHasBeenInitialized = true;

      // Setup the tests app
      app = new App();

      // Run the tests
      app.runTests();
    }
  };

  aIV.utils.freezeObj(testsModuleAPI, true);
