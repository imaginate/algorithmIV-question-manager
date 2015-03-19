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

    // Debugging
    var args, msg;
    if (DEBUG) {
      args = [ 'init' ];
      args.push(config, 'object', sources, 'object');
      args.push(categories, 'object', questions, 'object');
      debug.args(args);

      msg = 'A second attempt to init this app occurred.';
      debug.fail('init', !_initialized, msg);
    }

    // Check if app has been initialized
    if (!_initialized) {

      _initialized = true;

      // Setup the app
      app = new App(config, sources, categories, questions);

      // Start the app
      document.addEventListener('DOMContentLoaded', function() {
        app.setupDisplay();
      });
    }
  };
