  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for this app.
   * @param {?objectMap} config - The user's config settings.
   * @param {?stringMap} sources - The user's sources.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @param {?objects} questions - The user's questions.
   * @constructor
   */
  var App = function(config, sources, categories, questions) {

    /** @type {booleanMap} */
    var tmpConfig;
    /** @type {?Object<string, (string|num)>} */
    var defaults;
    /** @type {Object<string, stringMap>} */
    var names;
    /** @type {stringsMap} */
    var ids;
    /** @type {number} */
    var len;

    /**
     * ---------------------------------------------------
     * Public Property (App.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the App class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'App',
      turnOnDebuggers: 'args fail'
    });

    // Debugging vars
    var args, msg;
    msg = 'Error: No questions were provided to this app\'s init.';
    this.debug.fail('init', !!questions, msg);

    msg = 'config= $$, sources= $$, categories= $$, questions= $$';
    args = [ 'init', 'open', msg ];
    args.push(config, sources, categories, questions);
    this.debug.group(args);

    this.debug.start('init', config, sources, categories, questions);

    args = [ 'init' ];
    args.push(config, 'object', sources, 'object');
    args.push(categories, 'object', questions, 'objects');
    this.debug.args(args);

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

    // Setup the properties
    this.flags   = new AppFlags(!!questions);
    this.elems   = new AppElems();
    len = (!!questions) ? questions.length : 0;
    this.vals    = new AppVals(len);
    this.config  = new Config(config);
    this.sources = new Sources(sources);
    this.categories = new Categories(categories);

    Object.freeze(this.flags);
    Object.freeze(this.elems);
    Object.freeze(this.vals);
    Object.freeze(this.config);
    Object.freeze(this.sources);
    Object.freeze(this.categories);

    tmpConfig = {
      trimSpace   : this.config.prettifier.get('trimSpace'),
      tabLength   : this.config.prettifier.get('tabLength'),
      commentLinks: this.config.prettifier.get('commentLinks')
    };
    prettify.setConfig(tmpConfig);

    tmpConfig = {
      stage   : this.config.searchBar.get('stage'),
      source  : this.config.searchBar.get('source'),
      category: this.config.searchBar.get('category'),
      subCat  : this.config.searchBar.get('subCat')
    };
    this.searchBar = new SearchBar(tmpConfig, this.sources, this.categories);

    tmpConfig = {
      id      : this.config.questions.get('id'),
      complete: this.config.questions.get('complete'),
      source  : this.config.questions.get('source'),
      category: this.config.questions.get('category'),
      subCat  : this.config.questions.get('subCat'),
      links   : this.config.questions.get('links'),
      output  : this.config.questions.get('output')
    };
    this.questions = new Questions(questions, tmpConfig, this.sources, this.categories);

    Object.freeze(this.searchBar);
    Object.freeze(this.questions);

    // Set the search defaults
    defaults = ( (!!config && !!config.searchDefaults) ?
      config.searchDefaults : null
    );
    names = this.searchBar.names;
    ids = this.searchBar.ids.subCat;
    len = this.questions.len;
    this.config.searchBar.defaults.update(defaults, names, ids, len);

    // Set the search bar to the defaults
    this.searchBar.setToDefaults(this.config.searchBar.defaults);


    this.debug.group('init', 'end');
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

   this.debug.group('setupDisplay', 'open');
   this.debug.start('setupDisplay');

    /**
     * @type {boolean}
     * @private
     */
    var flip;

    if ( this.flags.get('initArgs') ) {
      this.elems.appendNav();
      this.searchBar.setMainElems();
      this.searchBar.setOptElems();
      this.searchBar.appendElems();
      this.questions.addIdsToSearch();
      this.questions.appendElems();
      this.elems.hold.style.display = 'none';
      flip = (this.searchBar.vals.order === 'desc');
      this.updateDisplay({ flip: flip, oldView: 'all' });
    }
    else {
      this.elems.appendError();
    }

    this.debug.group('setupDisplay', 'end');
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
  App.prototype.updateDisplay = function(settings) {

    this.debug.group('updateDisplay', 'coll', 'settings= $$', settings);
    this.debug.start('updateDisplay', settings);
    this.debug.args('updateDisplay', settings, 'object=');

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
      view = app.searchBar.vals.view;
      app.elems.nav.style.display = ( (view === 'all') ?
        'none' : (view === 'ten' && app.vals.get('len') > 10) ?
          'block' : (view === 'one' && app.vals.get('len') > 1) ?
            'block' : 'none'
      );

      // Check if the questions order should be flipped
      if (!!settings.flip) {
        app.questions.reverseElems();
      }

      // Hide the old questions
      if (!!settings.oldView) {
        view = settings.oldView;
      }
      app.questions.hideElems(oldIds, oldIndex, view);

      // Show the new questions
      app.questions.showElems(newIds, newIndex);

      // Show the question's main element
      app.elems.main.style.opacity = '1';
        
      app.debug.group('updateDisplay', 'end');
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

    this.debug.start('updateValues');

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

    this.debug.group('moveDisplay', 'coll', 'way= $$', way);
    this.debug.start('moveDisplay', way);
    this.debug.args('moveDisplay', way, 'string|number');

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
      app.elems.nav.style.display = ( (app.vals.get('len') > 1) ?
        'block' : 'none'
      );

      // Hide the old questions
      app.questions.hideElems(ids, oldIndex, oldView);

      // Show the new questions
      app.questions.showElems(ids, newIndex);

      // Show the question's main element
      app.elems.main.style.opacity = '1';
        
      app.debug.group('moveDisplay', 'end');
    }, 520);
  };
