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
    /** @type {Object<string, strings>} */
    var ids;
    /** @type {number} */
    var len;
    /** @type {stringMap} */
    var vals;

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
     * @type {boolean}
     */
    this.isHistory;

    // Save the count of questions for use before questions is setup
    len = (!!questions) ? questions.length : 0;

    // Setup the properties    
    this.flags   = new AppFlags(!!len);
    this.elems   = new AppElems();
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
    this.config.searchBar.defaults.update(defaults, names, ids, len);

    // Set the search bar to the defaults
    this.searchBar.setToDefaults(this.config.searchBar.defaults);

    // Setup the value of history
    this.isHistory = true;
    vals = {
      view   : this.searchBar.vals.view,
      order  : this.searchBar.vals.order,
      stage  : this.searchBar.vals.stage,
      source : this.searchBar.vals.source,
      mainCat: this.searchBar.vals.mainCat,
      subCat : this.searchBar.vals.subCat
    };
    vals = JSON.stringify(vals);
    try {
      window.history.replaceState(vals);
    }
    catch (e) {
      this.isHistory = false;
    }

    // Setup the onpopstate event
    if (this.isHistory) {
      window.onpopstate = function(event) {
        Events.popState( JSON.parse(event.state) );
      };
    }

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

    /** @type {number} */
    var renderTime;

    if ( this.flags.get('initArgs') ) {
      this.elems.appendNav();
      this.searchBar.setMainElems();
      this.searchBar.setOptElems();
      this.searchBar.appendElems();
      this.questions.addIdsToSearch();
      this.questions.appendElems();
      renderTime = this.questions.len * 32;
      setTimeout(function() {
        /** @type {boolean} */
        var flip;

        app.questions.addCodeExts();
        app.elems.hold.style.display = 'none';
        flip = (app.searchBar.vals.order === 'desc');
        app.updateDisplay({
          flipElems  : flip,
          oldView    : 'one',
          noPushState: true
        });

      }, renderTime);
    }
    else {
      this.elems.appendError();
    }
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.updateDisplay)
   * -----------------------------------------------
   * @desc Show the current matching questions for the app.
   * @param {Object=} settings - Settings to change the update actions.
   * @param {boolean=} settings.noMatch - If set to true it indicates
   *   that new matching values should NOT be calculated.
   * @param {boolean=} settings.flipElems - If set to true it indicates that
   *   the order of each question's element should be flipped.
   * @param {string=} settings.oldView - The value of view before the
   *   update. Defaults to the value of the new view.
   * @param {boolean=} settings.noMatchReset - If set to true it indicates
   *   that the ids and index should be reset.
   * @param {boolean=} settings.keepIndex - If set to true it indicates
   *   that the index should NOT be changed.
   * @param {boolean=} settings.noPushState - If set to true it indicates
   *   that the pushState call should NOT be made.
   */
  App.prototype.updateDisplay = function(settings) {

    /** @type {?nums} */
    var oldIds;
    /** @type {number} */
    var oldIndex;
    /** @type {?nums} */
    var resetIds;
    /** @type {number} */
    var resetIndex;
    /** @type {?nums} */
    var newIds;
    /** @type {number} */
    var newIndex;
    /** @type {stringMap} */
    var vals;
    /** @type {boolean} */
    var noMatch;
    /** @type {boolean} */
    var noMatchReset;
    /** @type {boolean} */
    var flipElems;
    /** @type {boolean} */
    var keepIndex;
    /** @type {boolean} */
    var noPushState;
    /** @type {string} */
    var view;
    /** @type {string} */
    var oldView;

    settings = ( checkType(settings, '!object') ) ? settings : {};

    noMatch = ( ( !settings.hasOwnProperty('noMatch') ) ?
      false : ( checkType(settings.noMatch, '!boolean') ) ?
        settings.noMatch : false
    );
    noMatchReset = ( ( !settings.hasOwnProperty('noMatchReset') ) ?
      false : ( checkType(settings.noMatchReset, '!boolean') ) ?
        settings.noMatchReset : false
    );
    flipElems = ( ( !settings.hasOwnProperty('flipElems') ) ?
      false : ( checkType(settings.flipElems, '!boolean') ) ?
        settings.flipElems : false
    );
    keepIndex = ( ( !settings.hasOwnProperty('keepIndex') ) ?
      false : ( checkType(settings.keepIndex, '!boolean') ) ?
        settings.keepIndex : false
    );
    noPushState = ( ( !settings.hasOwnProperty('noPushState') ) ?
      false : ( checkType(settings.noPushState, '!boolean') ) ?
        settings.noPushState : false
    );

    view = app.searchBar.vals.view;
    oldView = ( ( !settings.hasOwnProperty('oldView') ) ?
      view : ( checkType(settings.oldView, '!string') ) ?
        settings.oldView : view
    );

    // Save the old matching question ids and index
    oldIds = this.vals.get('len');
    oldIds = (oldIds) ? this.vals.get('ids').slice(0) : null;
    oldIndex = this.vals.get('index');

    // Update the current matching question ids and index
    if (noMatch || noMatchReset) {
      if (noMatchReset) {
        resetIds = (oldIds) ? oldIds.slice(0) : null;
        if (flipElems && resetIds) {
          resetIds.reverse();
        }
        resetIndex = (keepIndex) ? oldIndex : 0;
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
      app.elems.nav.style.display = ( (view === 'all') ?
        'none' : (view === 'ten' && app.vals.get('len') > 10) ?
          'block' : (view === 'one' && app.vals.get('len') > 1) ?
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
        vals = {
          view   : app.searchBar.vals.view,
          order  : app.searchBar.vals.order,
          stage  : app.searchBar.vals.stage,
          source : app.searchBar.vals.source,
          mainCat: app.searchBar.vals.mainCat,
          subCat : app.searchBar.vals.subCat
        };
        vals = JSON.stringify(vals);
        window.history.pushState(vals);
      }

      // Show the question's main element
      app.elems.main.style.opacity = '1';

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
        
    }, 520);
  };
