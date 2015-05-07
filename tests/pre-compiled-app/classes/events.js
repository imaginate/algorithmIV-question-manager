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
   * @param {Object} newState - The new state to apply to the app.
   */
  Events.popState = function(newState) {

    this.debug.group('popState', 'coll');
    this.debug.start('popState', newState);
    this.debug.args('popState', newState, 'object');

    /** @type {!numbers} */
    var oldIds;
    /** @type {number} */
    var oldIndex;
    /** @type {string} */
    var oldView;
    /** @type {boolean} */
    var flipElems;

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

    app.updateDisplay(oldIds, oldIndex, oldView, flipElems, true);

    this.debug.group('popState', 'end');
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.prev)
   * -----------------------------------------------
   * @desc The onClick event handler for the previous button.
   * @type {function}
   */
  Events.prev = function() {

    this.debug.group('prev.onclick', 'coll');
    this.debug.start('prev.onclick');

    /** @type {number} */
    var oldIndex;

    oldIndex = app.vals.get('index');

    app.vals.move('prev');

    app.updateDisplay(null, oldIndex);

    this.debug.group('prev.onclick', 'end');
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.next)
   * -----------------------------------------------
   * @desc The onClick event handler for the next button.
   * @type {function}
   */
  Events.next = function() {

    this.debug.group('next.onclick', 'coll');
    this.debug.start('next.onclick');

    /** @type {number} */
    var oldIndex;

    oldIndex = app.vals.get('index');

    app.vals.move('next');

    app.updateDisplay(null, oldIndex);

    this.debug.group('next.onclick', 'end');
  };


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

    /** @type {number} */
    var len;
    /** @type {number} */
    var oldIndex;
    /** @type {number} */
    var newIndex;
    /** @type {string} */
    var oldView;

    if (app.searchBar.vals.view != newVal) {

      this.debug.group('searchView.onchange', 'coll');

      len = app.vals.get('len');

      oldIndex = app.vals.get('index');
      newIndex = (newVal === 'all' || !len) ? -1 : 0;
      oldView = app.searchBar.vals.view;

      app.searchBar.vals.view = newVal;
      app.vals.set(null, newIndex);

      app.updateDisplay(null, oldIndex, oldView);

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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;

    if (app.searchBar.vals.order != newVal) {

      this.debug.group('searchOrder.onchange', 'coll');

      oldIds = app.vals.get('ids');
      newIds = oldIds.slice(0);
      newIds.reverse();

      app.searchBar.vals.order = newVal;
      app.vals.set(newIds);

      app.updateDisplay(oldIds, null, null, true);

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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.stage != newVal) {

      this.debug.group('searchStage.onchange', 'coll');

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.stage = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.source != newVal) {

      this.debug.group('searchSource.onchange', 'coll');

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.source = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.mainCat != newVal) {

      this.debug.group('searchMainCat.onchange', 'coll');

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.mainCat = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.searchBar.updateSubCatOpts();
      app.updateDisplay(oldIds, oldIndex);

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

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.subCat != newVal) {

      this.debug.group('searchSubCat.onchange', 'coll');

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.subCat = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

      this.debug.group('searchSubCat.onchange', 'end');
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
    this.debug.args('linkId.onclick', id, 'number');

    /** @type {number} */
    var oldIndex;
    /** @type {string} */
    var oldView;

    oldIndex = app.vals.get('index');
    oldView = app.searchBar.vals.view;

    app.searchBar.elems.view.value = 'one';

    app.vals.move(id);

    app.updateDisplay(null, oldIndex, oldView);

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

    this.debug.start('linkSource.onclick', id);
    this.debug.args('linkSource.onclick', id, 'string');

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.source != id) {

      this.debug.group('linkSource.onclick', 'coll', 'sourceID= $$', id);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.source = id;
      if (app.searchBar.elems.source) {
        app.searchBar.elems.source.value = id;
      }

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

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

    this.debug.start('linkMainCat.onclick', id);
    this.debug.args('linkMainCat.onclick', id, 'string');

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.mainCat != id) {

      this.debug.group('linkMainCat.onclick', 'coll', 'mainCatID= $$', id);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.mainCat = id;
      if (app.searchBar.elems.mainCat) {
        app.searchBar.elems.mainCat.value = id;
      }

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.searchBar.updateSubCatOpts();
      app.updateDisplay(oldIds, oldIndex);

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

    this.debug.start('linkSubCat.onclick', id, parentId);
    this.debug.args('linkSubCat.onclick', id, 'string', parentId, 'string');

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.subCat != id) {

      this.debug.group('linkSubCat.onclick', 'coll', 'subCatID= $$', id);

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

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

      this.debug.group('linkSubCat.onclick', 'end');
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

    debugMsg = 'overflow= $$, elems= $$'
    this.debug.group('extCodeView.onclick', 'coll', debugMsg, overflow, elems);
    this.debug.start('extCodeView.onclick', overflow, elems);
    this.debug.args('extCodeView.onclick', overflow, 'number', elems, 'elemMap');

    /** @type {number} */
    var newWidth;
    /** @type {number} */
    var newRight;

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
          addElemText(elems.extOpen, 'open');
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
          addElemText(elems.extOpen, 'close');
          elems.extHovO.style.display = 'none';
          elems.extHovC.style.display = 'block';
        }, 600);
      }, 400);
    }

    this.debug.group('extCodeView.onclick', 'end');
  };

  freezeObj(Events);
