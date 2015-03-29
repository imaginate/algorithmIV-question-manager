  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for this app.
   * @param {?Object} config - The user's config settings.
   * @param {?hashMap} sources - The user's sources.
   * @param {?Object} categories - The user's categories.
   * @param {?Object} questions - The user's questions.
   * @constructor
   */
  var App = function(config, sources, categories, questions) {

    /**
     * @type {boolean}
     * @private
     */
    var pass;

    // Check the user inputs
    pass = !!questions;

    /**
     * ---------------------------------------------------
     * Private Property (App.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the App class.
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('App') : null;

    var args, msg;
    if (DEBUG) {
      msg = 'Error: No questions were provided to this app\'s init.';
      this.debug.fail('init', pass, msg);

      msg = 'config= $$, sources= $$, categories= $$, questions= $$';
      args = [ 'init', 'open', msg ];
      args.push(config, sources, categories, questions);
      this.debug.group(args);

      this.debug.start('init', config, sources, categories, questions);

      args = [ 'init' ];
      args.push(config, 'object', sources, 'object');
      args.push(categories, 'object', questions, 'objects');
      this.debug.args(args);
    }

    /**
     * ----------------------------------------------- 
     * Public Property (App.flags)
     * -----------------------------------------------
     * @desc Saves flags that explain the current state of the app.
     * @type {AppFlags}
     * @struct
     */
    this.flags = new AppFlags(pass);

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems)
     * -----------------------------------------------
     * @desc Saves a reference to key DOM nodes for this app.
     * @type {AppElems}
     */
    this.elems = new AppElems();

    /**
     * ----------------------------------------------- 
     * Public Property (App.vals)
     * -----------------------------------------------
     * @desc Saves the current values for this app.
     * @type {AppVals}
     */
    this.vals = new AppVals();

    /**
     * ---------------------------------------------------
     * Public Property (App.config)
     * ---------------------------------------------------
     * @type {Config}
     */
    this.config = (pass) ? new Config(config) : null;

    /**
     * ---------------------------------------------------
     * Public Property (App.sources)
     * ---------------------------------------------------
     * @type {Sources}
     */
    this.sources = (pass) ? new Sources(sources) : null;

    /**
     * ---------------------------------------------------
     * Public Property (App.categories)
     * ---------------------------------------------------
     * @type {Categories}
     */
    this.categories = (pass) ? new Categories(categories) : null;

    /**
     * ---------------------------------------------------
     * Public Property (App.searchBar)
     * ---------------------------------------------------
     * @type {SearchBar}
     */
    this.searchBar = ( (pass) ?
      new SearchBar(this.sources, this.categories) : null
    );

    /**
     * ---------------------------------------------------
     * Public Property (App.questions)
     * ---------------------------------------------------
     * @type {Questions}
     */
    this.questions = ( (pass) ?
      new Questions(questions, this.config.questions.get('output')) : null
    );

    // Update the config and search bar
    if (pass) {
      config.searchDefaults = config.searchDefaults || null;
      this.config.searchBar.setDefaults(config.searchDefaults,
                                        this.searchBar.names,
                                        this.searchBar.ids.subCat,
                                        this.questions.len);
      this.searchBar.setToDefaults(this.config.searchBar.defaults);
    }


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.setupDisplay)
   * -----------------------------------------------
   * @desc Sets up the display for the app.
   * @type {function()}
   */
  App.prototype.setupDisplay = function() {

    if (DEBUG) {
     this.debug.group('setupDisplay', 'open');
     this.debug.start('setupDisplay');
    }

    /**
     * @type {boolean}
     * @private
     */
    var flip;

    // Prepare and show the full app
    this.elems.appendMain();
    if ( this.flags.get('initArgs') ) {
      this.elems.appendNav();
      this.elems.setScrollbarHeight();
      this.elems.setCodeListHeight();
      this.searchBar.setMainElems();
      this.searchBar.setOptElems();
      this.searchBar.appendElems();
      this.questions.setFormats();
      this.questions.appendElems();
      this.elems.hold.display = 'none';
      flip = (this.searchBar.vals.order === 'desc');
      this.updateDisplay(flip);
    }
    else {
      this.elems.appendError();
    }

    DEBUG && this.debug.group('setupDisplay', 'end');
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.updateDisplay)
   * -----------------------------------------------
   * @desc Show the current matching questions for the app.
   * @param {Object=} settings - Settings to change the update actions.
   * @param {boolean=} settings.noVals - If set to true it indicates
   *   that new matching values should NOT be calculated.
   * @param {boolean=} settings.flip - If set to true it indicates that
   *   the order of each question's element should be flipped.
   * @param {string=} settings.oldView - The value of view before the
   *   update. Defaults to the value of the new view.
   * @param {boolean=} settings.reset - If set to true it indicates
   *   that the ids and index should be reset.
   * @param {boolean=} settings.index - If set to true it indicates
   *   that the index should NOT be changed.
   */
  App.prototype.updateDisplay = function(newVals, flip, oldView) {

    // Debugging
    var msg, args;
    if (DEBUG) {
     msg = 'newVals= $$, flip= $$, oldView= $$';
     this.debug.group('updateDisplay', 'coll', msg, newVals, flip, oldView);
     this.debug.start('updateDisplay', flip, oldView);
     args = [ 'updateDisplay' ];
     args.push(newVals, 'boolean=', flip, 'boolean=', oldView, 'string=');
     this.debug.args(args);
    }

    /**
     * @type {?nums}
     * @private
     */
    var oldIds;
    /**
     * @type {num}
     * @private
     */
    var oldIndex;
    /**
     * @type {?nums}
     * @private
     */
    var resetIds;
    /**
     * @type {num}
     * @private
     */
    var resetIndex;
    /**
     * @type {?nums}
     * @private
     */
    var newIds;
    /**
     * @type {num}
     * @private
     */
    var newIndex;
    /**
     * @type {string}
     * @private
     */
    var view;

    settings = settings || {};

    // Save the old matching question ids and index
    oldIds = this.vals.get('len');
    oldIds = (oldIds) ? this.vals.get('ids').slice(0) : null;
    oldIndex = this.vals.get('index');

    // Update the current matching question ids and index
    if (!!settings.noVals) {
      if (!!settings.reset) {
        resetIds = (oldIds) ? oldIds.slice(0) : null;
        if (!!settings.flip && resetIds) {
          resetIds.reverse();
        }
        resetIndex = (!!settings.index) ? oldIndex : 0;
        this.vals.reset(resetIds, resetIndex);
      }
    }
    else {
      this.updateValues();
    }

    // Save the new matching question ids and index
    newIds = this.vals.get('len');
    newIds = (newIds) ? this.vals.get('ids').slice(0) : null;
    newIndex = this.vals.get('index');

    // Hide the question's main element
    this.elems.main.style.opacity = '0';

    // Wrap logic in timeout to allow css transitions to complete
    setTimeout(function() {

      // Show or hide the prev and next nav elements
      view = this.searchBar.vals.view;
      this.elems.nav.style.display = ( (view === 'all') ?
        'none' : (view === 'ten' && this.vals.get('len') > 10) ?
          'block' : (view === 'one' && this.vals.get('len') > 1) ?
            'block' : 'none'
      );

      // Check if the questions order should be flipped
      if (!!settings.flip) {
        this.questions.reverseElems();
      }

      // Hide the old questions
      if (!!settings.oldView) {
        view = settings.oldView;
      }
      this.questions.hideElems(oldIds, oldIndex, view);

      // Show the new questions
      this.questions.showElems(newIds, newIndex);

      // Show the question's main element
      this.elems.main.style.opacity = '1';
        
      DEBUG && this.debug.group('updateDisplay', 'end');
    }, 520);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.updateValues)
   * -----------------------------------------------
   * @desc Updates the current selected values for the app.
   * @type {function()}
   */
  App.prototype.updateValues = function() {

    DEBUG && this.debug.start('updateValues');

    /**
     * @type {nums}
     * @private
     */
    var stage;
    /**
     * @type {nums}
     * @private
     */
    var source;
    /**
     * @type {nums}
     * @private
     */
    var mainCat;
    /**
     * @type {nums}
     * @private
     */
    var subCat;
    /**
     * @type {num}
     * @private
     */
    var len;
    /**
     * @type {num}
     * @private
     */
    var i;
    /**
     * @type {nums}
     * @private
     */
    var newIds;
    /**
     * @type {boolean}
     * @private
     */
    var pass;

    // Save the current values
    stage   = this.searchBar.vals.stage;
    source  = this.searchBar.vals.source;
    mainCat = this.searchBar.vals.mainCat;
    subCat  = this.searchBar.vals.subCat;

    // Save the matching ids
    stage   = (stage   === 'all') ? null : this.searchBar.ques.stage[ stage ];
    source  = (source  === 'all') ? null : this.sources.get(source).get('ids');
    mainCat = (mainCat === 'all') ? null : this.categories.get(mainCat).get('ids');
    subCat  = (subCat  === 'all') ? null : this.categories.get(subCat).get('ids');

    // Copy the arrays or add empty objects
    if (stage) {
      stage = (stage.length) ? stage.slice(0) : { length: 0 };
    }
    if (source) {
      source = (source.length) ? source.slice(0) : { length: 0 };
    }
    if (mainCat) {
      mainCat = (mainCat.length) ? mainCat.slice(0) : { length: 0 };
    }
    if (subCat) {
      subCat = (subCat.length) ? subCat.slice(0) : { length: 0 };
    }

    // Check for empty arrays
    if ((stage   && !stage.length)   ||
        (source  && !source.length)  ||
        (mainCat && !mainCat.length) ||
        (subCat  && !subCat.length)) {
      this.vals.reset([]);
      return;
    }

    // Setup needed vars
    newIds = [];
    len = this.questions.len;
    i = 0;

    // Get the current matching question ids
    while (true) {
      ++i;
      pass = true;

      if (stage) {
        if (!stage.length) {
          break;
        }
        if (stage[0] === i) {
          stage.shift();
        }
        else {
          pass = false;
        }
      }

      if (source) {
        if (!source.length) {
          break;
        }
        if (source[0] === i) {
          source.shift();
        }
        else {
          pass = false;
        }
      }

      if (mainCat) {
        if (!mainCat.length) {
          break;
        }
        if (mainCat[0] === i) {
          mainCat.shift();
        }
        else {
          pass = false;
        }
      }

      if (subCat) {
        if (!subCat.length) {
          break;
        }
        if (subCat[0] === i) {
          subCat.shift();
        }
        else {
          pass = false;
        }
      }

      if (pass) {
        newIds.push(i);
      }

      if (i === len) {
        break;
      }
    }

    // Check if results should be reversed
    if (this.searchBar.vals.order === 'desc') {
      newIds.reverse();
    }

    // Update the values
    this.vals.reset(newIds);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.moveDisplay)
   * -----------------------------------------------
   * @desc Show the prev, next, or a specific question(s).
   * @param {(string|number)} way - The location to show.
   *   The options are 'prev', 'next', or a question id.
   */
  App.prototype.moveDisplay = function(way) {

    if (DEBUG) {
     this.debug.group('moveDisplay', 'coll', 'way= $$', way);
     this.debug.start('moveDisplay', way);
     this.debug.args('moveDisplay', way, 'string|number');
    }

    /**
     * @type {?nums}
     * @private
     */
    var ids;
    /**
     * @type {num}
     * @private
     */
    var oldIndex;
    /**
     * @type {num}
     * @private
     */
    var newIndex;
    /**
     * @type {string}
     * @private
     */
    var oldView;

    ids = this.vals.get('len');
    ids = (ids) ? this.vals.get('ids').slice(0) : null;

    oldView = this.searchBar.vals.view;

    oldIndex = this.vals.get('index');
    newIndex = this.vals.move(way);

    // Hide the question's main element
    this.elems.main.style.opacity = '0';

    // Wrap logic in timeout to allow css transitions to complete
    setTimeout(function() {

      // Show or hide the prev and next nav elements
      this.elems.nav.style.display = ( (this.vals.get('len') > 1) ?
        'block' : 'none'
      );

      // Hide the old questions
      this.questions.hideElems(ids, oldIndex, oldView);

      // Show the new questions
      this.questions.showElems(ids, newIndex);

      // Show the question's main element
      this.elems.main.style.opacity = '1';
        
      DEBUG && this.debug.group('moveDisplay', 'end');
    }, 520);
  };
