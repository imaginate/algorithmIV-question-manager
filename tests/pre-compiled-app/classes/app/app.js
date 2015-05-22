  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for this app.
   * @type {!Object<string, *>}
   * @struct
   */
  var App = {};

  /**
   * -----------------------------------------------------
   * Public Method (App.setup)
   * -----------------------------------------------------
   * @desc Defines app's properties and checks for errors before constructing
   *   the complete app object.
   * @param {?objectMap} config - The user's config settings.
   * @param {?stringMap} sources - The user's sources.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @param {!objects} questions - The user's questions.
   */
  App.setup = function(config, sources, categories, questions) {

    app.debug = aIV.debug({ // $s$
      classTitle: 'App',
      openGroups: true
    });                     // $e$
    app.debugHelp = aIV.debug('AppHelpers');

    app.debug.start('setup', config, sources, categories, questions);

    /** @type {!Array<*>} */
    var args;

    args = [ config, 'objectMap', sources, 'stringMap', questions, '!objects' ];
    args.push(categories, 'objectMap|stringMap');
    checkArgs.apply(null, args);

    ////////////////////////////////////////////////////////////////////////////
    // Define app's Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems)
     * -----------------------------------------------
     * @desc Saves a reference to key DOM nodes for this app.
     * @type {!AppElems}
     */
    app.elems = new AppElems();

    /**
     * ----------------------------------------------- 
     * Public Property (App.vals)
     * -----------------------------------------------
     * @desc Saves the current values for this app.
     * @type {!AppVals}
     */
    app.vals;

    /**
     * ---------------------------------------------------
     * Public Property (App.config)
     * ---------------------------------------------------
     * @type {!Config}
     */
    app.config;

    /**
     * ---------------------------------------------------
     * Public Property (App.sources)
     * ---------------------------------------------------
     * @type {!Sources}
     */
    app.sources;

    /**
     * ---------------------------------------------------
     * Public Property (App.categories)
     * ---------------------------------------------------
     * @type {!Categories}
     */
    app.categories;

    /**
     * ---------------------------------------------------
     * Public Property (App.searchBar)
     * ---------------------------------------------------
     * @type {!SearchBar}
     */
    app.searchBar;

    /**
     * ---------------------------------------------------
     * Public Property (App.questions)
     * ---------------------------------------------------
     * @type {!Questions}
     */
    app.questions;

    /**
     * ---------------------------------------------------
     * Public Property (App.isHistory)
     * ---------------------------------------------------
     * @desc Tells whether the browser has a usable History class.
     * @type {boolean}
     */
    app.isHistory;

    ////////////////////////////////////////////////////////////////////////////
    // Check for missing questions & init the app
    ////////////////////////////////////////////////////////////////////////////

    if (questions.length) {
      App.init(config, sources, categories, questions);
    }
    else {
      app.elems.appendError();
    }

    ////////////////////////////////////////////////////////////////////////////
    // End of the app's setup routine
    ////////////////////////////////////////////////////////////////////////////

    app.debug.end('setup', app);
    questions.length || debug.end('startApp', app);
  };

  /**
   * -----------------------------------------------------
   * Public Method (App.init)
   * -----------------------------------------------------
   * @desc The constructor for App.
   * @param {?objectMap} config - The user's config settings.
   * @param {?stringMap} sources - The user's sources.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @param {!objects} questions - The user's questions.
   */
  App.init = function(config, sources, categories, questions) {

    app.debug.start('init', config, sources, categories, questions);

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!booleanMap} */
    var tmpConfig;
    /** @type {Object<string, (string|number)>} */
    var defaults;
    /** @type {function} */
    var get;
    
    app.vals = new AppVals(questions.length);

    app.config = new Config(config);

    app.sources = new Sources(sources);

    app.categories = new Categories(categories);

    get = app.config.prettifier.get;
    tmpConfig = {
      trimSpace   : get('trimSpace'),
      tabLength   : get('tabLength'),
      commentLinks: get('commentLinks')
    };
    prettify.setConfig(tmpConfig);

    get = app.config.searchBar.get;
    tmpConfig = {
      stage   : get('stage'),
      source  : get('source'),
      category: get('category'),
      subCat  : get('subCat')
    };
    app.searchBar = new SearchBar(tmpConfig);

    get = app.config.questions.get;
    tmpConfig = {
      id      : get('id'),
      complete: get('complete'),
      source  : get('source'),
      category: get('category'),
      subCat  : get('subCat'),
      links   : get('links'),
      output  : get('output')
    };
    app.questions = new Questions(questions, tmpConfig);

    defaults = ( (config && hasOwnProp(config, 'searchDefaults')) ?
      config.searchDefaults : null
    );
    app.config.searchBar.defaults.update(defaults);

    get = app.config.searchBar.defaults.get;
    defaults = {
      view   : get('view'),
      order  : get('order'),
      stage  : get('stage'),
      source : get('source'),
      mainCat: get('mainCat'),
      subCat : get('subCat')
    };
    app.searchBar.setToDefaults(defaults);

    App.setToDefaults(get('startID'), App.findMatches()); // index, ids);

    app.isHistory = App.setHistory();

    App.setupDisplay();

    ////////////////////////////////////////////////////////////////////////////
    // End of the app's init routine
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(app);

    app.debug.end('init', app);
  };

////////////////////////////////////////////////////////////////////////////////
// The methods for setting up & updating the app's state & display
////////////////////////////////////////////////////////////////////////////////

  /**
   * -----------------------------------------------
   * Public Method (App.setupDisplay)
   * -----------------------------------------------
   * @desc Sets up the display for the app.
   * @type {function}
   */
  App.setupDisplay = function() {

    app.debug.start('setupDisplay');

    /** @type {number} */
    var renderTime;
    /** @type {boolean} */
    var flip;

    renderTime = app.questions.len * 50;

    app.debug.state('setupDisplay', 'renderTime= $$', renderTime);

    app.elems.appendNav();
    app.searchBar.setOptElems();
    app.searchBar.appendElems();
    app.questions.addIdsToSearch();
    app.questions.appendElems();

    // Allow the DOM time to process the appended elements before continuing
    setTimeout(function() {

      app.questions.addCodeExts();
      app.elems.hold.style.display = 'none';
      flip = (app.searchBar.vals.order === 'desc');
      App.updateDisplay(null, null, null, flip, true);

      setTimeout(function() {          // $s$
        app.debug.end('setupDisplay', app);
        debug.end('startApp', app);
      }, 520);                         // $e$

    }, renderTime);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.updateDisplay)
   * -----------------------------------------------
   * @desc Show the current matching questions for the app.
   * @param {numbers=} oldIds - The old matching ids.
   * @param {?number=} oldIndex - The old ids index.
   * @param {?string=} oldView - The value of view before the
   *   update. Defaults to the value of the new view.
   * @param {boolean=} flipElems - If set to true it indicates that
   *   the order of each question's element should be flipped.
   * @param {boolean=} noPushState - If set to true it indicates
   *   that the pushState call should NOT be made.
   */
  App.updateDisplay = function(oldIds, oldIndex, oldView,
                               flipElems, noPushState) {

    debugArgs = [ 'updateDisplay', oldIds, oldIndex, oldView, flipElems ];
    debugArgs.push(noPushState);
    app.debug.start(debugArgs);

    /** @type {!Array<*>} */
    var args;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var newIndex;
    /** @type {string} */
    var newView;

    args = [ oldIds, 'numbers=', oldIndex, '?number=', oldView, '?string=' ];
    args.push(flipElems, 'boolean=', noPushState, 'boolean=');
    checkArgs.apply(null, args);

    oldIds = oldIds || app.vals.get('ids').slice(0);
    oldIndex = oldIndex || app.vals.get('index');

    newView = app.searchBar.vals.view;
    oldView = oldView || newView;

    newIds = app.vals.get('ids').slice(0);
    newIndex = app.vals.get('index');

    // Hide the question's main element
    app.elems.main.style.opacity = '0';

    // Wrap logic in timeout to allow css transitions to complete
    setTimeout(function() {

      // Show or hide the prev and next nav elements
      app.elems.nav.style.display = ( (newView === 'all') ?
        'none' : (newView === 'ten' && app.vals.get('len') > 10) ?
          'block' : (newView === 'one' && app.vals.get('len') > 1) ?
            'block' : 'none'
      );

      flipElems && app.questions.reverseElems();
      app.questions.hideElems(oldIds, oldIndex, oldView);
      app.questions.showElems(newIds, newIndex);

      if (app.isHistory && !noPushState) {
        window.history.pushState(App.makeStateObj(), '');
      }

      // Show the question's main element
      app.elems.main.style.opacity = '1';

      app.debug.end('updateDisplay', app);
    }, 520);
  };

////////////////////////////////////////////////////////////////////////////////
// The App's helper methods
////////////////////////////////////////////////////////////////////////////////

  /**
   * -----------------------------------------------
   * Public Method (App.findMatches)
   * -----------------------------------------------
   * @desc Finds the matching question ids for the current selected search
   *   values.
   * @return {!numbers} An array of the matching ids.
   */
  App.findMatches = function() {

    app.debugHelp.start('findMatches');

    /** @type {numbers} */
    var stage;
    /** @type {numbers} */
    var source;
    /** @type {numbers} */
    var mainCat;
    /** @type {numbers} */
    var subCat;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {numbers} */
    var newIds;
    /** @type {boolean} */
    var pass;

    // Save the current values
    stage   = app.searchBar.vals.stage;
    source  = app.searchBar.vals.source;
    mainCat = app.searchBar.vals.mainCat;
    subCat  = app.searchBar.vals.subCat;

    // Save the matching ids
    stage = ( (stage === 'all') ?
      null : app.searchBar.ques.stage[ stage ].slice(0)
    );
    source = ( (source === 'all') ?
      null : app.sources.get(source, 'ids').slice(0)
    );
    mainCat = ( (mainCat === 'all') ?
      null : app.categories.get(mainCat, 'ids').slice(0)
    );
    subCat = ( (subCat === 'all') ?
      null : app.categories.get(subCat, 'ids').slice(0)
    );

    // Check for empty arrays
    if ((stage   && !stage.length)   ||
        (source  && !source.length)  ||
        (mainCat && !mainCat.length) ||
        (subCat  && !subCat.length)) {
      newIds = [];
      app.debugHelp.end('findMatches', newIds);
      return newIds;
    }

    // Check for all ids
    if (!stage && !source && !mainCat && !subCat) {
      newIds = app.vals.get('allIds').slice(0);
      if (app.searchBar.vals.order === 'desc') {
        newIds.reverse();
      }
      app.debugHelp.end('findMatches', newIds);
      return newIds;
    }

    // Find the min length array
    len = (stage) ? stage.length : app.questions.len;
    if (source && source.length < len) {
      len = source.length;
    }
    if (mainCat && mainCat.length < len) {
      len = mainCat.length;
    }
    if (subCat && subCat.length < len) {
      len = subCat.length;
    }

    // Set the newIds to the min length array
    if (stage && stage.length === len) {
      newIds = stage.slice(0);
      stage = null;
    }
    else if (source && source.length === len) {
      newIds = source.slice(0);
      source = null;
    }
    else if (mainCat && mainCat.length === len) {
      newIds = mainCat.slice(0);
      mainCat = null;
    }
    else if (subCat && subCat.length === len) {
      newIds = subCat.slice(0);
      subCat = null;
    }

    // Check for all null arrays
    if (!stage && !source && !mainCat && !subCat) {
      if (app.searchBar.vals.order === 'desc') {
        newIds.reverse();
      }
      app.debugHelp.end('findMatches', newIds);
      return newIds;
    }

    // Remove the question ids that do not exist in all other arrays
    i = newIds.length;
    while (i--) {
      pass = true;

      if (stage) {
        if (!stage.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], stage);
      }

      if (source) {
        if (!source.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], source);
      }

      if (mainCat) {
        if (!mainCat.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], mainCat);
      }

      if (subCat) {
        if (!subCat.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], subCat);
      }

      if (!pass) {
        newIds.splice(i, 1);
      }
    }

    if (app.searchBar.vals.order === 'desc') {
      newIds.reverse();
    }

    app.debugHelp.end('findMatches', newIds);

    return newIds;
  };

  /**
   * -----------------------------------------------
   * Public Method (App.setToDefaults)
   * -----------------------------------------------
   * @desc Updates the app's values to match the defaults.
   * @param {number} newIndex
   * @param {!numbers} newIds
   */
  App.setToDefaults = function(newIndex, newIds) {

    app.debugHelp.start('setToDefaults', newIndex, newIds);

    checkArgs(newIndex, 'number', newIds, '!numbers');

    if (newIndex > 0) {
      app.searchBar.vals.view = 'one';
      newIndex = newIds.indexOf(newIndex);
    }

    if (app.searchBar.vals.view === 'all' || !newIds.length) {
      newIndex = -1;
    }
    else if (newIndex < 0 || newIndex >= newIds.length) {
      newIndex = 0;
    }

    app.vals.set(newIds, newIndex);

    app.debugHelp.end('setToDefaults');
  };

  /**
   * -----------------------------------------------
   * Public Method (App.setHistory)
   * -----------------------------------------------
   * @desc Checks whether the browser supports the native History object and if
   *   the browser supports it this method sets up its properties for the app.
   * @return {boolean} Whether the browser supports the native History object.
   */
  App.setHistory = function() {

    app.debugHelp.start('setHistory');

    /** @type {boolean} */
    var pass;

    pass = true;

    try {
      window.history.replaceState(App.makeStateObj(), '');
    }
    catch (e) {
      pass = false;
      app.debug.fail('setHistory', false, e.toString());
    }

    if (pass) {
      window.onpopstate = function(event) {
        Events.popState( JSON.parse(event.state) );
      };
    }

    app.debugHelp.end('setHistory', pass);

    return pass;
  };

  /**
   * -----------------------------------------------
   * Public Method (App.makeStateObj)
   * -----------------------------------------------
   * @desc Returns a state object for the current app values.
   * @return {!Object<string, (string|number|!numbers)>}
   */
  App.makeStateObj = function() {

    app.debugHelp.start('makeStateObj');

    /** @type {!Object<string, string>} */
    var searchVals;
    /** @type {!Object<string, (string|number|!numbers)>} */
    var vals;

    searchVals = app.searchBar.vals;
    vals = {
      ids    : app.vals.get('ids').slice(0),
      index  : app.vals.get('index'),
      view   : searchVals.view,
      order  : searchVals.order,
      stage  : searchVals.stage,
      source : searchVals.source,
      mainCat: searchVals.mainCat,
      subCat : searchVals.subCat
    };

    vals = JSON.stringify(vals);

    app.debugHelp.end('makeStateObj', vals);

    return vals;
  };

  freezeObj(App, true);
