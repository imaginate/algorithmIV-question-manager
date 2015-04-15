  /**
   * -----------------------------------------------------
   * Public Class (Tests)
   * -----------------------------------------------------
   * @desc The tests to run.
   * @struct
   */
  var Tests = {};

  /**
   * -----------------------------------------------------
   * Public Method (Tests.runApp)
   * -----------------------------------------------------
   * @desc Runs the question manager app with test data.
   * @type {function}
   */
  Tests.runApp = (function() {

    // These calls run immediately to ensure that desired
    // settings are set before the app is processed

    aIV.debug.setConfig({
      turnOnDebuggers: 'args fail'
    });

    aIV.debug({
      classTitle  : 'prettify',
      turnOffTypes: 'all'
    });

    aIV.debug({
      classTitle  : 'highlightSyntax',
      turnOffTypes: 'all'
    });

    return function() {
      aIV.app(TestData);
    };
  })();

  Object.freeze(Tests);
