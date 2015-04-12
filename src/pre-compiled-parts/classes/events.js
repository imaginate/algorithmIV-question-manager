  /**
   * ----------------------------------------------- 
   * Public Class (Events)
   * -----------------------------------------------
   * @desc The app's event handlers.
   * @type {Object<string, function>}
   * @struct
   */
  var Events = {};

  /**
   * ----------------------------------------------- 
   * Public Method (Events.popState)
   * -----------------------------------------------
   * @desc The onPopState event handler for the window.
   * @param {Object} newState - The new state to apply to the app.
   */
  Events.popState = function(newState) {

    /** @type {string} */
    var oldView;
    /** @type {boolean} */
    var flipElems;

    oldView = app.searchBar.vals.view;
    flipElems = (app.searchBar.vals.order !== newState.order);

    app.searchBar.vals.view    = newState.view;
    app.searchBar.vals.order   = newState.order;
    app.searchBar.vals.stage   = newState.stage;
    app.searchBar.vals.source  = newState.source;
    app.searchBar.vals.mainCat = newState.mainCat;
    app.searchBar.vals.subCat  = newState.subCat;

    app.searchBar.elems.view.value = newState.view;
    app.searchBar.elems.order.value = newState.order;
    if (app.searchBar.elems.stage) {
      app.searchBar.elems.stage.value = newState.stage;
    }
    if (app.searchBar.elems.source) {
      app.searchBar.elems.source.value = newState.source;
    }
    if (app.searchBar.elems.mainCat) {
      app.searchBar.elems.mainCat.value = newState.mainCat;
    }
    if (app.searchBar.elems.subCat) {
      app.searchBar.elems.subCat.value = newState.subCat;
    }

    app.updateDisplay({
      flipElems  : flipElems,
      oldView    : oldView,
      noPushState: true
    });

  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchView)
   * -----------------------------------------------
   * @desc The onChange event handler for the view search option.
   * @param {string} newVal - The new value for the view.
   */
  Events.searchView = function(newVal) {

    /** @type {string} */
    var oldVal;

    if (app.searchBar.vals.view != newVal) {

      oldVal = app.searchBar.vals.view;
      app.searchBar.vals.view = newVal;
      app.updateDisplay({
        noMatchReset: true,
        oldView     : oldVal
      });

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

    if (app.searchBar.vals.order != newVal) {

      app.searchBar.vals.order = newVal;
      app.updateDisplay({
        noMatchReset: true,
        flipElems   : true,
        keepIndex   : true
      });

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

    if (app.searchBar.vals.stage != newVal) {

      app.searchBar.vals.stage = newVal;
      app.updateDisplay();

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

    if (app.searchBar.vals.source != newVal) {

      app.searchBar.vals.source = newVal;
      app.updateDisplay();

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

    if (app.searchBar.vals.mainCat != newVal) {

      app.searchBar.vals.mainCat = newVal;
      app.searchBar.updateSubCatOpts();
      app.updateDisplay();

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

    if (app.searchBar.vals.subCat != newVal) {

      app.searchBar.vals.subCat = newVal;
      app.updateDisplay();

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkId)
   * -----------------------------------------------
   * @desc The onClick event handler for a question id.
   * @param {number} id - The question's id to link to.
   */
  Events.linkId = function(id) {

    app.searchBar.elems.view.value = 'one';
    app.moveDisplay(id);

  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkSource)
   * -----------------------------------------------
   * @desc The onClick event handler for a question source.
   * @param {string} id - The question's source to link to.
   */
  Events.linkSource = function(id) {

    if (app.searchBar.vals.source != id) {

      app.searchBar.vals.source = id;
      app.searchBar.elems.source.value = id;
      app.updateDisplay();

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkMainCat)
   * -----------------------------------------------
   * @desc The onClick event handler for a question main category.
   * @param {string} id - The question's category to link to.
   */
  Events.linkMainCat = function(id) {

    if (app.searchBar.vals.mainCat != id) {

      app.searchBar.vals.mainCat = id;
      app.searchBar.elems.mainCat.value = id;
      app.searchBar.updateSubCatOpts();
      app.updateDisplay();

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkSubCat)
   * -----------------------------------------------
   * @desc The onClick event handler for a question sub category.
   * @param {string} id - The question's category to link to.
   * @param {string} parentId - The sub category's parent category.
   */
  Events.linkSubCat = function(id, parentId) {

    if (app.searchBar.vals.subCat != id) {

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

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.extCodeView)
   * -----------------------------------------------
   * @desc The onClick event handler for a question code extender.
   * @param {number} overflow - The question's code view overflow pixel count.
   * @param {elemMap} elems - The code view elements.
   */
  Events.extCodeView = function(overflow, elems) {

    /** @type {number} */
    var newWidth;
    /** @type {number} */
    var newRight;

    newWidth = elems.code.clientWidth;

    if (elems.extOpen.innerHTML === 'close') {

      elems.extClose.style.opacity = '0';

      elems.ext.style.right = '-4px';

      newWidth = newWidth - overflow;
      elems.code.style.width = newWidth + 'px';

      setTimeout(function() {
        elems.extOpen.style.opacity = '0.8';
        setTimeout(function() {
          elems.extOpen.innerHTML = 'open';
          elems.extHovC.style.display = 'none';
          elems.extHovO.style.display = 'block';
        }, 600);
      }, 400);
    }
    else if (elems.extOpen.innerHTML === 'open') {

      elems.extOpen.style.opacity = '0';

      newRight = overflow + 4;
      elems.ext.style.right = '-' + newRight + 'px';

      newWidth = newWidth + overflow;
      elems.code.style.width = newWidth + 'px';

      setTimeout(function() {
        elems.extClose.style.opacity = '0.8';
        setTimeout(function() {
          elems.extOpen.innerHTML = 'close';
          elems.extHovO.style.display = 'none';
          elems.extHovC.style.display = 'block';
        }, 600);
      }, 400);
    }

  };

  Object.freeze(Events);
