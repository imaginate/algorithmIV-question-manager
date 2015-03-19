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
     * @type {(vals|boolean)}
     * @private
     */
    var pass;

    // Check the user inputs
    pass = [ config, sources, categories, questions ];
    pass = checkType(pass, 'object');

    /**
     * ---------------------------------------------------
     * Private Property (App.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('App') : null;

    var args, msg;
    if (DEBUG) {
      msg = 'config= $$, sources= $$, categories= $$, questions= $$';
      args = [ 'init', 'open', msg ];
      args.push(config, sources, categories, questions);
      this.debug.group(args);

      this.debug.start('init', config, sources, categories, questions);

      args = [ 'init' ];
      args.push(config, 'object', sources, 'object');
      args.push(categories, 'object', questions, 'object');
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
      flip = (this.config.searchBar.defaults.get('order') === 'desc');
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
   * @param {boolean=} flip - Indicates that the questions order
   *   should be flipped.
   */
  App.prototype.setupDisplay = function(flip) {

    if (DEBUG) {
     this.debug.group('updateDisplay', 'coll');
     this.debug.start('updateDisplay');
    }

    /**
     * @type {string}
     * @private
     */
    var v;

    // Hide the questions while the updates occur
    this.elems.main.style.opacity = '0';

    // Wrap logic in timeout to allow css transitions to complete
    setTimeout(function() {

      // Show or hide the prev and next nav elements
      this.elems.nav.style.display = ( (this.searchBar.vals.view === 'all') ?
          'none' : (this.searchBar.vals.view === 'ten' && .length > 10) ?
            'block' : (this.searchBar.vals.view === 'one' && .length > 1) ?
              'block' : 'none'
      );

      // Check if the questions order should be flipped
      if (!!flip) {
        // ADD FLIP LOGIC HERE ****
      }

      // Display the correct questions
      // ADD DISPLAY LOGIC HERE *****

      // Bring the question's main element back into focus
      setTimeout(function() {
        this.elems.main.style.opacity = '1';
        DEBUG && this.debug.group('updateDisplay', 'end');
      }, 20);
    }, 500);
  };
