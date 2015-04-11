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

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchOrder)
   * -----------------------------------------------
   * @desc The onChange event handler for the order search option.
   * @param {string} newVal - The new value for the order.
   */
  Events.searchOrder = function(newVal) {

    this.debug.start('searchOrder.onchange', newVal);
    this.debug.args('searchOrder.onchange', newVal, 'string');

    if (app.searchBar.vals.order != newVal) {

      this.debug.group('searchOrder.onchange', 'coll');

      app.searchBar.vals.order = newVal;
      app.updateDisplay({
        noVals: true,
        reset : true,
        flip  : true,
        index : true
      });

      this.debug.group('searchOrder.onchange', 'end');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchStage)
   * -----------------------------------------------
   * @desc The onChange event handler for the stage search option.
   * @param {string} newVal - The new value for the stage.
   */
  Events.searchStage = function(newVal) {

    this.debug.start('searchStage.onchange', newVal);
    this.debug.args('searchStage.onchange', newVal, 'string');

    if (app.searchBar.vals.stage != newVal) {

      this.debug.group('searchStage.onchange', 'coll');

      app.searchBar.vals.stage = newVal;
      app.updateDisplay();

      this.debug.group('searchStage.onchange', 'end');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchSource)
   * -----------------------------------------------
   * @desc The onChange event handler for the source search option.
   * @param {string} newVal - The new value for the source.
   */
  Events.searchSource = function(newVal) {

    this.debug.start('searchSource.onchange', newVal);
    this.debug.args('searchSource.onchange', newVal, 'string');

    if (app.searchBar.vals.source != newVal) {

      this.debug.group('searchSource.onchange', 'coll');

      app.searchBar.vals.source = newVal;
      app.updateDisplay();

      this.debug.group('searchSource.onchange', 'end');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchMainCat)
   * -----------------------------------------------
   * @desc The onChange event handler for the main category search option.
   * @param {string} newVal - The new value for the main category.
   */
  Events.searchMainCat = function(newVal) {

    this.debug.start('searchMainCat.onchange', newVal);
    this.debug.args('searchMainCat.onchange', newVal, 'string');

    if (app.searchBar.vals.mainCat != newVal) {

      this.debug.group('searchMainCat.onchange', 'coll');

      app.searchBar.vals.mainCat = newVal;
      app.searchBar.updateSubCatOpts();
      app.updateDisplay();

      this.debug.group('searchMainCat.onchange', 'end');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchSubCat)
   * -----------------------------------------------
   * @desc The onChange event handler for the sub category search option.
   * @param {string} newVal - The new value for the sub category.
   */
  Events.searchSubCat = function(newVal) {

    this.debug.start('searchSubCat.onchange', newVal);
    this.debug.args('searchSubCat.onchange', newVal, 'string');

    if (app.searchBar.vals.subCat != newVal) {

      this.debug.group('searchSubCat.onchange', 'coll');

      app.searchBar.vals.subCat = newVal;
      app.updateDisplay();

      this.debug.group('searchSubCat.onchange', 'end');
    }
  };
