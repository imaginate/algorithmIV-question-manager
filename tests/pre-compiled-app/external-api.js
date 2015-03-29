  /**
   * -----------------------------------------------------
   * Private Variable (_return)
   * -----------------------------------------------------
   * @desc Holds the public methods for the core module.
   * @typedef {initApp}
   * @struct
   */
  var _return = {};

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
   * Public Method (_return.init)
   * -----------------------------------------------------
   * @desc Initializes the app.
   * @param {?Object} settings - The app's settings.
   */
  _return.init = function(settings) {

    // Debugging vars
    var errorMsg, failCheck;
    debug.start('init', settings);
    debug.args('init', settings, 'object');
    errorMsg = 'Error: A second attempt to init this app occurred.';
    debug.fail('init', (!_initialized), errorMsg);

    /**
     * @type {?Object}
     * @private
     */
    var config;
    /**
     * @type {?hashMap}
     * @private
     */
    var sources;
    /**
     * @type {?Object}
     * @private
     */
    var categories;
    /**
     * @type {?Object}
     * @private
     */
    var questions;

    // Check if app has been initialized
    if (!_initialized) {

      // Save the init of this app to prevent second init
      _initialized = true;

      // Setup the app arguments
      config = ( (!!settings.config) ?
        settings.config : (!!settings.configuration) ?
          settings.configuration : null
      );
      sources = ( (!!settings.sources) ?
        settings.sources : (!!settings.source) ?
          settings.source : null
      );
      categories = ( (!!settings.categories) ?
        settings.categories : (!!settings.category) ?
          settings.category : null
      );
      questions = ( (!!settings.questions) ?
        settings.questions : (!!settings.question) ?
          settings.question : null
      );

      failCheck = (!config || typeof config === 'object');
      errorMsg = 'Error: The given config property was an ';
      errorMsg += 'incorrect operand. config= $$';
      debug.fail('init', failCheck, errorMsg, config);

      failCheck = (!sources || typeof sources === 'object');
      errorMsg = 'Error: The given sources property was an ';
      errorMsg += 'incorrect operand. sources= $$';
      debug.fail('init', failCheck, errorMsg, sources);

      failCheck = (!categories || typeof categories === 'object');
      errorMsg = 'Error: The given categories property was an ';
      errorMsg += 'incorrect operand. categories= $$';
      debug.fail('init', failCheck, errorMsg, categories);

      errorMsg = 'Error: No questions were provided.';
      debug.fail('init', (!!questions), errorMsg);

      if (questions) {
        failCheck = (checkType(questions, 'objects') && !!questions.length);
        errorMsg = 'Error: The given questions property was an ';
        errorMsg += 'incorrect operand. questions= $$';
        debug.fail('init', failCheck, errorMsg, questions);
      }

      // Check the types of the arguments
      if (config && typeof config !== 'object') {
        config = null;
      }
      if (sources && typeof sources !== 'object') {
        sources = null;
      }
      if (categories && typeof categories !== 'object') {
        categories = null;
      }
      if (questions) {
        if (!checkType(questions, 'objects') || !questions.length) {
          questions = null;
        }
      }

      // Setup and freeze the app
      app = new App(config, sources, categories, questions);
      Object.freeze(app);

      // Start the app
      document.addEventListener('DOMContentLoaded', app.setupDisplay);
    }
  };
