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
      turnOnGroups  : true,
      turnOnProfiles: false,
      turnOnTimers  : false
    });

    aIV.debug({
      classTitle    : 'prettify',
      turnOffMethods: 'all',
      turnOnGroups  : false
    });

    aIV.debug({
      classTitle    : 'highlightSyntax',
      turnOffMethods: 'all',
      turnOnGroups  : false
    });

    // END of immediate calls

    return function runApp() {

      /** @type {!MockAjax} */
      var mockAjax;
      /** @type {!ajaxResults} */
      var ajaxResults;

      ajaxResults = {
        responseText: TestData.exampleResource,
        status      : 200,
        statusText  : '200 OK'
      };
      mockAjax = new MockAjax([ ajaxResults ]);
      aIV.app(TestData.example);
      mockAjax.reset();
    };
  })();

  freezeObj(Tests, true);
