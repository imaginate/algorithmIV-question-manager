  /**
   * -----------------------------------------------------
   * Public Variable (appModuleAPI)
   * -----------------------------------------------------
   * @desc Holds the app module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var appModuleAPI = {};

  /**
   * -----------------------------------------------------
   * Public Method (appModuleAPI.startApp)
   * -----------------------------------------------------
   * @desc Initializes the app.
   * @param {Object} settings - The app's settings.
   */
  appModuleAPI.startApp = function(settings) {

    debug.start('init', settings);

    debug.args('init', settings, 'object');

    debugMsg = 'Error: A second attempt to init this app occurred.';
    debug.fail('init', (!hasAppBeenInitialized), debugMsg);

    /** @type {?(string|strings)} */
    var resourceList;
    /** @type {objectMap} */
    var config;
    /** @type {stringMap} */
    var sources;
    /** @type {(objectMap|stringMap)} */
    var categories;
    /** @type {!objects} */
    var questions;
    /** @type {function} */
    var setup;
    /** @type {function} */
    var callback;
    /** @type {number} */
    var i;

    if (hasAppBeenInitialized) {
      return;
    }

    // Save the init of this app to prevent second init
    hasAppBeenInitialized = true;

    if ( !checkType(settings, '!object') ) {
      settings = {};
    }

    // Setup the app arguments
    resourceList = ( ( hasOwnProp(settings, 'resources') ) ?
      settings.resources : null
    );
    config = ( ( hasOwnProp(settings, 'config') ) ?
      settings.config : ( hasOwnProp(settings, 'configuration') ) ?
        settings.configuration : null
    );
    sources = ( ( hasOwnProp(settings, 'sources') ) ?
      settings.sources : ( hasOwnProp(settings, 'source') ) ?
        settings.source : null
    );
    categories = ( ( hasOwnProp(settings, 'categories') ) ?
      settings.categories : ( hasOwnProp(settings, 'category') ) ?
        settings.category : null
    );
    questions = ( ( hasOwnProp(settings, 'questions') ) ?
      settings.questions : ( hasOwnProp(settings, 'question') ) ?
        settings.question : []
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

    debugCheck = checkType(questions, '!objects');
    debugMsg = 'Error: The given questions property was an ';
    debugMsg += 'incorrect data type. questions= $$';
    debug.fail('init', debugCheck, debugMsg, questions);

    debugCheck = (questions.length > 0);
    debugMsg = 'Error: No questions were provided.';
    debug.fail('init', debugCheck, debugMsg);

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
    if ( !checkType(questions, '!objects') ) {
      questions = [];
    }

    // Setup and start the app
    setup = function() {
      freezeObj(resources);
      app = new App(config, sources, categories, questions);
      app.setupDisplay();
    };

    // Save the resources
    if (resourceList) {

      if ( checkType(resourceList, 'string') ) {
        getResource(resourceList, setup);
        return;
      }

      callback = setup;
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
   * Public Method (appModuleAPI.getResource)
   * -----------------------------------------------------
   * @desc Makes the app's resources publically available.
   * @param {string=} prop - The specific resource to retrieve.
   * @return {val} Either the entire resources object or one of its properties.
   */
  appModuleAPI.getResource = function(prop) {

    debug.start('init.getResource', prop);
    debug.args('init.getResource', prop, 'string=');
    debug.state('init.getResource', 'resources= $$', resources);

    /** @type {string} */
    var errorMsg;

    prop = prop || '';

    if (prop && !hasOwnProp(resources, prop)) {
      errorMsg = 'The resource you requested does not exist. Please verify that \'';
      errorMsg += prop + '\' is a correct json file name in the resources folder ';
      errorMsg += 'and that the file name was included in the setup of the app ';
      errorMsg += '(see algorithmiv.com/docs/resources).';
      console.error(errorMsg);
      debugger;
      return;
    }

    return (!!prop) ? resources[ prop ] : resources;
  }

  freezeObj(appModuleAPI, true);
