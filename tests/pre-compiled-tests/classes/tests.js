  /**
   * -----------------------------------------------------
   * Public Class (Tests)
   * -----------------------------------------------------
   * @desc The tests to run.
   * @struct
   */
  var Tests = {};

  /**
   * -------------------------------------------------
   * Public Method (Tests.runApp)
   * -------------------------------------------------
   * @desc Runs the question manager app with the dummy data.
   * @type {function}
   */
  Tests.runApp = function() {
    aIV.app(TestData);
  };

  Object.freeze(Tests);
