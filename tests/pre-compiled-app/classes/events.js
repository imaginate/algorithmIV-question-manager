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

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkId)
   * -----------------------------------------------
   * @desc The onClick event handler for a question id.
   * @param {number} id - The question's id to link to.
   * @return {boolean} Returns false to avoid the default action.
   */
  Events.linkId = function(id) {

    this.debug.group('linkId.onclick', 'coll', 'questionID= $$', id);
    this.debug.start('linkId.onclick', id);
    this.debug.args('linkId.onclick', id, 'number');

    app.searchBar.elems.view.value = 'one';
    app.moveDisplay(id);

    this.debug.group('linkId.onclick', 'end');

    return false;
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkSource)
   * -----------------------------------------------
   * @desc The onClick event handler for a question source.
   * @param {string} id - The question's source to link to.
   * @return {boolean} Returns false to avoid the default action.
   */
  Events.linkSource = function(id) {

    this.debug.start('linkSource.onclick', id);
    this.debug.args('linkSource.onclick', id, 'string');

    if (app.searchBar.vals.source != id) {

      this.debug.group('linkSource.onclick', 'coll', 'sourceID= $$', id);

      app.searchBar.vals.source = id;
      app.searchBar.elems.source.value = id;
      app.updateDisplay();

      this.debug.group('linkSource.onclick', 'end');
    }

    return false;
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkMainCat)
   * -----------------------------------------------
   * @desc The onClick event handler for a question main category.
   * @param {string} id - The question's category to link to.
   * @return {boolean} Returns false to avoid the default action.
   */
  Events.linkMainCat = function(id) {

    this.debug.start('linkMainCat.onclick', id);
    this.debug.args('linkMainCat.onclick', id, 'string');

    if (app.searchBar.vals.mainCat != id) {

      this.debug.group('linkMainCat.onclick', 'coll', 'mainCatID= $$', id);

      app.searchBar.vals.mainCat = id;
      app.searchBar.elems.mainCat.value = id;
      app.searchBar.updateSubCatOpts();
      app.updateDisplay();

      this.debug.group('linkMainCat.onclick', 'end');
    }

    return false;
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkSubCat)
   * -----------------------------------------------
   * @desc The onClick event handler for a question sub category.
   * @param {string} id - The question's category to link to.
   * @param {string} parentId - The sub category's parent category.
   * @return {boolean} Returns false to avoid the default action.
   */
  Events.linkSubCat = function(id, parentId) {

    this.debug.start('linkSubCat.onclick', id, parentId);
    this.debug.args('linkSubCat.onclick', id, 'string', parentId, 'string');

    if (app.searchBar.vals.subCat != id) {

      this.debug.group('linkSubCat.onclick', 'coll', 'subCatID= $$', id);

      // Check the main category and update the values and options
      if (app.searchBar.vals.mainCat !== 'all' &&
          app.searchBar.vals.mainCat !== parentId) {
        app.searchBar.vals.mainCat = 'all';
        app.searchBar.elems.mainCat.value = 'all';
        app.searchBar.updateSubCatOpts(id);
        app.searchBar.elems.subCat.value = id;
      }
      else {
        app.searchBar.vals.subCat = id;
        app.searchBar.elems.subCat.value = id;
      }

      // Finish the display update
      app.updateDisplay();

      this.debug.group('linkSubCat.onclick', 'end');
    }

    return false;
  };

  Object.freeze(Events);
