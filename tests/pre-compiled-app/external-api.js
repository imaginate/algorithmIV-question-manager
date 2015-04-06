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
   * @param {?objectMap} settings - The app's settings.
   */
  _return.init = function(settings) {

    // Debugging vars
    var errorMsg, failCheck;
    debug.start('init', settings);
    debug.args('init', settings, 'object');
    errorMsg = 'Error: A second attempt to init this app occurred.';
    debug.fail('init', (!_initialized), errorMsg);

    /**
     * @type {?objectMap}
     * @private
     */
    var config;
    /**
     * @type {?stringMap}
     * @private
     */
    var sources;
    /**
     * @type {?(objectMap|stringMap)}
     * @private
     */
    var categories;
    /**
     * @type {?objects}
     * @private
     */
    var questions;

    // Check if app has been initialized
    if (!_initialized) {

      // Save the init of this app to prevent second init
      _initialized = true;

      // Check the settings arg
      if (!settings || !checkType(settings, 'objectMap')) {
        settings = {};
      }

      // Setup the app arguments
      config = ( ( settings.hasOwnProperty('config') ) ?
        settings.config : ( settings.hasOwnProperty('configuration') ) ?
          settings.configuration : null
      );
      sources = ( ( settings.hasOwnProperty('sources') ) ?
        settings.sources : ( settings.hasOwnProperty('source') ) ?
          settings.source : null
      );
      categories = ( ( settings.hasOwnProperty('categories') ) ?
        settings.categories : ( settings.hasOwnProperty('category') ) ?
          settings.category : null
      );
      questions = ( ( settings.hasOwnProperty('questions') ) ?
        settings.questions : ( settings.hasOwnProperty('question') ) ?
          settings.question : null
      );

      failCheck = checkType(config, 'objectMap');
      errorMsg = 'Error: The given config property was an ';
      errorMsg += 'incorrect data type. config= $$';
      debug.fail('init', failCheck, errorMsg, config);

      failCheck = checkType(sources, 'stringMap');
      errorMsg = 'Error: The given sources property was an ';
      errorMsg += 'incorrect data type. sources= $$';
      debug.fail('init', failCheck, errorMsg, sources);

      failCheck = checkType(categories, 'stringMap|objectMap');
      errorMsg = 'Error: The given categories property was an ';
      errorMsg += 'incorrect data type. categories= $$';
      debug.fail('init', failCheck, errorMsg, categories);

      errorMsg = 'Error: No questions were provided.';
      debug.fail('init', (!!questions), errorMsg);

      if (questions) {
        failCheck = (checkType(questions, 'objects') && !!questions.length);
        errorMsg = 'Error: The given questions property was an ';
        errorMsg += 'incorrect data type. questions= $$';
        debug.fail('init', failCheck, errorMsg, questions);
      }

      // Check the types of the arguments
      if ( !checkType(config, 'objectMap') ) {
        config = null;
      }
      if ( !checkType(sources, 'stringMap') ) {
        sources = null;
      }
      if ( !checkType(categories, 'stringMap|objectMap') ) {
        categories = null;
      }
      if ( checkType(questions, 'objects') ) {
        if (!questions.length) {
          questions = null;
        }
      }
      else {
        questions = null;
      }

      // Setup and freeze the app
      app = new App(config, sources, categories, questions);
      Object.freeze(app);

      // Start the app
      document.addEventListener('DOMContentLoaded', app.setupDisplay);
    }
  };
