  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for this app.
   * @param {?objectMap} config - The user's config settings.
   * @param {?stringMap} sources - The user's sources.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @param {!objects} questions - The user's questions.
   * @constructor
   */
  var App = function(config, sources, categories, questions) {

    this.debug = aIV.debug('App');

    this.debug.start('init', config, sources, categories, questions);

    /** @type {!Array<*>} */
    var args;

    args = [ config, 'objectMap', sources, 'stringMap' ];
    args.push(categories, 'objectMap|stringMap', questions, '!objects');
    checkArgs.apply(null, args);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (App.flags)
     * -----------------------------------------------
     * @desc Saves flags that explain the current state of the app.
     * @type {AppFlags}
     * @struct
     */
    this.flags;

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems)
     * -----------------------------------------------
     * @desc Saves a reference to key DOM nodes for this app.
     * @type {AppElems}
     */
    this.elems;

    /**
     * ----------------------------------------------- 
     * Public Property (App.vals)
     * -----------------------------------------------
     * @desc Saves the current values for this app.
     * @type {AppVals}
     */
    this.vals;

    /**
     * ---------------------------------------------------
     * Public Property (App.config)
     * ---------------------------------------------------
     * @type {Config}
     */
    this.config;

    /**
     * ---------------------------------------------------
     * Public Property (App.sources)
     * ---------------------------------------------------
     * @type {Sources}
     */
    this.sources;

    /**
     * ---------------------------------------------------
     * Public Property (App.categories)
     * ---------------------------------------------------
     * @type {Categories}
     */
    this.categories;

    /**
     * ---------------------------------------------------
     * Public Property (App.searchBar)
     * ---------------------------------------------------
     * @type {SearchBar}
     */
    this.searchBar;

    /**
     * ---------------------------------------------------
     * Public Property (App.questions)
     * ---------------------------------------------------
     * @type {Questions}
     */
    this.questions;

    /**
     * ---------------------------------------------------
     * Public Property (App.isHistory)
     * ---------------------------------------------------
     * @desc Tells whether the browser has a usable History class.
     * @type {boolean}
     */
    this.isHistory;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {booleanMap} */
    var tmpConfig;
    /** @type {?Object<string, (string|number)>} */
    var defaults;
    /** @type {Object<string, stringMap>} */
    var names;
    /** @type {Object<string, strings>} */
    var ids;
    /** @type {number} */
    var len;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var newIndex;

    // Save the count of questions for use before questions is setup
    len = questions.length;

    // Setup the properties    
    this.flags   = new AppFlags(!!len);
    this.elems   = new AppElems();
    this.vals    = new AppVals(len);
    this.config  = new Config(config);
    this.sources = new Sources(sources);
    this.categories = new Categories(categories);

    // Setup the prettifier
    tmpConfig = {
      trimSpace   : this.config.prettifier.get('trimSpace'),
      tabLength   : this.config.prettifier.get('tabLength'),
      commentLinks: this.config.prettifier.get('commentLinks')
    };
    prettify.setConfig(tmpConfig);

    // Setup the search bar
    tmpConfig = {
      stage   : this.config.searchBar.get('stage'),
      source  : this.config.searchBar.get('source'),
      category: this.config.searchBar.get('category'),
      subCat  : this.config.searchBar.get('subCat')
    };
    this.searchBar = new SearchBar(tmpConfig, this.sources, this.categories);

    // Setup the questions
    tmpConfig = {
      id      : this.config.questions.get('id'),
      complete: this.config.questions.get('complete'),
      source  : this.config.questions.get('source'),
      category: this.config.questions.get('category'),
      subCat  : this.config.questions.get('subCat'),
      links   : this.config.questions.get('links'),
      output  : this.config.questions.get('output')
    };
    this.questions = new Questions(questions, tmpConfig, this.sources.get,
                                   this.categories.get);

    // Set the search defaults
    defaults = ( (!!config && hasOwnProp(config, 'searchDefaults')) ?
      config.searchDefaults : null
    );
    names = this.searchBar.names;
    ids = this.searchBar.ids.subCat;
    this.config.searchBar.defaults.update(defaults, names, ids, len);

    // Set the search bar to the defaults
    this.searchBar.setToDefaults(this.config.searchBar.defaults);

    // Update the current values to match the given defaults
    newIds = this.findMatches();
    newIndex = this.config.searchBar.defaults.get('startID');
    if (newIndex > 0) {
      this.searchBar.vals.view = 'one';
      newIndex = newIds.indexOf(newIndex);
    }
    len = newIds.length;
    if (this.searchBar.vals.view === 'all' || !len) {
      newIndex = -1;
    }
    else if (newIndex < 0 || newIndex >= len) {
      newIndex = 0;
    }
    this.vals.set(newIds, newIndex);

    this.debug.state('init', 'index= $$', this.vals.get('index'));

    // Setup the value of isHistory
    this.isHistory = true;
    try {
      window.history.replaceState( this.getStateObj() );
    }
    catch (e) {
      this.isHistory = false;
    }

    this.debug.state('init', 'isHistory= $$', this.isHistory);

    // Setup the onpopstate event
    if (this.isHistory) {
      window.onpopstate = function(event) {
        Events.popState( JSON.parse(event.state) );
      };
    }

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.setupDisplay)
   * -----------------------------------------------
   * @desc Sets up the display for the app.
   * @type {function}
   */
  App.prototype.setupDisplay = function() {

    app.debug.start('setupDisplay');

    /** @type {number} */
    var renderTime;

    if ( app.flags.get('initArgs') ) {

      app.elems.appendNav();
      app.searchBar.setMainElems();
      app.searchBar.setOptElems();
      app.searchBar.appendElems();
      app.questions.addIdsToSearch();
      app.questions.appendElems();

      renderTime = app.questions.len * 50;
      app.debug.state('setupDisplay', 'renderTime= $$', renderTime);
      setTimeout(function() {

        /** @type {boolean} */
        var flip;

        app.questions.addCodeExts();
        app.elems.hold.style.display = 'none';
        flip = (app.searchBar.vals.order === 'desc');
        app.updateDisplay(null, null, null, flip, true);

        // $s$
        setTimeout(function() {
          app.debug.end('setupDisplay');
          debug.end('startApp');
        }, 520);
        // $e$

      }, renderTime);
    }
    else {
      app.elems.appendError();
      app.debug.end('setupDisplay');
      debug.end('startApp');
    }
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.updateDisplay)
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
  App.prototype.updateDisplay = function(oldIds, oldIndex, oldView,
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

    oldIds = (!!oldIds) ? oldIds : app.vals.get('ids').slice(0);
    oldIndex = ( ( checkType(oldIndex, '!number') ) ?
      oldIndex : app.vals.get('index')
    );

    newView = app.searchBar.vals.view;
    oldView = ( checkType(oldView, '!string') ) ? oldView : newView;

    flipElems = flipElems || false;
    noPushState = noPushState || false;

    // Save the new matching question ids and index
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

      // Check if the questions order should be flipped
      if (flipElems) {
        app.questions.reverseElems();
      }

      // Hide the old questions
      app.questions.hideElems(oldIds, oldIndex, oldView);

      // Show the new questions
      app.questions.showElems(newIds, newIndex);

      // Update the state
      if (app.isHistory && !noPushState) {
        window.history.pushState( app.getStateObj() );
      }

      // Show the question's main element
      app.elems.main.style.opacity = '1';

      app.debug.end('updateDisplay');
    }, 520);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.findMatches)
   * -----------------------------------------------
   * @desc Finds the matching question ids for the current selected search
   *   values.
   * @return {numbers} An array of the matching ids.
   */
  App.prototype.findMatches = function() {

    this.debug.start('findMatches');

    /** @type {nums} */
    var stage;
    /** @type {nums} */
    var source;
    /** @type {nums} */
    var mainCat;
    /** @type {nums} */
    var subCat;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {nums} */
    var newIds;
    /** @type {boolean} */
    var pass;
    /** @type {function} */
    var checkForValue;

    // Save the current values
    stage   = this.searchBar.vals.stage;
    source  = this.searchBar.vals.source;
    mainCat = this.searchBar.vals.mainCat;
    subCat  = this.searchBar.vals.subCat;

    // Save the matching ids
    stage = ( (stage === 'all') ?
      null : this.searchBar.ques.stage[ stage ].slice(0)
    );
    source = ( (source === 'all') ?
      null : this.sources.get(source, 'ids').slice(0)
    );
    mainCat = ( (mainCat === 'all') ?
      null : this.categories.get(mainCat, 'ids').slice(0)
    );
    subCat = ( (subCat === 'all') ?
      null : this.categories.get(subCat, 'ids').slice(0)
    );

    // Check for empty arrays
    if ((stage   && !stage.length)   ||
        (source  && !source.length)  ||
        (mainCat && !mainCat.length) ||
        (subCat  && !subCat.length)) {
      newIds = [];
      this.debug.end('findMatches', newIds);
      return newIds;
    }

    // Check for all ids
    if (!stage && !source && !mainCat && !subCat) {
      newIds = this.vals.get('allIds').slice(0);
      if (this.searchBar.vals.order === 'desc') {
        newIds.reverse();
      }
      this.debug.end('findMatches', newIds);
      return newIds;
    }

    // Find the min length array
    len = (stage) ? stage.length : this.questions.len;
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
      if (this.searchBar.vals.order === 'desc') {
        newIds.reverse();
      }
      this.debug.end('findMatches', newIds);
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

    if (this.searchBar.vals.order === 'desc') {
      newIds.reverse();
    }

    this.debug.end('findMatches', newIds);

    return newIds;
  };

  /**
   * ----------------------------------------------- 
   * Public Method (AppVals.prototype.getStateObj)
   * -----------------------------------------------
   * @desc Returns a state object for the current app values.
   * @return {Object<string, (string|number|numbers)>}
   */
  App.prototype.getStateObj = function() {

    this.debug.start('getStateObj');

    /** @type {Object<string, (string|number|numbers)>} */
    var vals;

    vals = {
      ids    : this.vals.get('ids').slice(0),
      index  : this.vals.get('index'),
      view   : this.searchBar.vals.view,
      order  : this.searchBar.vals.order,
      stage  : this.searchBar.vals.stage,
      source : this.searchBar.vals.source,
      mainCat: this.searchBar.vals.mainCat,
      subCat : this.searchBar.vals.subCat
    };

    vals = JSON.stringify(vals);

    this.debug.end('getStateObj', vals);

    return vals;
  };
