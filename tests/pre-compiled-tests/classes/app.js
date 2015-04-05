  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for the app.
   * @constructor
   */
  var App = function() {

    console.log('Tests app is being setup.');

    /**
     * ---------------------------------------------------
     * Private Property (App.elems)
     * ---------------------------------------------------
     * @desc The elements for this app.
     * @type {Object}
     */
    this.elems = new Elems();
    Object.freeze(this.elems);
  };

  // Ensure constructor is set to this class.
  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.runTests)
   * -----------------------------------------------
   * @desc Sets up the display for the app.
   * @type {function()}
   */
  App.prototype.runTests = function() {

    /** @type {Object} */
    var body;

    body = document.body;

    this.elems.ui.style.opacity = '0';

    setTimeout(function() {
      // Remove the body's children
      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }
      aIV.debug.setConfig({ turnOnDebuggers: 'args fail' });
      Tests.runApp();
    }, 500);
  };
