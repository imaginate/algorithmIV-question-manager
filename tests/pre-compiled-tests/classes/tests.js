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

    aIV.debug.set({
      addBreakpoints: 'args fail',
      turnOnGroups  : false,
      turnOnProfiles: false,
      turnOnTimers  : false
    });

    aIV.debug({
      classTitle    : 'prettify',
      turnOffMethods: 'all'
    });

    aIV.debug({
      classTitle    : 'highlightSyntax',
      turnOffMethods: 'all'
    });

    return function() {
      aIV.app(TestData);
    };
  })();

  freezeObj(Tests);
