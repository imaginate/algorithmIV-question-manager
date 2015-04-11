  /**
   * ----------------------------------------------- 
   * Public Class (Events)
   * -----------------------------------------------
   * @desc The app's event handlers.
   * @type {Object<string, function>}
   * @struct
   */
  var Events = {};

  // $s$
  /**
   * ----------------------------------------------- 
   * Public Property (Events.debug)
   * -----------------------------------------------
   * @desc The Debug instance for the app's DOM events.
   * @type {Debug}
   */
  Events.debug = aIV.debug('Events');
  // $e$

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchView)
   * -----------------------------------------------
   * @desc The onChange event handler for the view search option.
   * @param {string} newVal - The new value for the view.
   */
  Events.searchView = function(newVal) {

    this.debug.start('searchView.onchange', newVal);
    this.debug.args('searchView.onchange', newVal, 'string');

    /** @type {string} */
    var oldVal;

    if (app.searchBar.vals.view != newVal) {

      this.debug.group('searchView.onchange', 'coll');

      oldVal = app.searchBar.vals.view;
      app.searchBar.vals.view = newVal;
      app.updateDisplay({
        noVals : true,
        reset  : true,
        oldView: oldVal
      });

      this.debug.group('searchView.onchange', 'end');
    }
  };
