  /**
   * ----------------------------------------------- 
   * Public Class (Events)
   * -----------------------------------------------
   * @desc The app's event handlers.
   * @type {Object<string, function>}
   * @struct
   */
  var Events = {};

  Events.debug = aIV.debug('Events');

  /**
   * ----------------------------------------------- 
   * Public Method (Events.popState)
   * -----------------------------------------------
   * @desc The onPopState event handler for the window.
   * @param {!Object} newState - The new state to apply to the app.
   */
  Events.popState = function(newState) {

    this.debug.start('popState', newState);

    /** @type {!numbers} */
    var oldIds;
    /** @type {number} */
    var oldIndex;
    /** @type {string} */
    var oldView;
    /** @type {boolean} */
    var flipElems;

    checkArgs(newState, '!object');

    oldIds = app.vals.get('ids').slice(0);
    oldIndex = app.vals.get('index');
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

    app.vals.reset(newState.ids, newState.index);

    App.updateDisplay(oldIds, oldIndex, oldView, flipElems, true);

    this.debug.end('popState');
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.prev)
   * -----------------------------------------------
   * @desc The onClick event handler for the previous button.
   * @type {function}
   */
  Events.prev = function() {

    this.debug.start('prev.onclick');

    /** @type {number} */
    var oldIndex;

    oldIndex = app.vals.get('index');

    app.vals.move('prev');

    App.updateDisplay(null, oldIndex);

    this.debug.end('prev.onclick');
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.next)
   * -----------------------------------------------
   * @desc The onClick event handler for the next button.
   * @type {function}
   */
  Events.next = function() {

    this.debug.start('next.onclick');

    /** @type {number} */
    var oldIndex;

    oldIndex = app.vals.get('index');

    app.vals.move('next');

    App.updateDisplay(null, oldIndex);

    this.debug.end('next.onclick');
  };


  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchView)
   * -----------------------------------------------
   * @desc The onChange event handler for the view search option.
   * @param {string} newVal - The new value for the view.
   */
  Events.searchView = function(newVal) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var oldIndex;
    /** @type {number} */
    var newIndex;
    /** @type {string} */
    var oldView;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.view != newVal) {

      this.debug.start('searchView.onchange', newVal);

      len = app.vals.get('len');

      oldIndex = app.vals.get('index');
      newIndex = (newVal === 'all' || !len) ? -1 : 0;
      oldView = app.searchBar.vals.view;

      app.searchBar.vals.view = newVal;
      app.vals.set(null, newIndex);

      App.updateDisplay(null, oldIndex, oldView);

      this.debug.end('searchView.onchange');
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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.order != newVal) {

      this.debug.start('searchOrder.onchange', newVal);

      oldIds = app.vals.get('ids');
      newIds = oldIds.slice(0);
      newIds.reverse();

      app.searchBar.vals.order = newVal;
      app.vals.set(newIds);

      App.updateDisplay(oldIds, null, null, true);

      this.debug.end('searchOrder.onchange');
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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.stage != newVal) {

      this.debug.start('searchStage.onchange', newVal);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.stage = newVal;

      newIds = App.findMatches();

      app.vals.reset(newIds);

      App.updateDisplay(oldIds, oldIndex);

      this.debug.end('searchStage.onchange');
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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.source != newVal) {

      this.debug.start('searchSource.onchange', newVal);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.source = newVal;

      newIds = App.findMatches();

      app.vals.reset(newIds);

      App.updateDisplay(oldIds, oldIndex);

      this.debug.end('searchSource.onchange');
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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.mainCat != newVal) {

      this.debug.start('searchMainCat.onchange', newVal);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.mainCat = newVal;

      newIds = App.findMatches();

      app.vals.reset(newIds);

      app.searchBar.updateSubCatOpts();
      App.updateDisplay(oldIds, oldIndex);

      this.debug.end('searchMainCat.onchange');
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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.subCat != newVal) {

      this.debug.start('searchSubCat.onchange', newVal);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.subCat = newVal;

      newIds = App.findMatches();

      app.vals.reset(newIds);

      App.updateDisplay(oldIds, oldIndex);

      this.debug.end('searchSubCat.onchange');
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

    this.debug.group('linkId.onclick', 'coll', 'questionID= $$', id);
    this.debug.start('linkId.onclick', id);

    /** @type {number} */
    var oldIndex;
    /** @type {string} */
    var oldView;

    checkArgs(id, 'number');

    oldIndex = app.vals.get('index');
    oldView = app.searchBar.vals.view;

    app.searchBar.elems.view.value = 'one';

    app.vals.move(id);

    App.updateDisplay(null, oldIndex, oldView);

    this.debug.end('linkId.onclick');
    this.debug.group('linkId.onclick', 'end');
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkSource)
   * -----------------------------------------------
   * @desc The onClick event handler for a question source.
   * @param {string} id - The question's source to link to.
   */
  Events.linkSource = function(id) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(id, 'string');

    if (app.searchBar.vals.source != id) {

      this.debug.group('linkSource.onclick', 'coll', 'sourceID= $$', id);
      this.debug.start('linkSource.onclick', id);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.source = id;
      if (app.searchBar.elems.source) {
        app.searchBar.elems.source.value = id;
      }

      newIds = App.findMatches();

      app.vals.reset(newIds);

      App.updateDisplay(oldIds, oldIndex);

      this.debug.end('linkSource.onclick');
      this.debug.group('linkSource.onclick', 'end');
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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(id, 'string');

    if (app.searchBar.vals.mainCat != id) {

      this.debug.group('linkMainCat.onclick', 'coll', 'mainCatID= $$', id);
      this.debug.start('linkMainCat.onclick', id);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.mainCat = id;
      if (app.searchBar.elems.mainCat) {
        app.searchBar.elems.mainCat.value = id;
      }

      newIds = App.findMatches();

      app.vals.reset(newIds);

      app.searchBar.updateSubCatOpts();
      App.updateDisplay(oldIds, oldIndex);

      this.debug.end('linkMainCat.onclick');
      this.debug.group('linkMainCat.onclick', 'end');
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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(id, 'string', parentId, 'string');

    if (app.searchBar.vals.subCat != id) {

      this.debug.group('linkSubCat.onclick', 'coll', 'subCatID= $$', id);
      this.debug.start('linkSubCat.onclick', id, parentId);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      // Check the main category and update the values and options
      if (app.searchBar.vals.mainCat !== 'all' &&
          app.searchBar.vals.mainCat !== parentId) {
        app.searchBar.vals.mainCat = 'all';
        if (app.searchBar.elems.mainCat) {
          app.searchBar.elems.mainCat.value = 'all';
        }
        app.searchBar.updateSubCatOpts(id);
      }
      else {
        app.searchBar.vals.subCat = id;
        if (app.searchBar.elems.subCat) {
          app.searchBar.elems.subCat.value = id;
        }
      }

      newIds = App.findMatches();

      app.vals.reset(newIds);

      App.updateDisplay(oldIds, oldIndex);

      this.debug.end('linkSubCat.onclick');
      this.debug.group('linkSubCat.onclick', 'end');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.extCodeView)
   * -----------------------------------------------
   * @desc The onClick event handler for a question code extender.
   * @param {number} overflow - The question's code view overflow pixel count.
   * @param {elementMap} elems - The code view elements.
   */
  Events.extCodeView = function(overflow, elems) {

    this.debug.start('extCodeView.onclick', overflow, elems);

    /** @type {number} */
    var newWidth;
    /** @type {number} */
    var newRight;

    checkArgs(overflow, 'number', elems, 'elemMap');

    newWidth = elems.code.clientWidth;

    this.debug.state('extCodeView.onclick', 'orgWidth= $$', newWidth);

    if (elems.extOpen.innerHTML === 'close') {

      elems.extClose.style.opacity = '0';

      elems.ext.style.right = '-4px';

      newWidth = newWidth - overflow;
      elems.code.style.width = newWidth + 'px';

      setTimeout(function() {
        elems.extOpen.style.opacity = '0.8';
        setTimeout(function() {
          setElemText(elems.extOpen, 'open');
          elems.extHovC.style.display = 'none';
          elems.extHovO.style.display = 'block';
        }, 600);
      }, 400);
    }
    else if (elems.extOpen.innerHTML === 'open') {

      elems.extOpen.style.opacity = '0';

      newRight = overflow + 4;
      elems.ext.style.right = '-' + newRight + 'px';

      this.debug.state('extCodeView.onclick', 'newRight= $$', newRight);

      newWidth = newWidth + overflow;
      elems.code.style.width = newWidth + 'px';

      this.debug.state('extCodeView.onclick', 'newWidth= $$', newWidth);

      setTimeout(function() {
        elems.extClose.style.opacity = '0.8';
        setTimeout(function() {
          setElemText(elems.extOpen, 'close');
          elems.extHovO.style.display = 'none';
          elems.extHovC.style.display = 'block';
        }, 600);
      }, 400);
    }

    this.debug.end('extCodeView.onclick');
  };

  freezeObj(Events, true);
