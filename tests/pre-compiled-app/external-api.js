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
   * Public Method (_init)
   * -----------------------------------------------------
   * @desc Initializes the app.
   * @param {Object} settings - The app's settings.
   */
  var _init = function(settings) {

    var debugMsg, debugCheck;
    debug.start('init', settings);
    debug.args('init', settings, 'object');
    debugMsg = 'Error: A second attempt to init this app occurred.';
    debug.fail('init', (!_initialized), debugMsg);

    /**
     * @type {?(string|strings)}
     * @private
     */
    var resourceList;
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
    /**
     * @type {function}
     * @private
     */
    var setup;
    /**
     * @type {function}
     * @private
     */
    var callback;
    /**
     * @type {number}
     * @private
     */
    var i;

    // Check if app has been initialized
    if (_initialized) {
      return;
    }

    // Save the init of this app to prevent second init
    _initialized = true;

    // Check the settings arg
    if (!settings || !checkType(settings, 'object')) {
      settings = {};
    }

    // Setup the app arguments
    resourceList = ( ( settings.hasOwnProperty('resources') ) ?
      settings.resources : null
    );
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

    debugCheck = checkType(resourceList, 'string|strings');
    debugMsg = 'Error: The given resources property was an ';
    debugMsg += 'incorrect data type. resources= $$';
    debug.fail('init', debugCheck, debugMsg, resourceList);

    debugCheck = checkType(config, 'objectMap');
    debugMsg = 'Error: The given config property was an ';
    debugMsg += 'incorrect data type. config= $$';
    debug.fail('init', debugCheck, debugMsg, config);

    debugCheck = checkType(sources, 'stringMap');
    debugMsg = 'Error: The given sources property was an ';
    debugMsg += 'incorrect data type. sources= $$';
    debug.fail('init', debugCheck, debugMsg, sources);

    debugCheck = checkType(categories, 'stringMap|objectMap');
    debugMsg = 'Error: The given categories property was an ';
    debugMsg += 'incorrect data type. categories= $$';
    debug.fail('init', debugCheck, debugMsg, categories);

    debugMsg = 'Error: No questions were provided.';
    debug.fail('init', (!!questions), debugMsg);

    if (questions) {
      debugCheck = (checkType(questions, 'objects') && !!questions.length);
      debugMsg = 'Error: The given questions property was an ';
      debugMsg += 'incorrect data type. questions= $$';
      debug.fail('init', debugCheck, debugMsg, questions);
    }

    // Check the types of the arguments
    if ( !checkType(resourceList, 'string|strings') ) {
      resourceList = null;
    }
    if ( !checkType(config, 'objectMap') ) {
      config = null;
    }
    if ( !checkType(sources, 'stringMap') ) {
      sources = null;
    }
    if ( !checkType(categories, 'stringMap|objectMap') ) {
      categories = null;
    }
    if ( checkType(questions, '!objects') ) {
      if (!questions.length) {
        questions = null;
      }
    }
    else {
      questions = null;
    }

    // Setup and start the app
    setup = function() {
      Object.freeze(resources);
      app = new App(config, sources, categories, questions);
      Object.freeze(app);
      app.setupDisplay();
    };

    // Save the resources
    if (resourceList) {

      if (typeof resourceList === 'string') {
        getResource(resourceList, setup);
        return;
      }

      callback = setup;
      console.log(callback);
      i = resourceList.length;
      while (--i) {
        callback = (function(jsonFile, callback) {         
          return function() {
            getResource(jsonFile, callback);
          };
        })(resourceList[i], callback);
      }
      getResource(resourceList[0], callback);
      return;
    }

    setup();
  };

  /**
   * -----------------------------------------------------
   * Public Method (_init.getResource)
   * -----------------------------------------------------
   * @desc Makes the app's resources publically available.
   * @param {string=} prop - The specific resource to retrieve.
   * @return {val} Either the entire resources object or one of its properties.
   */
  _init.getResource = function(prop) {

    debug.start('init.getResource', prop);
    debug.args('init.getResource', prop, 'string=');
    debug.state('init.getResource', 'resources= $$', resources);

    return (!!prop) ? resources[ prop ] : resources;
  }

  Object.freeze(_init);
  Object.freeze(_init.getResource);
