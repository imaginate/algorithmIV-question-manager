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
   * @param {?Object} settings - The app's settings.
   */
  _core.init = function(settings) {

    // Debugging
    var msg;
    if (DEBUG) {
      debug.args('init', settings);
      msg = 'Error: A second attempt to init this app occurred.';
      debug.fail('init', !_initialized, msg);
    }

    /* @type {?Object} */
    var config;
    /* @type {?hashMap} */
    var sources;
    /* @type {?Object} */
    var categories;
    /* @type {?Object} */
    var questions;

    // Check if app has been initialized
    if (!_initialized) {

      // Save the init of this app to prevent second init
      _initialized = true;

      // Setup the app arguments
      config  = settings.config || settings.configuration || null;
      sources = settings.sources || settings.source || null;
      categories = settings.categories || settings.category || null;
      questions  = settings.questions  || settings.question || null;
      if (questions && (!Array.isArray(questions) || !questions.length)) {
        questions = null;
      }

      // Setup the app
      app = new App(config, sources, categories, questions);

      // Start the app
      document.addEventListener('DOMContentLoaded', app.setupDisplay);
    }
  };
