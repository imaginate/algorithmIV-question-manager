  /**
   * -----------------------------------------------------
   * Private Variable (_core)
   * -----------------------------------------------------
   * @desc Holds the public methods for the core module.
   * @typedef {appCore}
   * @struct
   */
  var _core = {};

  /**
   * -----------------------------------------------------
   * Private Variable (_initialized)
   * -----------------------------------------------------
   * @desc Indicates whether the app has been initialized.
   * @type {boolean}
   * @private
   */
  var _initialized = false;

  /**
   * -----------------------------------------------------
   * Public Method (_core.init)
   * -----------------------------------------------------
   * @desc Initializes the app.
   * @param {?Object} config - The user's config settings.
   * @param {?hashMap} sources - The user's sources.
   * @param {?Object} categories - The user's categories.
   * @param {?Object} questions - The user's questions.
   */
  _core.init = function(config, sources, categories, questions) {

    // debugging vars
    var args, msg;
    if (DEBUG) {
      args = [ 'init' ];
      args.push(config, 'object', sources, 'object');
      args.push(categories, 'object', questions, 'object');
      debug.args(args);
      msg = 'A second attempt to init this app occurred.';
      debug.fail('init', !_initialized, msg);
    }

    if (!_initialized) {

      if (DEBUG) {
        args = [ 'init','open' ];
        args.push('config', config, 'sources', sources);
        args.push('categories', categories, 'questions', questions);
        debug.group(args);
      }

      _initialized = true;

      // Setup the app properties
      app = new App(config, sources, categories, questions);

      // Start the app
      document.addEventListener('DOMContentLoaded', function() {

        app.appendMainElems();

        if ( app.flags.get('initArgs') ) {

          app.appendNavElems();
          app.setScrollbarHeight();
          app.setCodeListHeight();
          app.searchBar.setElems();
          // --> DisplaySearchBar.init();
          // --> AddEvents.init();
          app.questions.setFormats();
          // --> AppendQuestions.init();
          // --> DisplayQuestions.assembleQuestions();
        }
        else {
          // Show error message
          app.appendErrorElems();
        }

        DEBUG && debug.group('init', 'end');
      });
    }
  };
