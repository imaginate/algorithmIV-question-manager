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

    this.elems.ui.style.opacity = '0';

    setTimeout(function() {
      // Remove the body's children
      while (document.body.firstChild) {
        document.body.removeChild(body.firstChild);
      }
      aIV.debug.setConfig({ turnOnDebuggers: 'args fail' });
      Tests.runApp();
    }, 500);
  };
